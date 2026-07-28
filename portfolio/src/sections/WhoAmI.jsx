import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/whoami.css";

gsap.registerPlugin(ScrollTrigger);

function WhoAmI() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Measure how far the heading needs to travel */
      const heading = headingRef.current;
      const viewportW = window.innerWidth;

      /* Start fully off-screen left, end fully off-screen right */
      const startX = -(heading.scrollWidth * 0.1 + viewportW * 0.05);
      const endX   =  (viewportW * 0.1);

      gsap.fromTo(
        heading,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger:  sectionRef.current,
            start:    "top bottom",
            end:      "bottom top",
            scrub:    1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="whoami" className="whoami" ref={sectionRef} aria-label="Who I am — transition">
      <div className="whoami__track">
        <h2 className="whoami__heading" ref={headingRef} aria-hidden="false">
          WHO <span className="whoami__heading-accent">I AM</span>?
        </h2>
      </div>
    </section>
  );
}

export default WhoAmI;