import { Hero } from "@/sections/hero";
import { TechnologyStrip } from "@/sections/technology-strip";
import { About } from "@/sections/about";
import { Services } from "@/sections/services";
import { HealthcareSupport } from "@/sections/healthcare-support";
import { Projects } from "@/sections/projects";
import { Testimonials } from "@/sections/testimonials";
import { Process } from "@/sections/process";
import { Team } from "@/sections/team";
import { Contact } from "@/sections/contact";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL, BUSINESS_EMAIL } from "@/lib/site";

export const metadata = pageMetadata(
  "Hurkify Technology Limited | IT Consulting & Healthcare Technology",
  "Hurkify Technology Limited delivers IT consulting, software development, and healthcare compliance support — including HEFAMAA registration and EMR systems — for businesses across Nigeria.",
  "/",
);

export default function Home() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Hurkify Technology Limited",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/hurkify-icon.png`,
          email: BUSINESS_EMAIL,
          telephone: "+2349045083581",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
        }}
      />
      <Hero />
      <TechnologyStrip />
      <Services />
      <HealthcareSupport />
      <Projects />
      <Process />
      <About />
      <Testimonials />
      <Team />
      <Contact />
    </>
  );
}
