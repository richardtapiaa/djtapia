import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ScrollStackClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }


    const wrap = document.getElementById('stackWrap'); 
    const panels = gsap.utils.toArray('.panel');
    const lastGalleryItem = document.querySelector('.gallery-container .gallery-item:last-child');


    if (!wrap && panels.length < 2 && !lastGalleryItem) return;

    const ctx = gsap.context(() => {
     
      ScrollTrigger.matchMedia({
        "(min-width:821px)": function() {

        
          if (lastGalleryItem && wrap && panels.length > 0) {
            const totalPanels = panels.length;
            const endDistance = (totalPanels - 1) * window.innerHeight;
            wrap.style.height = `${window.innerHeight}px`;

            const tween = gsap.to(panels, {
              yPercent: -100 * (totalPanels - 1),
              ease: "none",
              scrollTrigger: {
                trigger: lastGalleryItem,
                start: "bottom top",     
                scrub: 0.8,
                pin: true,
                pinSpacing: false,      
                anticipatePin: 1,
              
              }
            });

           
            const onResize = () => {
              wrap.style.height = `${window.innerHeight}px`;
              ScrollTrigger.refresh();
            };
            window.addEventListener('resize', onResize);

            
            return () => {
              tween.kill();
              ScrollTrigger.getAll().forEach(st => st.kill());
              window.removeEventListener('resize', onResize);
            };
          }

        
          if (panels.length > 1) {
            const created = panels.map((panel, i) => {
              if (i === panels.length - 1) return null;
              return ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                pin: true,
                pinSpacing: false,
                scrub: true,
               
              });
            }).filter(Boolean);

           
            return () => {
              created.forEach(st => st && st.kill && st.kill());
              ScrollTrigger.getAll().forEach(st => st.kill());
            };
          }
        }, 
        "(max-width:820px)": function() {
         
          ScrollTrigger.refresh();
        }
      }); 
    });

    
    return () => {
      try {
        ctx.revert(); 
        ScrollTrigger.getAll().forEach(st => st.kill());
      } catch (e) { /* noop */ }
    };
  }, []);

  return null;
}