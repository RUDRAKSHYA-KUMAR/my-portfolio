import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const pinRef     = useRef(null);
  const cardsRef   = useRef([]);
  const bgTextRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(cardsRef.current, { opacity: 1, x: 0 });
        return;
      }

      const cards = cardsRef.current;
      const vw = window.innerWidth;
      const cardW = cards[0]?.offsetWidth || 480;

      /* Initial positions — all cards off-screen alternating */
      cards.forEach((card, i) => {
        const fromRight = i % 2 === 0;
        gsap.set(card, {
          x: fromRight ? vw + cardW : -(vw + cardW),
          opacity: 0,
        });
      });

      /* Master timeline — one card starts entering when previous is ~50% through */
      const tl = gsap.timeline();

      cards.forEach((card, i) => {
        const fromRight = i % 2 === 0;
        const exitRight = !fromRight;

        /* Enter */
        tl.to(
          card,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          i === 0 ? 0 : `-=0.5` /* Overlap: next enters when prev is 50% done */
        );

        /* Hold for a moment */
        tl.to(card, { duration: 0.8 });

        /* Exit to opposite side */
        if (i < cards.length - 1) {
          tl.to(card, {
            x: exitRight ? vw + cardW : -(vw + cardW),
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          });
        }
      });

      /* Background text subtle parallax */
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      ScrollTrigger.create({
        trigger:  pinRef.current,
        start:    "top top",
        end:      `+=${projects.length * 130}%`,
        pin:      true,
        scrub:    1.5,
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Giant background typography */}
      <span className="projects__bg-text" ref={bgTextRef} aria-hidden="true">
        MY PROJECTS
      </span>

      {/* Section label */}
      <div className="projects__label-wrap">
        <span className="projects__label">Selected Work</span>
      </div>

      {/* Pinned viewport — cards animate inside */}
      <div className="projects__pin" ref={pinRef}>
        <div className="projects__stage">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="projects__card-slot"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;