import { type LucideIcon, Mail } from "lucide-react";
import {
  type IconType,
  SiPython,
  SiDiscord,
  SiJavascript,
  SiCplusplus,
  SiFigma,
  SiHackclub,
  SiNotion,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

export type InfoCard = {
  name: string;
  icon: IconType | LucideIcon;
  link: string;
};

export const techStacks: InfoCard[] = [
  {
    name: "Python",
    icon: SiPython,
    link: "https://www.python.org/",
  },
  {
    name: "Typescript",
    icon: SiTypescript,
    link: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    link: "https://www.typescriptlang.org",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    link: "https://www.postgresql.org/",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    link: "https://tailwindcss.com",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    link: "https://www.cpp.com",
  },
  {
    name: "Notion",
    icon: SiNotion,
    link: "https://www.notion.com",
  },
  {
    name: "Figma",
    icon: SiFigma,
    link: "https://www.figma.com",
  },
];

export const contacts: (InfoCard & {
  contact: string;
})[] = [
  {
    name: "email",
    contact: "alanwijayaok14@gmail.com",
    icon: Mail,
    link: "mailto:alanwijayaok14@gmail.com",
  },
  {
    name: "discord",
    contact: "@bubbleyur",
    icon: SiDiscord,
    link: "https://discord.com/users/632142872577048577",
  },
];
