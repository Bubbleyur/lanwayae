import { LanguagesTools } from "@/components/portfolio/languages-tools";
import * as icon from "@icons-pack/react-simple-icons";
import { CustomIcons } from "@/components/icons"; // Pastikan path ini benar
import { 
  Box, 
  Database, 
  Terminal, 
  Cpu, 
  Palette, 
  Globe, 
  Server,
  Layers
} from "lucide-react";

export interface ToolItem {
  name: string;
  Icon: React.ComponentType<{ className?: string; size?: number | string }>;
  hex: string;
  classNames?: {
    icon?: string;
    container?: string;
  };
}

// --- 1. DEFINISI TOOLS PER KATEGORI ---

export const feTools: ToolItem[] = [
  { name: "React", Icon: icon.SiReact, hex: icon.SiReactHex },
  { name: "Basics", Icon: icon.SiHtml5, hex: icon.SiHtml5Hex },
  { name: "Tailwind", Icon: icon.SiTailwindcss, hex: icon.SiTailwindcssHex },
  { name: "TypeScript", Icon: icon.SiTypescript, hex: icon.SiTypescriptHex },
];

export const beTools: ToolItem[] = [
  { name: "Node.js", Icon: icon.SiNodedotjs, hex: icon.SiNodedotjsHex },
  { name: "Python", Icon: icon.SiPython, hex: icon.SiPythonHex },
  { name: "JavaScript", Icon: icon.SiJavascript, hex: icon.SiJavascriptHex },
];

export const sqlTools: ToolItem[] = [
  { name: "PostgreSQL", Icon: icon.SiPostgresql, hex: icon.SiPostgresqlHex },
  { name: "MongoDB", Icon: icon.SiMongodb, hex: icon.SiMongodbHex },
  { name: "SQLite", Icon: icon.SiSqlite, hex: icon.SiSqliteHex },
  { name: "NeonDB", Icon: icon.SiVercel, hex: icon.SiVercelHex },
  { name: "Supabase", Icon: icon.SiSupabase, hex: icon.SiSupabaseHex },
];

export const creativeDevTools: ToolItem[] = [
  { name: "Three.js", Icon: icon.SiThreedotjs, hex: icon.SiThreedotjsHex },
  { name: "GSAP", Icon: icon.SiGsap, hex: icon.SiGsapHex },
];

export const devopsTools: ToolItem[] = [
  { name: "Docker", Icon: icon.SiDocker, hex: icon.SiDockerHex },
  { name: "Git", Icon: icon.SiGit, hex: icon.SiGitHex },
  { name: "Vercel", Icon: icon.SiVercel, hex: icon.SiVercelHex, classNames: { icon: "group-hover:invert dark:group-hover:invert-0" } },
  { name: "Linux", Icon: icon.SiLinux, hex: icon.SiLinuxHex },
];

export const aiTools: ToolItem[] = [
  { name: "Python", Icon: icon.SiPython, hex: icon.SiPythonHex },
  { name: "OpenAI API", Icon: icon.SiOpenai, hex: icon.SiOpenaiHex, classNames: { icon: "group-hover:invert dark:group-hover:invert-0" } },
  { name: "Gemini", Icon: icon.SiGooglegemini, hex: icon.SiGooglegeminiHex },
];

export const designTools: ToolItem[] = [
  { name: "Figma", Icon: icon.SiFigma, hex: icon.SiFigmaHex },
  { name: "Canva", Icon: icon.SiCanva, hex: icon.SiCanvaHex },
];

// Kategori Khusus C++, Java, Lua
export const systemTools: ToolItem[] = [
  { name: "C++", Icon: icon.SiCplusplus, hex: icon.SiCplusplusHex },
  { name: "Lua", Icon: icon.SiLua, hex: icon.SiLuaHex },

];

// --- 2. KONTEN & GRID LAYOUT ---

export const skillsContent: Record<
  string,
  {
    title: string;
    subtitle: string;
    element: React.ReactNode;
    gridClass: string; // Mengatur ukuran kotak di grid
  }
> = {
  frontend: {
    title: "FRONTEND",
    subtitle: "UI & INTERACTION",
    // Kotak Besar (2x2)
    gridClass: "col-span-1 md:row-span-2", 
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Crafting responsive and interactive user interfaces using modern component-based architecture.
        </p>
        <LanguagesTools items={feTools} variant="default" className="justify-start" />
      </div>
    ),
  },
  
  backend: {
    title: "BACKEND",
    subtitle: "SERVER & API",
    // Persegi Panjang Tinggi (1x2) - Sebelah Frontend
    gridClass: "col-span-1 md:row-span-2",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Building scalable server-side applications and high-performance APIs.
        </p>
        <LanguagesTools items={beTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  sql: {
    title: "SQL / ORM",
    subtitle: "DATA ARCHITECTURE",
    // Kotak Kecil (1x1)
    gridClass: "col-span-1 md:row-span-2",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Designing efficient database schemas and managing data flow securely.
        </p>
        <LanguagesTools items={sqlTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  three: {
    title: "CREATIVE",
    subtitle: "CREATIVE DEVELOPMENT",
    // Kotak Kecil (1x1)
    gridClass: "col-span-1",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          building interactive visuals and motion on the web
          using animation and 3d as part of the experience
        </p>
        <LanguagesTools items={creativeDevTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  devops: {
    title: "DEVOPS",
    subtitle: "CI/CD & CLOUD",
    // Kotak Kecil (1x1)
    gridClass: "col-span-1 md:col-span-2",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Automating deployment pipelines and managing containerized environments.
        </p>
        <LanguagesTools items={devopsTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  ai: {
    title: "AI / LLM",
    subtitle: "INTELLIGENT SYSTEMS",
    // Persegi Panjang Lebar (2x1)
    gridClass: "col-span-1 md:col-span-2",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Integrating Large Language Models and building AI-driven functionalities.
        </p>
        <LanguagesTools items={aiTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  systems: {
    title: "GAME & SYS",
    subtitle: "NATIVE & SCRIPTING",
    // Kotak Kecil (1x1) - Tempat C++, Java, Lua
    gridClass: "col-span-1",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          High-performance logic, game mechanics, and system-level programming.
        </p>
        <LanguagesTools items={systemTools} variant="default" className="justify-start" />
      </div>
    ),
  },

  design: {
    title: "DESIGN",
    subtitle: "VISUAL CRAFT",
    // Persegi Panjang Lebar Penuh (3x1) atau Kotak Biasa
    gridClass: "col-span-1 md:col-span-3",
    element: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Designing aesthetic interfaces and creative assets for digital products.
        </p>
        <LanguagesTools items={designTools} variant="default" className="justify-start" />
      </div>
    ),
  },
};