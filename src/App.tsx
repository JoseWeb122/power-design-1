import { About } from "@/components/About";
import { ConsultingMethods } from "@/components/ConsultingMethods";
import { ContactSection } from "@/components/ContactSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Intro } from "@/components/Intro";
import { ProblemSelector } from "@/components/ProblemSelector";
import { Process } from "@/components/Process";
import { Resources } from "@/components/Resources";
import { Services } from "@/components/Services";
import { ValueProps } from "@/components/ValueProps";
import { InquiryProvider } from "@/lib/inquiry";

export default function App() {
  return (
    <InquiryProvider>
      <div className="min-h-screen bg-white antialiased">
        <Header />
        <main id="main">
          <Hero />
          <Intro />
          <Services />
          <ProblemSelector />
          <Process />
          <ConsultingMethods />
          <Industries />
          <Resources />
          <About />
          <ValueProps />
          <FAQ />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </InquiryProvider>
  );
}
