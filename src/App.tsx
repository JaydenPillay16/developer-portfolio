import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Technologies from "./sections/Technologies";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="min-h-screen bg-[#080b20] text-white">
      <Navbar />
      <BackToTop />

      <main>
        <Hero />
        <About />
        <Experience />
        <Technologies />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
