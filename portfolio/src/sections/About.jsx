import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

/* Bio paragraphs — real content */
const BIO_PARAS = [
  {
    text: "Hey, I'm Rudrakshya — an aspiring AI Engineer & Generative AI Developer who also loves crafting creative, interactive frontend experiences.",
    accent: false,
  },
  {
    text: "I enjoy building at the intersection of AI and the web — from intelligent applications powered by LLMs, RAG, Machine Learning, and APIs to visually engaging interfaces using React and JavaScript.",
    accent: false,
  },
  {
    text: "I've worked on projects ranging from AI-powered healthcare and RAG-based class performance analyzer platforms to RAG-based assistants and legal document intelligence systems, exploring how Generative AI can solve real-world problems.",
    accent: false,
  },
  {
    text: "But I don't just want my projects to work. I want them to look good, feel intuitive, and be memorable to use.",
    accent: false,
  },
  {
    text: "I'm constantly learning, experimenting, breaking things, fixing them, and turning \"Can I build this?\" into \"Okay... I will definitely build this.\"",
    accent: false,
  },
];

const TAGLINE = "Build. Break. Learn. Repeat.";

function About() {
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const textColRef  = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Image — clip-path reveal from top */
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Text paragraphs — staggered reveal */
      const paras = textColRef.current.querySelectorAll(".about__para, .about__tagline, .about__label");
      gsap.fromTo(
        paras,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__inner">
        {/* ── Left: bio text ────────────────── */}
        <div className="about__text-col" ref={textColRef}>
          <span className="about__label">About Me</span>

          {BIO_PARAS.map((para, i) => (
            <p key={i} className="about__para">
              {para.text}
            </p>
          ))}

          <p className="about__tagline">{TAGLINE}</p>
        </div>

        {/* ── Right: portrait ───────────────── */}
        <div className="about__img-col">
          <div className="about__img-wrap" ref={imgWrapRef}>
            <img
              src="/images/profile_main.jpeg"
              alt="Rudrakshya — AI Engineer and Creative Developer"
              className="about__img"
              loading="lazy"
            />
            <div className="about__img-overlay" aria-hidden="true" />
          </div>

          {/* Decorative badge */}
          <div className="about__badge" aria-hidden="true">
            <span className="about__badge-text">AI &amp; Creative</span>
            <span className="about__badge-sub">Developer</span>
          </div>
        </div>
      </div>

      {/* Section number */}
      <span className="about__deco-num" aria-hidden="true">03</span>
    </section>
  );
}

export default About;