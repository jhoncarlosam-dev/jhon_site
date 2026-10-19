import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-sand">
      <Sidebar />
      <main className="pt-16 lg:pl-72 lg:pt-0">
        <About />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
