import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WhyChooseUs() {

    // GSAP animations
  useGSAP(() => {
    gsap.from('#explore', {
      scrollTrigger: {
        trigger: '#explore',
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".whychooseus",
          start: "top 80%", // when .whychooseus hits 80% of viewport
          end: "bottom 30%",
          toggleActions: "play none none reverse",
          markers: false, // set true for debugging
        },
      });
  
      tl.from(".whytxt", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".jeepimg",
          {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8" // overlap the animation with previous
        );
  }, []);
  return (
    <>
    <section id="explore" className="py-20 px-6 md:px-20 bg-gray-100 dark:bg-gray-100 overflow-x-none">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="whychooseus text-3xl font-bold mb-4 text-secondary">Why Choose Us?</h2>
            <p className="whytxt text-secondary mb-4">
              We offer curated wildlife tours across Africa, led by expert guides, with comfort and authenticity in mind.
              Whether you’re after thrilling safaris, quiet nature walks, or cultural encounters — we’ve got you covered.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-secondary">
              <li>Experienced local guides</li>
              <li>Eco-friendly accommodations</li>
              <li>Flexible travel packages</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1542085215-673021bf5caa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Safari Jeep"
            className="jeepimg rounded-lg shadow-md"
          />
        </div>
      </section>
    </>
  )
}

export default WhyChooseUs