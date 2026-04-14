import React from 'react';

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-white text-black py-32 px-8 md:px-20 z-10 flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2 space-y-8 z-10">
        <h2 className="text-6xl md:text-8xl font-anton uppercase underline decoration-red-500 decoration-8 underline-offset-8">About Me</h2>
        <h3 className="text-2xl font-bold font-inter text-red-500">Software Developer & CSE (AI) Student</h3>
        <p className="text-lg md:text-xl max-w-lg font-inter font-medium text-neutral-700 leading-relaxed">
          I am a <strong>Computer Science Engineering (AI) student</strong> passionate about building modern, scalable software and extracting insights from data.
          <br /><br />
          My core strengths include <strong>Data Structures & Algorithms (DSA) using Java</strong>, Object-Oriented Programming (OOP), and full-stack development. I am proficient in <strong>Java, Python, C</strong>, and data tools like <strong>Power BI, Excel, and R Programming</strong>.
          <br /><br />
          I focus on writing clean, maintainable code and solving real-world problems with robust, high-performance solutions.
        </p>
      </div>

      <div className="w-full md:w-1/2 mt-16 md:mt-0 relative flex justify-center z-10">
        {/* Red block behind */}
        <div className="absolute top-10 right-10 md:right-32 w-[300px] h-[400px] bg-red-500 rounded-tl-[100px] z-0"></div>

        {/* Sayan's actual photo */}
        <div className="relative z-10 w-[300px] h-[420px] overflow-hidden transform rotate-3 shadow-2xl">
          <img
            src={`${import.meta.env.BASE_URL}sayan.jpg`}
            alt="Sayan Ghosh - Full Stack Developer"
            className="w-full h-full object-cover object-top"
          />
          {/* Tape overlay */}
          <div className="absolute -top-4 -right-4 w-20 h-10 bg-white/40 backdrop-blur-md -rotate-12 border border-white/20 shadow-sm"></div>
        </div>

        {/* Circular text */}
        <div className="absolute left-0 bottom-20 -rotate-90 origin-bottom-left font-marker text-4xl text-red-500 whitespace-nowrap drop-shadow-md">
          I am A Developer
        </div>
      </div>
    </section>
  );
}
