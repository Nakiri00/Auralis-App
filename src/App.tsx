import React, { useState, useEffect, useRef } from 'react';
import { Download, Music, Smartphone, Mail, Link2, Cpu, PlayCircle, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import webIcon from '/src/assets/web-icon.svg'; 
import ytImg from '/src/assets/UI-app/yt.jpg';
import detectImg from '/src/assets/UI-app/detect.jpg'; 
import libImg from '/src/assets/UI-app/lib.jpg';
import hisImg from '/src/assets/UI-app/his.jpg';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;        
  className?: string; 
}

// 2. Terapkan tipe data pada fungsi
function ScrollSection({ children, id, className }: ScrollSectionProps) {
  const [isInView, setIsInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null); 

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${className} transition-all duration-300 ease-in-out transform will-change-transform ${
        isInView 
          ? 'scale-100 opacity-100 blur-none' 
          : 'scale-95 opacity-20 blur-[2px]' 
      }`}
    >
      {children}
    </section>
  );
}

export default function AuralisLandingPage() {
  const slides = [
    {
      id: 1,
      title: "Konversi URL YouTube",
      description: "Masukkan link video YouTube, dan Auralis akan mengonversinya menjadi audio untuk proses deteksi chord.",
      src: ytImg, 
    },
    {
      id: 2,
      title: "Deteksi Chord",
      description: "Setelah memproses audio, Auralis akan menampilkan chord yang terdeteksi seiring lagu berputar.",
      src: detectImg,
    },
    {
      id: 3,
      title: "Chord Library",
      description: "Akses koleksi chord yang luas dan terus diperbarui untuk berbagai genre musik.",
      src: libImg,
    },
    {
      id: 4,
      title: "History",
      description: "Riwayat lagu yang telah diulik akan tersimpan di menu History, sehingga Anda dapat mengaksesnya kembali kapan saja.",
      src: hisImg,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval); 
  }, [currentIndex]); 

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center cursor-pointer group">
              <img src={webIcon} alt="Auralis Logo" className="w-14 h-14 grayscale brightness-200" />
              <span className="text-2xl font-bold tracking-tighter ml-1">
                AURALIS
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10">
              <a href="#home" className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest transition">Home</a>
              <a href="#interfaces" className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest transition">Interfaces</a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest transition">How It Works</a>
              <a href="#architecture" className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest transition">Architecture</a>
              <a href="#final-cta" className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest transition">Join Us</a>
            </div>

            {/* Desktop Button Download */}
            <div className="hidden md:block">
              <button className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-full font-bold transition flex items-center gap-2 text-xs uppercase tracking-tighter">
                <Download className="w-4 h-4" /> Unduh APK
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out border-b border-zinc-800 bg-black/95 ${
          isMenuOpen 
            ? 'max-h-80 opacity-100 py-6' 
            : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
        }`}>
          <div className="px-4 space-y-4 flex flex-col">
            <a 
              href="#home" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest py-2 transition"
            >
              Home
            </a>
            <a 
              href="#interfaces" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest py-2 transition"
            >
              Interfaces  
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest py-2 transition"
            >
              How It Works
            </a>
            <a 
              href="#architecture" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest py-2 transition"
            >
              Architecture
            </a>
            <a 
              href="#final-cta" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-widest py-2 transition"
            >
              Join Us
            </a>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-full font-bold transition flex items-center justify-center gap-2 text-xs uppercase tracking-tighter mt-4"
            >
              <Download className="w-4 h-4" /> Unduh APK
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            ULIK CHORD. <br />
            <span className="text-zinc-500">TANPA BATAS.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Deteksi chord akurat langsung dari video YouTube atau file audio lokal Anda.
            Sahabat terbaik untuk musisi pemula yang ingin belajar dan mencari referensi chord.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://auralis-app.duckdns.org/download-apk" 
              className="bg-white text-black hover:bg-zinc-300 px-10 py-5 rounded-full font-black text-lg transition flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <Smartphone className="w-6 h-6" />
              DOWNLOAD AURALIS
            </a>
          </div>
        </div>
      </section>

      {/* 3. PREVIEW SECTION (Wrapped with ScrollAnimate) */}
      <ScrollSection id="interfaces" className="py-28 bg-zinc-900/50 border-y border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">Tampilan Interface</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-center max-w-2xl min-h-[100px] mb-8 z-40">
              <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">
                {slides[currentIndex].title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base font-light">
                {slides[currentIndex].description}
              </p>
            </div>

            <div className="relative flex items-center justify-center w-full max-w-5xl h-[450px] sm:h-[550px] md:h-[650px]">
              {slides.map((slide, index) => {
                const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
                const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

                let positionClasses = "opacity-0 scale-50 z-0 pointer-events-none"; 
                let blurClass = "blur-md";
                let imageGrayscale = "grayscale";

                if (index === currentIndex) {
                  positionClasses = "translate-x-0 opacity-100 scale-100 z-30 shadow-[0_0_60px_rgba(255,255,255,0.15)]";
                  blurClass = "blur-none";
                  imageGrayscale = "grayscale-0";
                } else if (index === prevIndex) {
                  positionClasses = "-translate-x-[55%] md:-translate-x-[110%] opacity-40 scale-75 z-20 cursor-pointer hover:opacity-75";
                  blurClass = "blur-[2px]";
                } else if (index === nextIndex) {
                  positionClasses = "translate-x-[55%] md:translate-x-[110%] opacity-40 scale-75 z-20 cursor-pointer hover:opacity-75";
                  blurClass = "blur-[2px]";
                }

                return (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentIndex(index)} 
                    className={`absolute w-56 sm:w-64 md:w-80 h-auto bg-black rounded-[2.5rem] md:rounded-[3rem] border-[8px] md:border-[10px] border-zinc-800 overflow-hidden transition-all duration-700 ease-in-out ${positionClasses} ${blurClass}`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className={`w-full h-auto block object-contain transition-all duration-700 ${imageGrayscale}`}
                    />
                  </div>
                );
              })}

              <button onClick={prevSlide} className="absolute left-2 md:left-8 xl:left-12 z-40 p-4 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <button onClick={nextSlide} className="absolute right-2 md:right-8 xl:right-12 z-40 p-4 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="flex gap-3 mt-12 z-40">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 transition-all duration-500 ${
                    index === currentIndex ? "w-12 bg-white" : "w-6 bg-zinc-800 hover:bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* 4. HOW IT WORKS SECTION (Wrapped with ScrollAnimate) */}
      <ScrollSection id="how-it-works" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-20">Bagaimana Sistem Bekerja?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Link2 />, step: "1. INPUT", desc: "Tempel link YouTube atau file audio lokal." },
              { icon: <Cpu />, step: "2. ANALYZE", desc: "Sistem mendeteksi frekuensi via Librosa atau Tarsos." },
              { icon: <PlayCircle />, step: "3. OUTPUT", desc: "Chord tampil instan di layar Anda." }
            ].map((item, i) => (
              <div key={i} className="group border border-zinc-800 p-10 rounded-none hover:bg-white hover:text-black transition-all duration-500">
                <div className="w-16 h-16 border border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:border-black transition-colors">
                  {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-xl font-black mb-4">{item.step}</h3>
                <p className="text-zinc-500 group-hover:text-black transition-colors font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* 5. TECH STACK SECTION - Infinite Scrolling Marquee */}
      <ScrollSection id="architecture" className="py-28 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-zinc-500 text-xs font-bold font-mono tracking-[0.4em] uppercase mb-4 text-center">System Architecture</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic text-center text-white">Engineered With</h3>
            <div className="w-16 h-1 bg-white mx-auto mt-4"></div>
          </div>
        </div>

        {/* Container Karosel */}
        <div className="relative flex overflow-hidden py-10">
          <div className="animate-marquee flex whitespace-nowrap gap-6">
            {/* Kita melakukan mapping 2 kali agar animasi looping tidak terputus */}
            {[...Array(2)].map((_, listIdx) => (
              <React.Fragment key={listIdx}>
                {[
                  { 
                    name: "React.js", 
                    role: "Frontend Web", 
                    desc: "Digunakan untuk membangun antarmuka website landing page Website terkait Auralis yang modular, cepat, dan interaktif." 
                  },
                  { 
                    name: "Tailwind CSS", 
                    role: "UI Styling", 
                    desc: "Framework CSS utility-first untuk menyusun desain antarmuka website yang sepenuhnya responsif di berbagai ukuran layar." 
                  },
                  { 
                    name: "Java", 
                    role: "Android Native", 
                    desc: "Bahasa pemrograman utama yang membangun seluruh fondasi aplikasi Android, arsitektur MVVM, dan sinkronisasi pemutar audio." 
                  },
                  { 
                    name: "Kotlin", 
                    role: "Build Configuration", 
                    desc: "Diimplementasikan melalui Gradle Kotlin DSL (.kts) untuk manajemen dependensi dan otomasi kompilasi aplikasi yang lebih modern." 
                  },
                  { 
                    name: "Python", 
                    role: "AI & DSP Backend", 
                    desc: "Bahasa inti pada sisi server untuk mengelola orkestrasi pemrosesan sinyal digital dan eksekusi fungsi pemisahan instrumen." 
                  },
                  { 
                    name: "FastAPI", 
                    role: "REST API Server", 
                    desc: "Framework backend untuk memproses request ekstraksi audio secara asinkronus dan real-time dari sisi klien." 
                  },
                  { 
                    name: "Spleeter by Deezer", 
                    role: "Source Separation", 
                    desc: "Engine Machine Learning yang diintegrasikan untuk memisahkan vokal dan instrumen dari track audio secara otomatis." 
                  },
                  { 
                    name: "Librosa", 
                    role: "Cloud Audio Analysis", 
                    desc: "Pustaka Python di sisi server untuk melakukan analisis sinyal digital tingkat lanjut dan ekstraksi fitur audio musik yang kompleks." 
                  },
                  { 
                    name: "TarsosDSP", 
                    role: "On-Device Processing", 
                    desc: "Pustaka pemrosesan audio Java yang beroperasi langsung di HP pengguna untuk deteksi pitch dan ekstraksi suara secara real-time." 
                  },
                  { 
                    name: "Firebase", 
                    role: "Cloud & BaaS", 
                    desc: "Platform Backend-as-a-Service (BaaS) dari Google untuk memfasilitasi hosting, manajemen data, dan analitik ekosistem aplikasi." 
                  },
                  { 
                    name: "RapidAPI", 
                    role: "API Gateway", 
                    desc: "Platform manajemen terpusat untuk mendistribusikan endpoint, mengatur rate-limiting, dan memonitor trafik keamanan server backend." 
                  }
                ].map((tech, i) => (
                  <div 
                    key={i} 
                    className="w-[300px] group border border-zinc-900 bg-zinc-900/30 p-8 rounded-none hover:bg-white hover:text-black transition-all duration-500 flex flex-col justify-between shrink-0 cursor-default"
                  >
                    <div>
                      <h4 className="text-xl font-black tracking-tight mb-3 text-white group-hover:text-black">{tech.name}</h4>
                      <p className="text-zinc-500 group-hover:text-zinc-800 text-xs font-medium leading-relaxed whitespace-normal italic">
                        "{tech.desc}"
                      </p>
                    </div>
                    <div className="flex flex-col mt-6">
                      <div className="w-8 h-[1px] bg-zinc-800 group-hover:bg-zinc-300 mb-3"></div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-600 group-hover:text-zinc-500 uppercase">
                        {tech.role}
                      </span>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Efek Fade di sisi Kiri dan Kanan agar transisi masuk/keluar terlihat halus */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
        </div>
      </ScrollSection>

      {/* 6. FINAL CTA */}
      <section id= "final-cta" className="py-32 bg-white text-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none italic">MULAI SEKARANG.</h2>
          <p className="text-zinc-600 mb-12 text-lg font-bold">Dapatkan referensi chord dalam waktu singkat.</p>
          <a href="https://auralis-app.duckdns.org/download-apk">
          <button className="bg-black text-white hover:bg-zinc-800 px-12 py-5 rounded-full font-black text-xl transition shadow-2xl">
            UNDUH AURALIS
          </button>
          </a>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-black py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src={webIcon} alt="Auralis Logo" className="w-10 h-10 grayscale brightness-200" />
              <span className="text-2xl font-black tracking-tighter ml-2">AURALIS</span>
            </div>
            <p className="text-zinc-600 text-sm font-medium tracking-tight">
              &copy; {new Date().getFullYear()} Hilman Fauzi Muharam. <br /> Built for precision.
            </p>
          </div>
          
          <div className="flex gap-8">
            <a href="https://github.com/nakiri00" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://instagram.com/h.fauziii._" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="mailto:h.fauzi0211@gmail.com" className="text-zinc-500 hover:text-white transition transform hover:scale-110">
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}