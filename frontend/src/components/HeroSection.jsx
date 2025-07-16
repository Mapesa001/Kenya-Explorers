
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'

function HeroSection({ heroRef }) {

    useGSAP(() => {
        // GSAP animation for the hero section
        //create timeline for the animations
        const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
        //animate the hero section
        tl.from('.ground', { y: 100, opacity: 0 }, "-=0.5")
          .from('.sun', { x: -100, opacity: 0, ease:'elastic' }, "-=0.5")
          .from('.mti1', { x: 100, opacity: 0 }, "-=0.5")
          .from('.mti2', { y: 100, opacity: 0 }, "-=0.5")
          .from('.giraffe', { x: 1500, opacity: 0, ease:'elastic' }, "-=0.5");
    }, []);

  return (
    <>
    <section
        ref={heroRef}
        className="w-full h-screen bg-cover bg-[url('/images/skybg.png')] -mb-10 bg-center flex items-center justify-center relative">
        <div className="absolute inset-0 z-0 overflow-x-">
            <img
                src="/images/ground.png"
                alt="Hero Background"
                className="ground w-full sm:mt-100 mt-110  size-[180px] absolute object-cover"
            />
            <img
                src="/images/sun.png"
                alt="Hero Background"
                className="sun w-full sm:size-[200px] size-[100px] sm:mt-30 mt-50 sm:left-[250px] -left-[50px] absolute object-contain"
            />
            <img
                src="/images/mti2.png"
                alt="Hero Background"
                className="mti1 w-full size-[400px] mt-20 right-[450px] absolute object-contain"
            />
            <img
                src="/images/mti2.png"
                alt="Hero Background"
                className="mti2 w-full sm:size-[280px] size-[280px] sm:mt-50 mt-55 sm:right-[550px] right-[150px] absolute object-contain"
            />
            <img
                src="/images/giraffe.png"
                alt="Hero Background"
                className="giraffe w-full sm:size-[280px] size-[210px] sm:mt-50 mt-75 sm:left-[350px] left-[50px] absolute object-contain"
            />
        </div>

        <div className="text-center sm:w-1/2 w-full z-10 px-6 mb-80 sm:mb-0 sm:ml-124 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Wild Nature Adventures
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Discover the untamed beauty of Africa — from sun-drenched savannahs to majestic wildlife.
          </p>
          <a
            href="#explore"
            className="inline-block backdrop-blur-sm bg-secondary hover:bg-secondary/80 text-white font-semibold py-3 px-6 rounded-full hover:ring-2 hover:ring-yellow-500 transition"
          >
            Explore Now
          </a>
        </div>
      </section>
    </>
  )
}

export default HeroSection