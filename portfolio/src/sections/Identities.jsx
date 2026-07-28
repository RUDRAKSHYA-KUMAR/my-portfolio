import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/identities.css";

gsap.registerPlugin(ScrollTrigger);

const IDENTITIES = [
  {
    num:   "01",
    title: "AI Engineer",
    desc:  "I architect intelligent systems — RAG pipelines, LLM integrations, and conversational agents that solve real-world problems with precision and clarity.",
    accent: "#E4A390",
  },
  {
    num:   "02",
    title: "Creative Developer",
    desc:  "I build frontend experiences that don't just work — they move, breathe, and feel intentional. Scroll-driven animations, cinematic interfaces, and premium design.",
    accent: "#D49C68",
  },
  {
    num:   "03",
    title: "ML Engineer",
    desc:  "I explore the science of making machines learn — from data preparation and model training to evaluation, deployment, and continuous improvement.",
    accent: "#8A4F55",
  },
];

function Identities() {
  const sectionRef   = useRef(null);
  const pinRef       = useRef(null);
  const cardsRef     = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        /* Just show all cards statically */
        gsap.set(cardsRef.current, { opacity: 1, y: 0 });
        return;
      }

      const cards = cardsRef.current;
      const count = cards.length;

      /* Initial state: only first card visible */
      gsap.set(cards, { opacity: 0, y: 60 });
      gsap.set(cards[0], { opacity: 1, y: 0 });

      /* Master timeline — scrubbed by ScrollTrigger */
      const tl = gsap.timeline();

      for (let i = 0; i < count - 1; i++) {
        /* Exit current card upward */
        tl.to(cards[i], {
          y: -80,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        });
        /* Enter next card from below */
        tl.fromTo(
          cards[i + 1],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
      }

      ScrollTrigger.create({
        trigger:  pinRef.current,
        start:    "top top",
        end:      `+=${(count - 1) * 100}%`,
        pin:      true,
        scrub:    1,
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="identities" className="identities" ref={sectionRef}>
      {/* Background decorative text */}
      <span className="identities__bg-text" aria-hidden="true">IDENTITY</span>

      <div className="identities__pin" ref={pinRef}>
        <div className="identities__inner">
          {/* Left: label + counter */}
          <div className="identities__sidebar">
            <span className="identities__label">Who I Am</span>
            <div className="identities__progress">
              {IDENTITIES.map((id, i) => (
                <span
                  key={i}
                  className="identities__progress-dot"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Right: identity cards stack */}
          <div className="identities__cards">
            {IDENTITIES.map((identity, i) => (
              <div
                key={i}
                className="identities__card"
                ref={(el) => (cardsRef.current[i] = el)}
                style={{ "--identity-accent": identity.accent }}
              >
                <span className="identities__num">{identity.num}</span>
                <h2 className="identities__title">{identity.title}</h2>
                <p  className="identities__desc">{identity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Identities;