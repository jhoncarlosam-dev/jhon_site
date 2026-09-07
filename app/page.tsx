import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/sections/About";
import { Awards } from "@/components/sections/Awards";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Interests } from "@/components/sections/Interests";
import { Languages } from "@/components/sections/Languages";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-sand">
      <Sidebar />
      <main className="pt-16 lg:pl-72 lg:pt-0">
        <About />
        <Experience />
        <Education />
        <Skills />
        <Languages />
        <Services />
        <Interests />
        <Awards />
      </main>
    </div>
  );
}
