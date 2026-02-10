import { Badge } from "@/components/ui/badge";
import { ProjectItem } from "@/types/ProjectItems";

export async function getProjectsData(): Promise<ProjectItem[]> {
  const username = "Bubbleyur"; 
  const branch = "master";
  const imageFileName = "banner.png";
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) return []; 

  const repos = await res.json();

  return repos
    .map((repo: any) => ({
      title: repo.name,
      description: repo.description || "No description provided.",
      imageId: `https://wsrv.nl/?url=${encodeURIComponent(`https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/${imageFileName}`)}&default=${encodeURIComponent(`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564`)}`,
      badge: repo.topics.map((topic: string) => (
        <Badge key={topic} className="capitalize">{topic}</Badge>
      )),
      link: repo.homepage || repo.html_url,
      repo: repo.html_url,
      unmaintained: repo.archived,
    }));
}