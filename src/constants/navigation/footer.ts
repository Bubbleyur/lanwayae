import { SiDiscord, SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { AtSign } from "lucide-react";

export const socials = [
  {
    name: "Email",
    href: "mailto:alanwijayaok14@gmail.com",
    icon: AtSign,
  },
  {
    name: "GitHub",
    href: "https://github.com/bubbleyur",
    icon: SiGithub,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/632142872577048577",
    icon: SiDiscord,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/lan_wjy",
    icon: SiInstagram,
  },
];

export const pages = {
  personal: [
    { name: "about", href: "/about" },
    { name: "projects", href: "/projects" },
    { name: "guestbook", href: "/guestbook" },
  ],
  explore: [
    { name: "aquarium", href: "/aquarium" },
    { name: "home", href: "/" },
    { name: "blog", href: "/blog" },
  ],
  meta: [
    { name: "sitemap", href: "/sitemap.xml" },
    { name: "attribute", href: "/attribute" },
    { name: "repository", href: "https://github.com/Bubbleyur/lanwayae" },
  ],
};
