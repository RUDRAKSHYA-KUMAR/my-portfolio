import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/philosophy.css";

gsap.registerPlugin(ScrollTrigger);

/* Split a string into word spans for animation */
function splitWords(text) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="philosophy__word-wrap">
      <span className="philosophy__word">{word}</span>
      {i < text.split(" ").length - 1 ? "\u00A0" : ""}
    </span>
  ));
}

const LINE_1 = "I don't just build";
const LINE_2 = "things that work.";
const LINE_3 = "I build things";
const LINE_4 = "worth experiencing.";

function Philosophy() {
  const sectionRef = useRef(null);
  const taglineRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll(".philosophy__word");

      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Tagline reveal */
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" className="philosophy" ref={sectionRef}>
      <div className="philosophy__inner">
        {/* Decorative label */}
        <span className="philosophy__label">Philosophy</span>

        {/* Main statement */}
        <h2 className="philosophy__headline">
          <span className="philosophy__line philosophy__line--1">
            {splitWords(LINE_1)}
          </span>
          <span className="philosophy__line philosophy__line--2">
            {splitWords(LINE_2)}
          </span>
          <span className="philosophy__line philosophy__line--3">
            {splitWords(LINE_3)}
          </span>
          <span className="philosophy__line philosophy__line--4">
            {splitWords(LINE_4)}
          </span>
        </h2>

        {/* Supporting note */}
        <p className="philosophy__tagline" ref={taglineRef}>
          Engineering precision meets creative vision. Every pixel intentional,
          every interaction meaningful.
        </p>
      </div>

      {/* Decorative number */}
      <span className="philosophy__deco-num" aria-hidden="true">02</span>
    </section>
  );
}

export default Philosophy;