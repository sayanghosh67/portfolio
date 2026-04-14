import React, { useState } from 'react';
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub, FaFileExcel, FaDatabase, FaChartLine, FaPalette, FaFire } from 'react-icons/fa';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <section id="skills" className="relative w-full bg-red-500 text-white flex flex-col md:flex-row min-h-[70vh] border-y-8 border-black z-10">
      <div className="w-full md:w-1/3 p-12 md:p-20 flex flex-col justify-center">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Skills</h2>
        <ul className="space-y-6 font-inter font-bold text-2xl">
          <li 
            onMouseEnter={() => setActiveTab('Programming')}
            onMouseLeave={() => setActiveTab(null)}
            className={`uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'Programming' ? 'pl-4 text-black' : 'hover:pl-4 hover:text-black'}`}>
            Programming
          </li>
          <li 
            onMouseEnter={() => setActiveTab('Web')}
            onMouseLeave={() => setActiveTab(null)}
            className={`uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'Web' ? 'pl-4 text-black' : 'hover:pl-4 hover:text-black'}`}>
            Web Development
          </li>
          <li 
            onMouseEnter={() => setActiveTab('Tools')}
            onMouseLeave={() => setActiveTab(null)}
            className={`uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'Tools' ? 'pl-4 text-black' : 'hover:pl-4 hover:text-black'}`}>
            Tools & Tech
          </li>
          <li 
            onMouseEnter={() => setActiveTab('Data')}
            onMouseLeave={() => setActiveTab(null)}
            className={`uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'Data' ? 'pl-4 text-black' : 'hover:pl-4 hover:text-black'}`}>
            Data & Analytics
          </li>
        </ul>
      </div>
      <div className="w-full md:w-2/3 p-12 md:p-20 flex flex-col justify-center bg-black/10">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-white">Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl font-inter">
          
          <div className={`bg-black/90 p-6 rounded-xl transition-all duration-300 cursor-default ${activeTab === 'Programming' ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-105 z-10' : 'border border-white/10 shadow-[6px_6px_0_rgba(239,68,68,1)]'}`}>
            <h3 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Programming</h3>
            <ul className="text-neutral-300 text-base space-y-3">
              <li className="flex items-center gap-3"><FaJava className="text-red-500" size={18}/> Java (DSA, OOP)</li>
              <li className="flex items-center gap-3"><FaPython className="text-blue-400" size={18}/> Python</li>
              <li className="flex items-center gap-3"><span className="font-bold text-purple-400 text-sm ml-0.5">C</span> C Programming</li>
            </ul>
          </div>

          <div className={`bg-black/90 p-6 rounded-xl transition-all duration-300 cursor-default ${activeTab === 'Web' ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-105 z-10' : 'border border-white/10 shadow-[6px_6px_0_rgba(239,68,68,1)]'}`}>
            <h3 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Web Development</h3>
            <ul className="text-neutral-300 text-base space-y-3">
              <li className="flex items-center gap-3">
                <FaHtml5 className="text-orange-500" size={18}/>
                <FaCss3Alt className="text-blue-500" size={18}/>
                <FaJsSquare className="text-yellow-400" size={18}/> 
                HTML, CSS, JS
              </li>
              <li className="flex items-center gap-3">
                <FaReact className="text-cyan-400" size={18}/>
                <FaPalette className="text-teal-400" size={18}/>
                React, Tailwind
              </li>
              <li className="flex items-center gap-3">
                <FaNodeJs className="text-green-500" size={18}/> Node.js
              </li>
            </ul>
          </div>

          <div className={`bg-black/90 p-6 rounded-xl transition-all duration-300 cursor-default ${activeTab === 'Tools' ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-105 z-10' : 'border border-white/10 shadow-[6px_6px_0_rgba(239,68,68,1)]'}`}>
            <h3 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Tools & Technologies</h3>
            <ul className="text-neutral-300 text-base space-y-3">
              <li className="flex items-center gap-3"><FaGithub className="text-white" size={18}/> Git, GitHub</li>
              <li className="flex items-center gap-3"><span className="font-bold text-white text-xs whitespace-nowrap">THREE</span> Three.js, GSAP</li>
              <li className="flex items-center gap-3"><FaFire className="text-yellow-500" size={18}/> Firebase</li>
            </ul>
          </div>

          <div className={`bg-black/90 p-6 rounded-xl transition-all duration-300 cursor-default ${activeTab === 'Data' ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-105 z-10' : 'border border-white/10 shadow-[6px_6px_0_rgba(239,68,68,1)]'}`}>
            <h3 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Data & Analytics</h3>
            <ul className="text-neutral-300 text-base space-y-3">
              <li className="flex items-center gap-3"><FaDatabase className="text-yellow-500" size={18}/> Power BI</li>
              <li className="flex items-center gap-3"><FaFileExcel className="text-green-600" size={18}/> Excel</li>
              <li className="flex items-center gap-3"><FaChartLine className="text-blue-500" size={18}/> R Programming</li>
            </ul>
          </div>

        </div>
      </div>
      {/* Tape overlays */}
      <div className="absolute top-0 right-10 w-32 h-10 bg-white/40 backdrop-blur-md border border-white -translate-y-1/2 -rotate-12 z-20"></div>
    </section>
  );
}
