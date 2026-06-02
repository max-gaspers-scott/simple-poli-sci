import image from './image.webp';

function App() {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-200 font-sans flex flex-col items-center justify-start p-6 md:p-12 relative overflow-hidden">
      {/* Subtle background glow hints (Orange & Blue) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      {/* Main Container - expanded to max-w-5xl for split hero layout */}
      <div className="max-w-5xl w-full space-y-12 my-4">
        
        {/* Top-Left Brand Title & Subtitle with clean divider */}
        <div className="w-full flex flex-col justify-start items-start border-b border-slate-800/60 pb-6">
          <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Save our Neighbors
          </h1>
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mt-1">
            Coalition for Solidarity
          </p>
        </div>

        {/* Two-Column Split Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left Column: Core Content Paragraphs */}
          <div className="md:col-span-7 space-y-10">
            
            {/* Sanctity of Life (Orange Border Accent) */}
            <div className="space-y-3 border-l-3 border-orange-500 pl-6">
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                Sanctity of Life
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                We oppose direct and intentional attacks on innocent human life.
              </p>
            </div>

            {/* Social Justice (Blue Border Accent) */}
            <div className="space-y-3 border-l-3 border-sky-500 pl-6">
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                Social Justice
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
                We uphold the right of individuals to discern their own understanding of moral conduct; 
                however, we oppose and condemn all discrimination based on any personal characteristic and any 
                acts that violate one's unalienable, constitutional rights to life, liberty, and the pursuit of happiness. 
                As a result, we oppose the oppression of the vulnerable and minorities, and we particularly, 
                vehemently oppose the current administration's treatment of migrants—our neighbors.
              </p>
            </div>

          </div>

          {/* Right Column: Hero Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <img 
              className="max-w-sm w-full h-auto object-cover rounded-xl shadow-2xl" 
              src={image} 
              alt="Save our Neighbors Campaign"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
