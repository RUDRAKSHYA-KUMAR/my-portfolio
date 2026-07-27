import Navbar from "./components/Navbar";
import useLenis from "./hooks/useLenis";
import Hero from "./sections/Hero";
import Philosophy from "./sections/Philosophy";
import About from "./sections/About";
import WhoAmI from "./sections/WhoAmI";
import Identities from "./sections/Identities";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import Contact from "./sections/Contact";

function App() {
    useLenis();
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Philosophy />
        <About />
        <WhoAmI />
        <Identities />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}

export default App;