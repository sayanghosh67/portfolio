import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Showcase from './Showcase';
import Testimonials from './Testimonials';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

export default function OverlayManager() {
  // We place large vertical margins between sections to give the 3D camera
  // time and space to perform its cinematic transitions behind the text.
  return (
    <div className="relative z-10 w-full flex flex-col">
      <div className="min-h-screen"><Hero /></div>
      <div className="min-h-screen my-[20vh]"><About /></div>
      <div className="min-h-screen my-[20vh]"><Experience /></div>
      <div className="min-h-screen my-[20vh]"><Skills /></div>
      <div className="min-h-screen my-[20vh]"><Projects /></div>
      <div className="min-h-screen my-[20vh]"><Showcase /></div>
      <div className="min-h-screen my-[20vh]"><Testimonials /></div>
      <div className="min-h-screen mt-[20vh]"><Contact /></div>
    </div>
  );
}
