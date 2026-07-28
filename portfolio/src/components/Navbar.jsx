import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/navbar.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#projects" },
  { label: "Stack",   href: "#stack" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const navRef    = useRef(null);
  const [active, setActive]     = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* ── Compact on scroll ────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -80px",
        onEnter:      () => setScrolled(true),
        onLeaveBack:  () => setScrolled(false),
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Active section via IntersectionObserver ─ */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Smooth anchor scroll ─────────────────── */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
      role="navigation"
      aria-label="Primary navigation"
    >
      {/* Logo mark */}
      <a href="#home" className="navbar__logo" aria-label="Back to top">
        <span className="navbar__logo-mark">RK</span>
      </a>

      {/* Nav links */}
      <ul className="navbar__links" role="list">
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <li key={href}>
              <a
                href={href}
                className={`navbar__link${isActive ? " navbar__link--active" : ""}`}
                onClick={(e) => handleNavClick(e, href)}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
                {isActive && <span className="navbar__link-dot" aria-hidden="true" />}
              </a>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="navbar__cta"
        onClick={(e) => handleNavClick(e, "#contact")}
      >
        Let's Talk
      </a>
    </nav>
  );
}

export default Navbar;