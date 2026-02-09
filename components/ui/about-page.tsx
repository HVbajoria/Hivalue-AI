"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Linkedin, Github, Twitter, Award, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const certifications = [
    { name: "Microsoft Certified", count: 7 },
    { name: "Oracle Certified", count: 5 },
    { name: "Google Certified", count: 3 },
    { name: "GitHub Certified", count: 1 },
  ]

  const roles = [
    "AI & Product Innovation @Unstop",
    "GitHub Campus Expert",
    "Knight @LeetCode",
    "Azure Developer Lead",
    "Top Mentor @Unstop"
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-8">
        <Button
          onClick={() => window.location.hash = ''}
          variant="ghost"
          size="sm"
          className="gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home</span>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-indigo-300 text-sm font-semibold">About This Project</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              AI Wealth <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Blueprint</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive collection of 200+ proven AI monetization strategies, tools, and blueprints to help entrepreneurs transform artificial intelligence into real income.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Created By</h2>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                Harshavardhan Bajoria
              </h3>
              
              <div className="space-y-3 mb-8">
                {roles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm md:text-base">{role}</span>
                  </motion.div>
                ))}
              </div>

              {/* Certifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-indigo-500/50 transition-all"
                  >
                    <Award className="w-6 h-6 text-indigo-400 mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">x{cert.count}</div>
                    <div className="text-xs text-slate-400">{cert.name}</div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="border-t border-slate-700/50 pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="https://www.linkedin.com/in/harshavardhan-bajoria/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-[#0077B5] hover:bg-[#006399] text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.github.com/hvbajoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all shadow-lg border border-slate-600"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://twitter.com/hvbajoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-indigo-500/30 p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your AI Journey?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Explore 200+ monetization strategies and transform AI into your income stream today.
            </p>
            <Button
              onClick={() => window.location.hash = ''}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              Explore Blueprints
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
