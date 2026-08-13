import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";
import { HealthcareSupport } from "@/sections/healthcare-support";
import { Industries } from "@/sections/industries";
import { Projects } from "@/sections/projects";
import { Testimonials } from "@/sections/testimonials";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <HealthcareSupport />
      <Industries />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}
