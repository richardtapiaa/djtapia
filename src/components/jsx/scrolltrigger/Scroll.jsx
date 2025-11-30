import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function GsapPin() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const items = document.querySelectorAll(".gallery-item");

    items.forEach((item, index) => {
      
      ScrollTrigger.create({
        trigger: item,
        start: "top top",
        end: () => index === items.length - 1 ? "bottom top" : "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

  
      gsap.fromTo(item, 
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}