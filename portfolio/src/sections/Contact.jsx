import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/contact.css";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub",    href: "#",  icon: "GH" },
  { label: "LinkedIn",  href: "#",  icon: "IN" },
  { label: "Instagram", href: "#",  icon: "IG" },
];

function Contact() {
  const sectionRef  = useRef(null);
  const contentRef  = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const children = contentRef.current.children;
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* 
      Replace this with a real backend call (FastAPI, Resend, Formspree, etc.)
      when ready. For now, just show a success message.
    */
    setSubmitted(true);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__inner" ref={contentRef}>
        {/* CTA headline */}
        <div className="contact__headline-wrap">
          <span className="contact__label">Let's Connect</span>
          <h2 className="contact__headline">
            Let's build<br />
            <span className="contact__headline-accent">something interesting.</span>
          </h2>
          <p className="contact__subtext">
            Whether it's an AI project, a creative frontend challenge,
            or just a conversation — I'm always open to hearing from you.
          </p>
        </div>

        {/* Social links */}
        <div className="contact__socials">
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="contact__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <span className="contact__social-icon">{icon}</span>
              <span className="contact__social-label">{label}</span>
              <span className="contact__social-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="contact__divider" aria-hidden="true" />

        {/* Message form */}
        <div className="contact__form-wrap">
          <h3 className="contact__form-title">Leave a message</h3>
          {submitted ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">✓</span>
              <p>Thanks for reaching out! I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              className="contact__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact__form-row">
                <div className="contact__field">
                  <label className="contact__field-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="contact__input"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__field-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="contact__input"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="contact__field">
                <label className="contact__field-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="What's on your mind?"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
              <button type="submit" className="contact__submit">
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* Footer row */}
        <div className="contact__footer">
          <p className="contact__copyright">
            © {new Date().getFullYear()} Rudrakshya. Built with care.
          </p>
          <a href="#home" className="contact__back-top" onClick={scrollToTop}>
            ↑ Back to top
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;