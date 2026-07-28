import { useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CONFIG
   ============================================================ */
const FRAME_COUNT = 79;
const FRAME_BASE = "/hero-frames/ezgif-frame-";
const frameUrl = (n) => `${FRAME_BASE}${String(n).padStart(3, "0")}.jpg`;

const TITLE_TEXT = "AI DEVELOPER";
const NAME_TEXT = "RUDRAKSHYA ";
const INTRO_TEXT =
  "I build intelligent systems and immersive interfaces — where LLMs meet beautiful frontend experiences.";

const HOVER_RADIUS = 150; // px, desktop cursor reveal radius

function Hero() {
  /* ── refs ─────────────────────────────────── */
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  const imagesRef = useRef([]);
  const stateRef = useRef({ frame: 0 });

  const headingWrapRef = useRef(null);
  const titleCharRefs = useRef([]);
  const nameLayerRef = useRef(null);
  const introGroupRef = useRef(null);
  const introWordRefs = useRef([]);
  const scrollBadgeRef = useRef(null);

  const pointerRef = useRef({ x: 0, y: 0, r: 0 });
  const revealScaleRef = useRef({ value: 1 });

  titleCharRefs.current = [];
  introWordRefs.current = [];

  /* ── preload frames ───────────────────────── */
  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const checkFirst = setInterval(() => {
      if (imgs[0].complete && imgs[0].naturalWidth) {
        clearInterval(checkFirst);
        resizeCanvas();
      }
    }, 50);

    return () => clearInterval(checkFirst);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── draw a single frame, cover-fit, no distortion ───────── */
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

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

  /* ── full-viewport canvas sizing (DPR aware) ─────────────── */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    drawFrame(stateRef.current.frame);
  };

  /* ── scroll master timeline + resize + reveal interaction ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;
    const isMobileWidth = window.innerWidth < 768;

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      resizeCanvas();

      /* entrance */
      if (!prefersReduced) {
        gsap.fromTo(
          headingWrapRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
        gsap.fromTo(
          introGroupRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.7 }
        );
        gsap.fromTo(
          scrollBadgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
        );
      } else {
        gsap.set(
          [headingWrapRef.current, introGroupRef.current, scrollBadgeRef.current],
          { opacity: 1, y: 0 }
        );
      }

      /* ── reduced motion: static hero, no pin, no scrub ──── */
      if (prefersReduced) {
        drawFrame(0);
        return;
      }

      /* ── cursor / touch name-reveal interaction ─────────── */
      const wrap = headingWrapRef.current;

      const setVars = () => {
        wrap.style.setProperty("--mx", `${pointerRef.current.x}px`);
        wrap.style.setProperty("--my", `${pointerRef.current.y}px`);
        wrap.style.setProperty("--r", `${pointerRef.current.r}px`);
      };

      if (!isTouch) {
        const onMove = (e) => {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(pointerRef.current, {
            x,
            y,
            r: HOVER_RADIUS,
            duration: 0.35,
            ease: "power3.out",
            onUpdate: setVars,
          });
        };
        const onLeave = () => {
          gsap.to(pointerRef.current, {
            r: 0,
            duration: 0.5,
            ease: "power3.out",
            onUpdate: setVars,
          });
        };
        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);

        
      } else {
        /* mobile fallback: one automatic reveal sweep on load */
        const rect = () => wrap.getBoundingClientRect();
        const sweep = gsap.timeline({ delay: 1.4 });
        sweep
          .to(pointerRef.current, {
            x: () => rect().width * 0.28,
            y: () => rect().height * 0.5,
            r: HOVER_RADIUS,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: setVars,
          })
          .to(pointerRef.current, {
            x: () => rect().width * 0.72,
            duration: 0.9,
            ease: "power1.inOut",
            onUpdate: setVars,
          })
          .to(pointerRef.current, {
            r: 0,
            duration: 0.5,
            ease: "power2.in",
            onUpdate: setVars,
          });
      }

      /* ── coordinated master scroll timeline ─────────────── */
      const frameProxy = { frame: 0 };
      const TOTAL = 6; // arbitrary relative duration; only ratios matter

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobileWidth ? "+=100%" : "+=150%",
          pin: true,
          scrub: 0.5,
        },
        defaults: { ease: "none" },
      });

      // 1. frame sequence, driven by scroll across the whole pin
      master.to(
        frameProxy,
        {
          frame: FRAME_COUNT - 1,
          duration: TOTAL,
          onUpdate: () => {
            const idx = Math.round(frameProxy.frame);
            if (idx !== stateRef.current.frame) {
              stateRef.current.frame = idx;
              drawFrame(idx);
            }
          },
        },
        0
      );

      // 2. intro (eyebrow / words / actions / badge) clears first
      master.to(
        introWordRefs.current,
        { opacity: 0, stagger: 0.05, duration: 0.8 },
        2.0
      );
      master.to(
        scrollBadgeRef.current,
        { opacity: 0, duration: 0.5 },
        2.0
      );

      // 3. AI DEVELOPER clears character by character; reveal layer
      //    collapses in step so the cursor interaction fades with it
      master.to(
        titleCharRefs.current,
        { opacity: 0, stagger: 0.03, duration: 1.6 },
        3.0
      );
      master.to(
        revealScaleRef.current,
        {
          value: 0,
          duration: 1.6,
          onUpdate: () =>
            wrap.style.setProperty(
              "--reveal-scale",
              revealScaleRef.current.value
            ),
        },
        3.0
      );

      // remaining ~1.2 units (of 6) is clean frame, no Hero typography
    }, sectionRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── render helpers ───────────────────────── */
  const titleChars = TITLE_TEXT.split("");
  const introWords = INTRO_TEXT.split(" ");

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* full-bleed frame-sequence background */}
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        aria-hidden="true"
      />

      {/* directional readability overlay, strongest behind text */}
      <div className="hero__overlay" ref={overlayRef} aria-hidden="true" />

      {/* hero content, layered above canvas */}
      <div className="hero__content">
        <h1
          className="hero__heading-wrap"
          ref={headingWrapRef}
          role="heading"
          aria-level="1"
          aria-label={`${TITLE_TEXT} — ${NAME_TEXT}`}
        >
          <span className="hero__title" aria-hidden="true">
            {titleChars.map((c, i) => (
              <span
                key={i}
                className="hero__char"
                ref={(el) => (titleCharRefs.current[i] = el)}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span
            className="hero__name-hidden"
            ref={nameLayerRef}
            aria-hidden="true"
          >
            {NAME_TEXT}
          </span>
        </h1>

        <div className="hero__intro-group" ref={introGroupRef}>
          <p className="hero__eyebrow">Available for opportunities</p>

          <p className="hero__desc">
            {introWords.map((w, i) => (
              <Fragment key={i}>
                <span
                  className="hero__word"
                  ref={(el) => (introWordRefs.current[i] = el)}
                >
                  {w}
                </span>
                {i < introWords.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="hero__btn hero__btn--primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </a>
            <a
              href="#about"
              className="hero__btn hero__btn--ghost"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About Me
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll-badge" ref={scrollBadgeRef} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}

export default Hero;
