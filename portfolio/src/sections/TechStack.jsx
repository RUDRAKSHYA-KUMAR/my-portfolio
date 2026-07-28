import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { technologies, techCategories } from "../data/technologies";
import TechIcon from "../components/TechIcon";
import "../styles/techstack.css";

gsap.registerPlugin(ScrollTrigger);

function TechStack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Stagger each category group in */
      const groups = sectionRef.current.querySelectorAll(".techstack__group");
      groups.forEach((group, i) => {
        const icons = group.querySelectorAll(".tech-icon");
        gsap.fromTo(
          [group.querySelector(".techstack__group-label"), ...icons],
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" className="techstack" ref={sectionRef}>
      <div className="techstack__inner">
        {/* Header */}
        <div className="techstack__header">
          <span className="techstack__label">Tech Stack</span>
          <h2 className="techstack__heading">Tools I Work With</h2>
          <p className="techstack__subtext">
            A curated set of technologies I reach for when building intelligent,
            well-crafted software.
          </p>
        </div>

        {/* Category groups */}
        <div className="techstack__groups">
          {techCategories.map((category) => {
            const techs = technologies.filter((t) => t.category === category);
            return (
              <div key={category} className="techstack__group">
                <span className="techstack__group-label">{category}</span>
                <div className="techstack__icons">
                  {techs.map((tech) => (
                    <TechIcon key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative number */}
      <span className="techstack__deco-num" aria-hidden="true">07</span>
    </section>
  );
}

export default TechStack;