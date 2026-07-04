use axum::http::Method;
use axum::http::StatusCode;
use axum::{
    Json, Router,
    extract::{self, Path, Query},
    routing::{get, post},
};
use minio_rsc::{Minio, client::PresignedArgs, provider::StaticProvider};
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::PgPool;
use sqlx::types::chrono::Utc;
use sqlx::{postgres::PgPoolOptions, prelude::FromRow};
use std::collections::HashMap;
use std::env;
use std::net::SocketAddr;
use std::result::Result;
use std::sync::Arc;
use tower_http::cors::{AllowOrigin, CorsLayer};

use axum::response::{Html, IntoResponse};
use tower::service_fn;
use tower_http::services::{ServeDir, ServeFile};

async fn health() -> String {
    "healthy".to_string()
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();
    let db_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://dbuser:p@localhost:1111/data".to_string());

    let pool = match PgPoolOptions::new()
        .max_connections(100)
        .connect(&db_url)
        .await
    {
        Ok(pool) => {
            if let Err(e) = sqlx::migrate!("./migrations").run(&pool).await {
                eprintln!("Error applying migrations: {}", e);
            }
            Some(pool)
        }
        Err(e) => {
            eprintln!("Warning: DB unavailable, starting without database: {}", e);
            None
        }
    };

    let dist_dir =
        std::env::var("FRONTEND_DIST").unwrap_or_else(|_| "../frontend/dist".to_string());
    let static_service = ServeDir::new(&dist_dir)
        .not_found_service(ServeFile::new(format!("{dist_dir}/index.html")));
    let app = Router::new()
        .route("/health", get(health))
        //.route("/signed-urls/:video_path", get(get_signed_url))
        .fallback_service(static_service)
        .layer(
            CorsLayer::new()
                .allow_origin(AllowOrigin::list(vec![
                    "http://localhost:3000".parse().unwrap(),
                    "https://example.com".parse().unwrap(),
                ]))
                .allow_methods([Method::GET, Method::POST])
                .allow_headers(tower_http::cors::Any),
        )
        .with_state(pool);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();

    axum::serve(listener, app).await.unwrap();
    Ok(())
}
