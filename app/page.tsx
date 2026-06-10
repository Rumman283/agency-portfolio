"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    { id: 1, title: "Restaurant Redesign", category: "Web Development", gradient: "from-blue-500 via-indigo-600 to-slate-900", metric: "250% Traffic Growth" },
    { id: 2, title: "Lumina Ecommerce", category: "Web Development", gradient: "from-rose-500 via-pink-600 to-purple-900", metric: "3.2x Conv. Rate" },
    { id: 3, title: "Horizon Real Estate", category: "Digital Marketing", gradient: "from-emerald-400 via-teal-600 to-cyan-900", metric: "1M+ Leads Generated" },
    { id: 4, title: "Gym Brand Identity", category: "Graphic Design", gradient: "from-zinc-600 via-zinc-800 to-black", metric: "Award Winning" },
    { id: 5, title: "Velocity Facebook Ads", category: "Digital Marketing", gradient: "from-violet-500 via-purple-700 to-fuchsia-900", metric: "4x Return on Ad Spend" },
    { id: 6, title: "TechFlow YouTube", category: "Video Editing", gradient: "from-amber-400 via-orange-600 to-red-900", metric: "10M+ Video Views" },
  ];

  const categories = ["All", "Web Development", "Graphic Design", "Digital Marketing", "Video Editing"];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      <AnimatedBackground />
      {/* Navigation */}
      <div className="fixed top-3 md:top-5 w-full z-50 px-4 md:px-6 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/10 bg-black/40 backdrop-blur-md md:backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.12)] transition-all duration-500">
          <div className="px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="group cursor-pointer text-left outline-none hover:opacity-80 active:scale-[0.98] transition-all duration-500 flex items-center"
            >
              <Logo />
            </button>
            <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-zinc-400">
              <Link href="#services" className="hover:text-white transition-colors">Services</Link>
              <Link href="#process" className="hover:text-white transition-colors">Process</Link>
              <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <Link href="#contact" className="relative group px-6 py-2.5 rounded-full overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 ml-4 shadow-[0_0_0_rgba(168,85,247,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-zinc-200 group-hover:text-white transition-colors">Let&apos;s Talk</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-40 md:pb-12 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-b from-purple-500/10 md:from-purple-500/20 to-blue-500/10 md:to-blue-500/20 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md shadow-2xl animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Premium Creative Agency
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 max-w-5xl text-balance leading-[1.05] animate-fade-in-up delay-100 relative">
            Designing The Future <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-purple-300 to-blue-400 animate-gradient-x drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Of Digital Brands.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl text-balance mb-6 md:mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
            We build premium websites, digital identities and growth systems for ambitious startups and modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full justify-center mb-10 md:mb-16 animate-fade-in-up delay-300">
            {/* Primary CTA */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-20 blur-md group-hover:opacity-60 transition duration-500 animate-gradient-x"></div>
              <Link href="#contact" className="relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-zinc-50 active:scale-[0.98] scale-100 hover:scale-[1.05] group-hover:scale-[1.05]">
                Start a Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Secondary CTA */}
            <Link href="#portfolio" className="group relative flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-white/10 bg-black/20 px-8 text-sm font-medium text-zinc-300 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white active:scale-[0.98] hover:scale-[1.02]">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">View Selected Work</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-14 md:py-20 lg:py-28 border-y border-white/[0.02] bg-zinc-950/30 overflow-hidden flex relative animate-fade-in-up delay-400">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center">
          <p className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em] mb-4 md:mb-10">Trusted by global category leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="text-2xl font-bold tracking-tighter">Stripe</div>
            <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <svg viewBox="0 0 116 100" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z"/></svg> Vercel
            </div>
            <div className="text-2xl font-bold tracking-tight">Framer</div>
            <div className="text-2xl font-bold tracking-tight">Notion</div>
            <div className="text-2xl font-bold tracking-tight">Linear</div>
          </div>
          
          <div className="mt-8 md:mt-16 flex flex-col items-center">
            <p className="text-center text-xs font-semibold text-zinc-600 uppercase tracking-[0.2em] mb-3 md:mb-6">Built With</p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-zinc-400">
              <span>Next.js</span>
              <span className="text-zinc-700">•</span>
              <span>React</span>
              <span className="text-zinc-700">•</span>
              <span>TypeScript</span>
              <span className="text-zinc-700">•</span>
              <span>Tailwind CSS</span>
              <span className="text-zinc-700">•</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Bento Grid) */}
      <section className="py-14 md:py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">The Arqovia Advantage</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-balance">Why businesses trust us with their complete digital presence and marketing spend.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div className="md:col-span-2 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] hover:border-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Technical & Creative Excellence</h3>
              <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed mb-8">We don&apos;t just build basic websites; we engineer robust digital experiences and craft stunning brand identities that leave a lasting mark on your industry.</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-xs md:text-sm text-zinc-300">Modern Web Tech</span>
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-xs md:text-sm text-zinc-300">Brand Strategy</span>
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-xs md:text-sm text-zinc-300">High-End Production</span>
              </div>
            </div>

            <div className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <svg className="w-10 md:w-12 h-10 md:h-12 text-blue-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Rapid Turnaround</h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">Our streamlined agile processes ensure we ship high-quality campaigns and designs faster than traditional agencies.</p>
              </div>
            </div>

            <div className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
              <svg className="w-10 md:w-12 h-10 md:h-12 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Data-Driven Approach</h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">We don&apos;t guess. Every marketing campaign and design decision is backed by analytics and proven conversion principles.</p>
            </div>

            <div className="md:col-span-2 p-6 md:p-10 rounded-3xl bg-gradient-to-tr from-transparent via-white/[0.02] to-blue-900/10 border border-white/[0.05] hover:border-white/10 transition-colors relative overflow-hidden group">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Award-Winning Execution</h3>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed mb-8">Aesthetics meet conversion. We design websites, ads, and videos that not only look breathtaking but are meticulously crafted to drive sales.</p>
              <div className="absolute right-10 bottom-10 opacity-50 group-hover:opacity-100 transition-opacity hidden md:block">
                <svg className="w-24 h-24 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Gradient Borders */}
      <section id="services" className="py-14 md:py-20 lg:py-28 px-6 border-t border-white/[0.05] relative bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <div className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">Our Capabilities</div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">End-to-End Solutions</h2>
              <p className="text-zinc-400 text-base md:text-lg lg:text-xl text-balance">We handle everything from your brand identity to building your website and driving traffic to it.</p>
            </div>
            <Link href="#contact" className="hidden md:inline-flex items-center gap-2 text-white font-semibold hover:text-purple-400 transition-colors border-b border-white hover:border-purple-400 pb-1">
              Discuss Your Needs
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <ServiceCard
              title="Web Development"
              desc="High-performance, scalable websites and ecommerce stores built to convert. We focus on speed, mobile responsiveness, and clean architecture."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
              color="from-blue-500 to-cyan-400"
            />
            <ServiceCard
              title="Graphic Design"
              desc="Memorable brand identities, logos, and visual systems that leave a lasting impression on your audience and elevate your market positioning."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />}
              color="from-purple-500 to-pink-500"
            />
            <ServiceCard
              title="Digital Marketing"
              desc="Data-driven Facebook & Google ad campaigns, SEO optimization, and lead generation strategies designed to maximize your return on ad spend."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
              color="from-emerald-400 to-teal-500"
            />
            <ServiceCard
              title="Video Editing"
              desc="Cinematic storytelling, YouTube video editing, and engaging motion graphics that capture attention and convert viewers into loyal customers."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />}
              color="from-amber-400 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-14 md:py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">Our Process</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-balance">A proven methodology that turns your business goals into tangible results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <ProcessStep num="01" title="Discovery" desc="Deep-dive into your business goals and competitive landscape." delay="" />
            <ProcessStep num="02" title="Strategy" desc="Architecting the plan, defining targets and brand voice." delay="md:mt-12" />
            <ProcessStep num="03" title="Design" desc="Crafting premium aesthetics and intuitive user experiences." delay="" />
            <ProcessStep num="04" title="Development" desc="Building scalable, robust, and lightning-fast solutions." delay="md:mt-12" />
            <ProcessStep num="05" title="Launch" desc="Deploying, analyzing data, and continuously optimizing." delay="" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-14 md:py-20 lg:py-28 px-6 border-t border-white/[0.05] bg-zinc-950/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">Featured Case Studies</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-base md:text-lg lg:text-xl text-balance">Measurable results paired with breathtaking aesthetics.</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-16 bg-white/[0.02] p-2 rounded-full border border-white/[0.05]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-2 text-center py-20 text-zinc-500">
                No projects found in this category.
              </div>
            )}
          </div>

          <div className="mt-10 md:mt-20">
            <Link href="#contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all group">
              <span className="font-semibold text-white">View Full Archive</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-14 md:py-20 lg:py-28 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 py-8 md:p-20 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] relative hover:border-white/10 transition-colors text-center shadow-2xl backdrop-blur-sm group h-auto min-h-fit flex flex-col justify-center">
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="flex justify-center gap-1 mb-6 md:mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 md:w-6 h-5 md:h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-zinc-200 leading-snug md:leading-tight mb-6 md:mb-12 font-medium tracking-tight relative z-10 text-balance">&quot;Arqovia transformed our digital presence with a fast, elegant and conversion-focused website.&quot;</h2>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-2xl border border-white/10 shadow-inner">
                F
              </div>
              <div>
                <h4 className="font-bold text-white text-lg tracking-wide">Founder</h4>
                <p className="text-zinc-500 text-sm uppercase tracking-widest">Modern Commerce Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 md:py-20 lg:py-28 px-6 border-t border-white/[0.05] bg-zinc-950/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">Frequently Asked Questions</h2>
            <p className="text-zinc-400 text-base md:text-lg lg:text-xl text-balance">Everything you need to know about partnering with us.</p>
          </div>
          <div className="flex flex-col gap-4">
            <FAQItem question="How long does a project take?" answer="Typically, our standard website projects take between 4 to 8 weeks from discovery to launch, depending on the complexity and requirements." />
            <FAQItem question="What services do you offer?" answer="We offer a comprehensive suite of digital services including premium web design, full-stack development, brand identity creation, and performance marketing." />
            <FAQItem question="Do you work internationally?" answer="Yes, we are a remote-first agency and collaborate with ambitious startups and modern businesses globally." />
            <FAQItem question="How do we get started?" answer="Simply reach out via our contact form to schedule an initial discovery call. We'll discuss your goals, timeline, and how we can best support your vision." />
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-14 md:py-20 lg:py-28 px-6 relative overflow-hidden border-t border-white/[0.05]">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-b from-purple-900/10 md:from-purple-900/20 to-blue-900/10 md:to-blue-900/20 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto border border-white/10 bg-white/[0.01] backdrop-blur-md md:backdrop-blur-2xl p-6 md:p-16 rounded-3xl md:rounded-[3rem] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 md:mb-6 leading-tight">Ready to Dominate <br />Your Industry?</h2>
              <p className="text-base md:text-lg lg:text-xl text-zinc-400 mb-8 md:mb-10 max-w-xl font-light text-balance">Join the ranks of high-growth companies that trust us to engineer their digital success. Drop us a message to discuss your next big project.</p>

              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-5 text-zinc-300">
                  <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase mb-1">Email Us</div>
                    <div className="font-semibold text-white text-lg">hello@arqovia.digital</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 text-zinc-300">
                  <div className="w-14 h-14 rounded-full bg-white/[0.03] flex shrink-0 items-center justify-center border border-white/10 shadow-inner group-hover:bg-white/[0.05] transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase mb-1">Remote Worldwide</div>
                    <div className="font-semibold text-white text-lg mb-1">Available for projects globally.</div>
                    <div className="text-sm text-zinc-400 font-light mb-0.5">Typically responding within 24 hours.</div>
                    <div className="text-sm text-zinc-400 font-light">Available for startups, agencies and growing brands.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 p-6 md:p-10 rounded-3xl border border-white/5 shadow-inner">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-14 md:pt-20 lg:pt-28 pb-10 md:pb-16 px-6 border-t border-white/[0.05] relative z-10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-10 md:mb-24">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="text-zinc-400 leading-relaxed max-w-sm mt-4">We are an independent digital studio forging world-class brands and products for the ambitious.</p>
            <p className="text-zinc-500 font-medium text-sm mt-2 tracking-wide">Trusted by ambitious startups worldwide.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all hover:-translate-y-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all hover:-translate-y-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" /></svg>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2 tracking-wide">Studio</h4>
            <Link href="#portfolio" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Work</Link>
            <Link href="#services" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Capabilities</Link>
            <Link href="#process" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Process</Link>
            <Link href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Careers</Link>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2 tracking-wide">Social</h4>
            <Link href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Instagram</Link>
            <Link href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Twitter</Link>
            <Link href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Dribbble</Link>
            <Link href="#" className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all text-sm">Behance</Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2 tracking-wide">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-2">Insights on design, tech, and building brands.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-purple-500 w-full" />
              <button type="button" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">Join</button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05]">
          <div className="text-zinc-600 text-sm mb-4 md:mb-0 flex flex-col items-center md:items-start gap-1">
            <span>© 2026 Arqovia Digital Studio.</span>
            <span>Crafted with precision. Built for ambitious brands.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-zinc-600 hover:text-zinc-300 transition-colors text-sm">Privacy Policy</Link>
            <Link href="#" className="text-zinc-600 hover:text-zinc-300 transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </footer>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 group-hover:animate-ping"></div>
        <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

// Sub-components

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function ServiceCard({ title, desc, icon, color }: { title: string, desc: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="relative group p-[1px] rounded-3xl overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative h-auto md:h-full p-6 md:p-10 rounded-[23px] bg-zinc-950 flex flex-col items-start hover:bg-zinc-900/80 transition-colors duration-500">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} bg-opacity-10 flex items-center justify-center mb-8 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
            {icon}
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-lg">{desc}</p>
      </div>
    </div>
  );
}

function ProcessStep({ num, title, desc, delay }: { num: string, title: string, desc: string, delay: string }) {
  return (
    <div className={`relative flex flex-col items-center text-center ${delay} group`}>
      <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center text-3xl font-bold text-zinc-700 mb-4 md:mb-8 relative z-10 group-hover:text-white group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
        {num}
        <div className="absolute inset-0 rounded-full border border-purple-500/0 group-hover:animate-ping opacity-20"></div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ title, category, gradient, metric }: { title: string, category: string, gradient: string, metric: string }) {
  return (
    <div className="group cursor-pointer flex flex-col h-auto md:h-full w-full">
      <div className={`w-full aspect-[16/10] rounded-3xl mb-8 bg-gradient-to-br ${gradient} overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
        {/* Abstract shapes inside the gradient for texture */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/20 rounded-full blur-2xl"></div>

        {/* Interactive hover overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-black/40 scale-105 group-hover:scale-100">
          <div className="flex flex-col items-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-4 shadow-2xl">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="text-white font-bold tracking-widest uppercase text-sm">View Case Study</span>
          </div>
        </div>

        {/* Metric Badge */}
        <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2 transform group-hover:translate-y-2 opacity-100 group-hover:opacity-0 transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-white text-sm font-semibold">{metric}</span>
        </div>
      </div>
      <div className="flex justify-between items-end px-2">
        <div>
          <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">{category}</p>
        </div>
      </div>
    </div>
  );
}



function Logo() {
  return (
    <div className="flex items-center gap-4 group">
      <div className="relative flex items-center justify-center w-8 h-8 transition-transform duration-700 group-hover:scale-105">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
          <path d="M20 0L40 40H28L20 24L12 40H0L20 0Z" fill="url(#paint0_linear)" />
          <path d="M12 28L20 12L28 28H12Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="0.5" />
          <defs>
            <linearGradient id="paint0_linear" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span className="font-bold text-2xl tracking-[0.15em] text-white">ARQOVIA</span>
        <span className="font-medium text-[0.6rem] tracking-[0.4em] text-zinc-400 mt-1 pl-1 group-hover:text-zinc-300 transition-colors">DIGITAL STUDIO</span>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors`}
            placeholder="John Doe"
          />
          {errors.name && <span className="text-red-400 text-xs px-1">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && <span className="text-red-400 text-xs px-1">{errors.email}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Company (Optional)</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
            placeholder="Acme Corp"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Budget</label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors appearance-none"
          >
            <option value="" disabled className="bg-zinc-900">Select budget range</option>
            <option value="< $10k" className="bg-zinc-900">&lt; $10k</option>
            <option value="$10k - $25k" className="bg-zinc-900">$10k - $25k</option>
            <option value="$25k - $50k" className="bg-zinc-900">$25k - $50k</option>
            <option value="$50k+" className="bg-zinc-900">$50k+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-400 px-1">Project Details</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className={`w-full bg-white/[0.03] border ${errors.message ? 'border-red-500/50' : 'border-white/10'} focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors resize-none`}
          placeholder="Tell us about your goals..."
        ></textarea>
        {errors.message && <span className="text-red-400 text-xs px-1">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative group mt-2 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
        <span className="relative z-10 flex items-center gap-2">
          {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
          {!isSubmitting && !isSuccess && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </span>
      </button>

      {isSuccess && (
        <div className="mt-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center animate-fade-in-up">
          Thank you! Your message has been received. We will get back to you shortly.
        </div>
      )}
    </form>
  );
}

function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#030303]"></div>

      {/* Mouse following glow */}
      <div 
        className="hidden md:block absolute w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen transition-all duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
        }}
      ></div>

      {/* Radial glow behind headline (centered) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-gradient-to-b from-purple-600/10 via-blue-600/5 to-transparent blur-[120px] opacity-70"></div>

      {/* Floating orbs */}
      <div className="hidden md:block absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen animate-float-slow"></div>
      <div className="hidden md:block absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen animate-float-slow" style={{ animationDelay: '-5s' }}></div>
      <div className="hidden md:block absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] mix-blend-screen animate-float-slow" style={{ animationDelay: '-10s' }}></div>

      {/* Subtle moving light beams */}
      <div className="absolute inset-0 opacity-[0.02] animate-gradient-x" style={{ backgroundImage: 'linear-gradient(45deg, transparent 45%, white 50%, transparent 55%)' }}></div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-zinc-200 text-lg">{question}</span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

