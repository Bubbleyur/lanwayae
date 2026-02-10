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
    image: "/static/images/hackathons/schematics-nlc.png",
    links: [
      {
        title: "Landing Page",
        href: "https://www.schematics-its.com/",
        icon: <Home />,
      },
    ],
  },
  {
    title: "CTF Ara",
    dates: "Jan-Feb, 2024",
    location: "Surabaya, Indonesia",
    description:
      "CTF Ara is a Capture The Flag competition organized by HMIT-ITS. The competition challenges participants to solve a series of cybersecurity challenges, testing their skills in areas such as web exploitation, reverse engineering, and forensics.",
    image: "/static/images/hackathons/ctf-ara.png",
    links: [
      {
        title: "Landing Page",
        href: "https://hmit-its.com/",
        icon: <Home />,
      },
    ],
  },
];
