export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  created_at: string;
}

export interface ProjectCard {
  id: number;
  name: string;
  category: string;
  description: string;
  githubUrl: string;
  liveUrl: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  cardStyle: 'code' | 'dashboard';
}

const EXCLUDED_REPOS = ["ryx", "lp", "sowmiya-portfolio"];

/**
 * Curated metadata for each repo — overrides raw GitHub description and language tag.
 * Key is the lowercase repo name exactly as it appears on GitHub.
 */
const PROJECTS_META: Record<string, { category: string; description: string; liveUrl?: string; cardStyle?: 'code' | 'dashboard' }> = {
  "valoryx": {
    category: "Billing SaaS",
    description:
      "Valoryx is an offline-first billing and inventory platform built for Indian retailers. It supports GST invoicing, multi-branch stock management, thermal receipt printing, and Razorpay payment integration — packaged as an Electron desktop app with automatic cloud sync.",
    liveUrl: "https://mj-billing.vercel.app",
    cardStyle: 'dashboard',
  },
  "bigteam": {
    category: "Community Platform",
    description:
      "BigTeam is a full-stack team engagement platform with commission tracking, content feeds, Zoom meeting scheduling, ad management, and a real-time admin dashboard. Built with React, Flask, PostgreSQL, and Supabase.",
    liveUrl: "https://bigtreat.in",
    cardStyle: 'dashboard',
  },
  "chendur": {
    category: "Tax Consultancy Website",
    description:
      "A lead generation website for Chendur & Co, a tax consulting firm. Features WhatsApp-integrated contact forms, animated UI sections, local business SEO, and multi-contact quick actions for desktop and mobile.",
    cardStyle: 'code',
  },
  "boutique": {
    category: "Fashion Landing Page",
    description:
      "A luxury fashion showcase website with a curated product catalog, upcoming event listings, customer testimonials, and brand storytelling. Designed mobile-first with a premium aesthetic and smooth scroll animations.",
    cardStyle: 'code',
  },
};

function isExcluded(repoName: string): boolean {
  return EXCLUDED_REPOS.includes(repoName.toLowerCase());
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchOrgProjects(user: string): Promise<ProjectCard[]> {
  const url = `https://api.github.com/users/${user}/repos?per_page=100&sort=updated&type=public`;

  const res = await fetch(url, {
    headers: buildHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`GitHub API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const repos: GitHubRepo[] = await res.json();
  const filtered = repos.filter((r) => !r.fork && !r.archived && !isExcluded(r.name));

  return filtered.map((r) => {
    const meta = PROJECTS_META[r.name.toLowerCase()];
    const displayName = r.name
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id: r.id,
      name: displayName,
      category: meta?.category ?? "Project",
      description: meta?.description ?? r.description ?? "A project built by RYX Tech.",
      githubUrl: r.html_url,
      liveUrl: meta?.liveUrl ?? r.homepage ?? null,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      forks: r.forks_count,
      updatedAt: r.updated_at,
      cardStyle: meta?.cardStyle ?? 'code',
    };
  });
}
