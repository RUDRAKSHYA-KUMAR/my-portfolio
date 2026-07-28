import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 79;
const FRAME_BASE  = "/hero-frames/ezgif-frame-";

/* Zero-pad to 3 digits */
const frameUrl = (n) =>
  `${FRAME_BASE}${String(n).padStart(3, "0")}.jpg`;

function Hero() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const imagesRef  = useRef([]);
  const stateRef   = useRef({ frame: 0, loaded: 0 });
  const textRef    = useRef(null);
  const subtitleRef = useRef(null);
  const scrollBadgeRef = useRef(null);

  /* ── Preload frames ──────────────────────── */
  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => { stateRef.current.loaded++; };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    /* draw first frame once it loads */
    const checkFirst = setInterval(() => {
      if (imgs[0].complete) {
        clearInterval(checkFirst);
        drawFrame(0);
      }
    }, 50);

    return () => clearInterval(checkFirst);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Draw frame to canvas ────────────────── */
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;
    const ctx = canvas.getContext("2d");

    /* Keep canvas native resolution */
    const cw = canvas.width;
    const ch = canvas.height;

    /* Scale and center-crop the image to fill the canvas */
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canAspect = cw / ch;

    let drawW, drawH, drawX, drawY;
    if (imgAspect > canAspect) {
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgAspect;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  /* ── ScrollTrigger pin + frame scrub ─────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      /* Entry animation for text */
      if (!prefersReduced) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.7 }
        );
        gsap.fromTo(
          scrollBadgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
        );
      }

      if (prefersReduced) {
        /* Static — just show first frame */
        drawFrame(0);
        return;
      }

      /* Proxy object for GSAP to scrub */
      const proxy = { frame: 0 };

      ScrollTrigger.create({
        trigger:  sectionRef.current,
        start:    "top top",
        end:      isMobile ? "+=80%" : "+=120%",
        pin:      true,
        scrub:    0.5,
        onUpdate: (self) => {
          const frameIndex = Math.round(self.progress * (FRAME_COUNT - 1));
          if (frameIndex !== stateRef.current.frame) {
            stateRef.current.frame = frameIndex;
            drawFrame(frameIndex);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* ── Left: text content ────────────── */}
      <div className="hero__text" ref={textRef}>
        <p className="hero__eyebrow">Available for opportunities</p>
        <h1 className="hero__title">
          <span className="hero__title-line">AI</span>
          <span className="hero__title-line hero__title-line--accent">Developer.</span>
        </h1>
        <p className="hero__desc" ref={subtitleRef}>
          I build intelligent systems and immersive interfaces
          — where LLMs meet beautiful frontend experiences.
        </p>
        <div className="hero__actions" ref={subtitleRef}>
          <a href="#projects" className="hero__btn hero__btn--primary"
            onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            View Work
          </a>
          <a href="#about" className="hero__btn hero__btn--ghost"
            onClick={e => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}>
            About Me
          </a>
        </div>
      </div>

      {/* ── Right: canvas frame sequence ────── */}
      <div className="hero__canvas-wrap">
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          width={960}
          height={720}
          aria-label="Animated avatar of Rudrakshya"
          role="img"
        />
        {/* subtle vignette overlay */}
        <div className="hero__canvas-vignette" aria-hidden="true" />
      </div>

      {/* ── Scroll indicator ─────────────────── */}
      <div className="hero__scroll-badge" ref={scrollBadgeRef} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>

      {/* ── Background decorative elements ──── */}
      <div className="hero__bg-orb hero__bg-orb--1" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--2" aria-hidden="true" />
    </section>
  );
}

export default Hero;