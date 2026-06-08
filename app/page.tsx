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
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="font-bold text-2xl tracking-tighter flex items-center gap-2 group cursor-pointer text-left outline-none hover:scale-[1.02] active:scale-[0.98] transition-transform duration-500"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500"></div>
            Nexus<span className="text-zinc-500 font-light group-hover:text-zinc-300 transition-colors duration-500">Digital</span>
          </button>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#process" className="hover:text-white transition-colors">Process</Link>
            <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="#contact" className="relative group px-6 py-2.5 rounded-full overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-white transition-all duration-300 group-hover:scale-105"></span>
              <span className="relative text-black font-semibold">Let&apos;s Talk</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-zinc-300 mb-10 backdrop-blur-md shadow-2xl animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            Full-Service Digital Agency
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-4xl text-balance leading-tight animate-fade-in-up delay-100">
            We Build Brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-purple-300 to-blue-400 animate-gradient-x">That People Remember.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl text-balance mb-12 leading-relaxed font-light animate-fade-in-up delay-200">
            Merging stunning visual design with data-driven marketing to scale ambitious local and global brands to new heights.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center mb-24 animate-fade-in-up delay-300">
            {/* Primary CTA */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-20 blur-md group-hover:opacity-60 transition duration-500 animate-gradient-x"></div>
              <Link href="#contact" className="relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-zinc-50 active:scale-[0.98] scale-100 group-hover:scale-[1.02]">
                Start a Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Secondary CTA */}
            <Link href="#portfolio" className="group relative flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-white/10 bg-black/20 px-8 text-sm font-medium text-zinc-300 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white active:scale-[0.98]">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">Explore Our Work</span>
            </Link>
          </div>

          {/* Statistics Bar */}
          <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl animate-fade-in-up delay-400">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white mb-2">$50M+</span>
              <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Revenue Generated</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white mb-2">200+</span>
              <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white mb-2">99%</span>
              <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Client Retention</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white mb-2">15+</span>
              <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Industry Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-10 border-y border-white/[0.05] bg-black/50 overflow-hidden flex relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        <div className="max-w-7xl mx-auto w-full px-6">
          <p className="text-center text-sm font-medium text-zinc-600 uppercase tracking-widest mb-8">Trusted by industry leaders globally</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {/* SVG Logo Placeholders using styled text for robustness */}
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-1"><span className="text-blue-500">▲</span> ACME</div>
            <div className="text-2xl font-serif font-bold italic">Globex</div>
            <div className="text-2xl font-bold tracking-widest uppercase flex items-center"><div className="w-4 h-4 bg-white rounded-sm mr-2 transform rotate-45"></div> SOYUZ</div>
            <div className="text-2xl font-black lowercase tracking-tighter">initech.</div>
            <div className="text-2xl font-medium tracking-wide flex items-center gap-2"><div className="w-5 h-5 rounded-full border-4 border-white"></div> Massive</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Bento Grid) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">The Nexus Advantage</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">Why businesses trust us with their complete digital presence and marketing spend.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] hover:border-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
              <h3 className="text-3xl font-bold mb-4 text-white">Technical & Creative Excellence</h3>
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed mb-8">We don&apos;t just build basic websites; we engineer robust digital experiences and craft stunning brand identities that leave a lasting mark on your industry.</p>
              <div className="flex gap-4">
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-sm text-zinc-300">Modern Web Tech</span>
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-sm text-zinc-300">Brand Strategy</span>
                <span className="px-4 py-2 rounded-full bg-white/[0.05] text-sm text-zinc-300">High-End Production</span>
              </div>
            </div>
            
            <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <svg className="w-12 h-12 text-blue-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-2xl font-bold mb-4 text-white">Rapid Turnaround</h3>
                <p className="text-zinc-400 leading-relaxed">Our streamlined agile processes ensure we ship high-quality campaigns and designs faster than traditional agencies.</p>
              </div>
            </div>

            <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
              <svg className="w-12 h-12 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-2xl font-bold mb-4 text-white">Data-Driven Approach</h3>
              <p className="text-zinc-400 leading-relaxed">We don&apos;t guess. Every marketing campaign and design decision is backed by analytics and proven conversion principles.</p>
            </div>

            <div className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-tr from-transparent via-white/[0.02] to-blue-900/10 border border-white/[0.05] hover:border-white/10 transition-colors relative overflow-hidden group">
              <h3 className="text-3xl font-bold mb-4 text-white">Award-Winning Execution</h3>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-8">Aesthetics meet conversion. We design websites, ads, and videos that not only look breathtaking but are meticulously crafted to drive sales.</p>
              <div className="absolute right-10 bottom-10 opacity-50 group-hover:opacity-100 transition-opacity">
                <svg className="w-24 h-24 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Gradient Borders */}
      <section id="services" className="py-32 px-6 border-t border-white/[0.05] relative bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">Our Capabilities</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">End-to-End Solutions</h2>
              <p className="text-zinc-400 text-xl">We handle everything from your brand identity to building your website and driving traffic to it.</p>
            </div>
            <Link href="#contact" className="hidden md:inline-flex items-center gap-2 text-white font-semibold hover:text-purple-400 transition-colors border-b border-white hover:border-purple-400 pb-1">
              Discuss Your Needs
              <ArrowRightIcon />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <section id="process" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">How We Work</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl">A proven methodology that turns your business goals into tangible results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <ProcessStep num="01" title="Discovery" desc="Deep-dive into your business goals, target audience, and competitive landscape." delay="" />
            <ProcessStep num="02" title="Strategy" desc="Architecting the campaign, defining the brand voice, and establishing targets." delay="md:mt-12" />
            <ProcessStep num="03" title="Creation" desc="Producing high-quality designs, developing the site, and editing the media." delay="" />
            <ProcessStep num="04" title="Growth" desc="Launching campaigns, analyzing data, and continuously optimizing for scale." delay="md:mt-12" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 border-t border-white/[0.05] bg-zinc-950/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Featured Case Studies</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-xl">Measurable results paired with breathtaking aesthetics.</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 bg-white/[0.02] p-2 rounded-full border border-white/[0.05]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-2 text-center py-20 text-zinc-500">
                No projects found in this category.
              </div>
            )}
          </div>
          
          <div className="mt-20">
            <Link href="#contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all group">
              <span className="font-semibold text-white">View Full Archive</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-center">Don&apos;t Just Take Our Word For It</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Nexus Digital delivered an ecommerce platform that completely redefined our business. The conversion rate increase was immediate and substantial."
              author="Sarah Jenkins"
              role="Founder, Lumina Ecommerce"
              rating={5}
            />
            <TestimonialCard 
              quote="Their Facebook ads and lead generation strategies brought us more qualified real estate leads in one month than we had in the entire previous year."
              author="David Chen"
              role="Director, Horizon Real Estate"
              rating={5}
            />
            <TestimonialCard 
              quote="The video editing team completely transformed our YouTube channel. Our retention rate tripled, and the cinematic quality sets us apart from everyone."
              author="Elena Rodriguez"
              role="Creator, TechFlow"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto border border-white/10 bg-white/[0.01] backdrop-blur-2xl p-8 md:p-16 rounded-[3rem] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">Ready to Dominate <br/>Your Industry?</h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-xl font-light">Join the ranks of high-growth companies that trust us to engineer their digital success. Drop us a message to discuss your next big project.</p>
              
              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-5 text-zinc-300">
                   <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner">
                     <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </div>
                   <div>
                     <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase mb-1">Email Us</div>
                     <div className="font-semibold text-white text-lg">hello@nexus.digital</div>
                   </div>
                </div>
                <div className="flex items-center gap-5 text-zinc-300">
                   <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner">
                     <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   </div>
                   <div>
                     <div className="text-sm text-zinc-500 font-medium tracking-wide uppercase mb-1">Visit Us</div>
                     <div className="font-semibold text-white text-lg">120 Innovation Drive, NY</div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 p-8 md:p-10 rounded-3xl border border-white/5 shadow-inner">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/[0.05] relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-8 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
            <span className="font-bold text-xl tracking-tighter text-white">Nexus<span className="text-zinc-500 font-light">Digital</span></span>
          </div>
          <p className="text-zinc-500 text-sm mb-8 md:mb-0">© 2026 Nexus Digital. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Twitter</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">LinkedIn</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Instagram</Link>
          </div>
        </div>
      </footer>

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
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
      <div className="relative h-full p-10 rounded-[23px] bg-zinc-950 flex flex-col items-start hover:bg-zinc-900/80 transition-colors duration-500">
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
      <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center text-3xl font-bold text-zinc-700 mb-8 relative z-10 group-hover:text-white group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
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
    <div className="group cursor-pointer flex flex-col h-full w-full">
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

function TestimonialCard({ quote, author, role, rating }: { quote: string, author: string, role: string, rating: number }) {
  return (
    <div className="p-12 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] relative hover:border-white/10 transition-colors h-full flex flex-col justify-between">
      <div>
        <div className="flex gap-1 mb-8">
          {[...Array(rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-xl text-zinc-300 leading-relaxed mb-10 font-light">&quot;{quote}&quot;</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center font-bold text-xl border border-white/10 shadow-inner">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-white text-lg">{author}</h4>
          <p className="text-zinc-500">{role}</p>
        </div>
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
    let newErrors: Record<string, string> = {};
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && <span className="text-red-400 text-xs px-1">{errors.email}</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Company (Optional)</label>
          <input 
            type="text" 
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
            placeholder="Acme Corp"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 px-1">Budget</label>
          <select 
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
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
          onChange={(e) => setFormData({...formData, message: e.target.value})}
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
