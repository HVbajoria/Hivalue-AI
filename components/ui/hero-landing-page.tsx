import { useEffect, useState } from "react"
import { ArrowRight } from 'lucide-react'
import { DottedSurface } from './dotted-surface'
import { Navbar } from './navbar'

export function HivalueLanding() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="main min-h-screen pt-32 pb-12 relative flex items-center">
        {/* Dotted Surface Background */}
        <DottedSurface />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff]/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#0084ff]/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#0a0a0a]/40" />
        </div>

        <div className="content-wrapper max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row justify-between items-center relative z-[2] gap-12 w-full">
          {/* Left Content */}
          <div className="max-w-[700px]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 tracking-[-2px]">
              Accelerate your
              <br />
              AI monetization
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#b8b8b8] mb-8 font-normal">
              Trusted by entrepreneurs worldwide, we provide 200+ proven strategies
              <br className="hidden md:block" />
              to transform AI into sustainable income streams.
            </p>
            <div className="flex gap-5 items-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('strategies');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-2.5 bg-[#0084ff] text-white py-3.5 px-7 rounded-md text-base font-medium hover:bg-[#0066cc] hover:translate-x-0.5 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.location.hash = 'about'}
                className="bg-transparent text-[#b8b8b8] py-3.5 px-7 text-base font-medium hover:text-white transition-colors duration-200"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex gap-12 md:gap-16 items-center justify-center lg:justify-end">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-light leading-none mb-2">200+</div>
              <div className="text-sm md:text-base text-[#b8b8b8] font-normal">AI Strategies</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-light leading-none mb-2">40+</div>
              <div className="text-sm md:text-base text-[#b8b8b8] font-normal">Industries covered</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
