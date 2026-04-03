import { Target, History, Users, ShieldCheck, Sparkles, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-300 overflow-hidden pt-28 pb-20 px-6">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full -z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="text-blue-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">The Future of Media</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic text-white">
            Discover Our <span className="text-blue-500 underline decoration-blue-500/20">Story</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Welcome to <strong className="text-white">NewsIque</strong>, where high-integrity journalism meets next-gen technology. Since 2020, we’ve been re-engineering how you consume news.
          </p>
        </header>

        {/* Info Grid */}
        <section className="grid gap-8 md:grid-cols-2">
          
          {/* Our Mission */}
          <div className="group bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Target className="text-blue-400" size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">Our Mission</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              To inform, educate, and inspire. We strive to provide our readers with news that matters, ensuring every article is thoroughly researched and thoughtfully written through our unique lens.
            </p>
          </div>

          {/* Our History */}
          <div className="group bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <History className="text-purple-400" size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">Our History</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              NewsIque was founded in 2020 with a vision to create a trusted source of news in a digital age. We’ve evolved into a powerhouse of accuracy and quality journalism that remains unchanged.
            </p>
          </div>

          {/* Our Team */}
          <div className="group bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 transition-transform">
              <Users className="text-green-400" size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">Our Team</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Our diverse collective of journalists, editors, and tech-experts are the heartbeat of NewsIque. We work tirelessly to merge in-depth analysis with cutting-edge storytelling.
            </p>
          </div>

          {/* Our Values */}
          <div className="group bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-yellow-400" size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">Our Values</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Integrity, accuracy, and impartiality are the cornerstones of our work. We believe in holding power to account and making a positive impact through responsible reporting.
            </p>
          </div>

        </section>

        {/* Contact Footer */}
        <footer className="mt-24 pt-10 border-t border-white/5 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">
               © 2026 NewsIque Terminal
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-blue-400 font-bold text-xs hover:bg-white/10 transition-all cursor-pointer">
              <Mail size={14} />
              info@newsique.com
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;