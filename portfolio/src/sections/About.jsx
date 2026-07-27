import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const titleRef = useRef(null);

  useEffect(() => {
    const animation = gsap.fromTo(
      titleRef.current,
      {
        x: -200,
      },
      {
        x: 200,

        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          markers: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <section id="about">
      <h1 ref={titleRef}>About Me</h1>
    </section>
  );
}

export default About;