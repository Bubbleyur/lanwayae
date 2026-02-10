import type { Badge } from "@/components/ui/badge";
import { Home, Video } from "lucide-react";
import type { ComponentProps } from "react";

export type Hackathon = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  links?: Array<{
    title: string;
    href: string;
    icon: React.ReactNode;
    variant?: ComponentProps<typeof Badge>["variant"];
  }>;
  flags?: Array<string>;
};
export const hackathons: Array<Hackathon> = [
  {
    title: "Schematics - NLC 2023",
    dates: "August, 2023",
    location: "Surabaya, Indonesia",
    description:
      "Schematics National Logic Competition (NLC) 2023 is a national-level logic competition organized as part of Schematics ITS by the Department of Informatics, Institut Teknologi Sepuluh Nopember (ITS). The competition focuses on testing participants’ logical reasoning, analytical thinking, and problem-solving skills through a series of structured challenges.",
    flags: ["committee"],
    image: "/static/images/hackathons/daydream-jakarta.png",
    links: [
      {
        title: "Landing Page",
        href: "https://www.schematics-its.com/",
        icon: <Home />,
      },
    ],
  },
  {
    title: "Garuda Hacks 6.0",
    dates: "July, 2025",
    location: "Tangerang, Indonesia",
    description:
      "Southeast Asia's largest hackathon, empowering young Indonesians with the skills and motivation to solve the country's most urgent issues over an intense 30-hour coding marathon.",
    image: "/static/images/hackathons/garudahacks-6.0.png",
    links: [
      {
        title: "Landing Page",
        href: "https://garudahacks.com/",
        icon: <Home />,
      },
    ],
  },
];
