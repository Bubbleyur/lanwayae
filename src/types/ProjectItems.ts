import { ReactElement } from "react";

export interface ProjectItem {
  title: string;
  description: string;
  imageId: string; // GitHub tidak kasi gambar, nanti kita akali
  badge: ReactElement[];
  link?: string;
  repo: string;
  unmaintained?: boolean;
}
