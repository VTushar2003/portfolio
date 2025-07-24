import MinimalistHero from "@/components/minimalist-hero";
import MinimalistAbout from "@/components/minimalist-about";
import MinimalistSkills from "@/components/minimalist-skills";
import MinimalistProjects from "@/components/minimalist-projects";
import MinimalistContact from "@/components/minimalist-contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main>
        <MinimalistHero />
        <div id="about">
          <MinimalistAbout />
        </div>
        <div id="skills">
          <MinimalistSkills />
        </div>
        <div id="projects">
          <MinimalistProjects />
        </div>
        <div id="contact">
          <MinimalistContact />
        </div>
      </main>
    </div>
  );
}
