"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HiEye, HiCodeBracket, HiStar, HiArrowPathRoundedSquare, HiUsers } from "react-icons/hi2";

/* ============= Types ============= */

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface Commit {
  message: string;
  url: string;
  date: string;
  repo: string;
}

interface LanguageData {
  name: string;
  value: number;
  [key: string]: string | number;
}

/* ============= Component ============= */

export default function DashboardClient() {
  const USERNAME = "mehedi-hasan1102";
  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF",
    "#FF4560", "#FF9F40", "#8B5FBF", "#FF6B9D", "#4ECDC4",
  ];

  const [repos, setRepos] = useState<Repo[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [languagesData, setLanguagesData] = useState<LanguageData[]>([]);
  const [stats, setStats] = useState({ repos: 0, stars: 0, forks: 0, followers: 0 });
  const [totalVisitors, setTotalVisitors] = useState(0);

  /* ============= Effects ============= */

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ============= Helpers ============= */

  const fetchDashboardData = async () => {
    try {
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const headers: Record<string, string> = githubToken ? { Authorization: `Bearer ${githubToken}` } : {};

      // Fetch total visitors
      const visitorsRes = await fetch("/api/total-visitors");
      if (visitorsRes.ok) {
        const { totalVisitors } = await visitorsRes.json();
        setTotalVisitors(totalVisitors || 0);
      }

      // Fetch GitHub profile
      const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
      if (!profileRes.ok) {
        console.error("Profile fetch status:", profileRes.status, profileRes.statusText);
        throw new Error(`Profile fetch failed: ${profileRes.status}`);
      }
      const profile = await profileRes.json();

      // Fetch repositories
      const repoRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers });
      if (!repoRes.ok) {
        console.error("Repo fetch status:", repoRes.status, repoRes.statusText);
        throw new Error(`Repo fetch failed: ${repoRes.status}`);
      }
      const repoData: Repo[] = await repoRes.json();

      const totalStars = repoData.reduce((sum, r) => sum + r.stargazers_count, 0);
      const totalForks = repoData.reduce((sum, r) => sum + r.forks_count, 0);

      // Get latest repos and fetch their commits
      const latestRepos = repoData.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);
      
      const commitResults = await Promise.all(
        latestRepos.map(async (repo) => {
          const res = await fetch(`https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=1`, { headers });
          if (!res.ok) return null;
          const data = await res.json();
          if (!Array.isArray(data) || !data[0]) return null;
          const c = data[0];
          return {
            message: c.commit.message,
            url: c.html_url,
            date: c.commit.author.date,
            repo: repo.name,
          } as Commit;
        })
      );

      // Process languages
      const langMap: Record<string, number> = {};
      repoData.forEach((r) => {
        if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
      });

      setLanguagesData(Object.entries(langMap).map(([name, value]) => ({ name, value })));
      setStats({
        repos: profile.public_repos,
        stars: totalStars,
        forks: totalForks,
        followers: profile.followers,
      });
      setRepos(latestRepos);
      setCommits(commitResults.filter(Boolean) as Commit[]);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  /* ============= Render ============= */

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}m ago`;
    return date.toLocaleDateString();
  };

  return (
    <section className="font-geist text-base-content mx-auto pt-20 max-w-3xl">
      <div className="rounded-lg p-4 backdrop-blur-sm">
        {/* Header */}
        <div className="m-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Dashboard</h1>
          <p className="text-base mt-2 text-base-content/75">Overview of my website and GitHub metrics.</p>
        </div>

        <div className="h-px bg-(--border) mx-4 mb-10" />

        {/* SECTION 1: WEBSITE DATA */}
        <div className="m-4 mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content">Website Data</h2>
            <p className="text-sm text-base-content/60 mt-1">Website visitors and engagement metrics</p>
          </div>

          <div className="rounded-lg border border-(--border) bg-base-100/40 backdrop-blur-[2px] p-8 hover:border-(--border)/80 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/60 mb-3">Total Visitors</p>
                <p className="text-5xl font-bold text-base-content mb-2">{totalVisitors.toLocaleString()}</p>
                <p className="text-xs text-base-content/50">All-time website visitors</p>
              </div>
              <div className="text-5xl text-base-content/20"><HiEye /></div>
            </div>
          </div>
        </div>

        {/* SECTION 2: GITHUB DATA */}
        <div className="m-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content">GitHub Activity</h2>
            <p className="text-sm text-base-content/60 mt-1">Development metrics and contributions</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard label="Repositories" value={stats.repos} icon={<HiCodeBracket />} />
            <StatCard label="Stars" value={stats.stars} icon={<HiStar />} />
            <StatCard label="Forks" value={stats.forks} icon={<HiArrowPathRoundedSquare />} />
            <StatCard label="Followers" value={stats.followers} icon={<HiUsers />} />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Contributions & Commits Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contributions */}
              <div className="rounded-lg border border-(--border) bg-base-100/40 backdrop-blur-[2px] p-6 hover:border-(--border)/80 transition-colors">
                <h3 className="text-base font-semibold mb-4 text-base-content">Contributions</h3>
                <img
                  src={`https://ghchart.rshah.org/${USERNAME}`}
                  alt="GitHub Contributions"
                  className="w-full rounded-md"
                  loading="lazy"
                />
              </div>

              {/* Commit History */}
              {commits.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold mb-4 text-base-content">Commit History</h3>
                  <div className="space-y-3">
                    {commits.slice(0, 3).map((commit, idx) => (
                      <a
                        key={idx}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-lg border border-(--border) bg-base-100/40 backdrop-blur-[2px] p-4 hover:border-(--border)/80 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary">
                              {commit.repo}
                            </span>
                          </div>
                          <p className="text-sm text-base-content line-clamp-1 group-hover:text-primary transition-colors">
                            {commit.message.split("\n")[0]}
                          </p>
                          <p className="text-xs text-base-content/50 mt-1">{formatDate(commit.date)}</p>
                        </div>
                        <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">↗</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}
            {languagesData.length > 0 && (
              <div className="h-full">
                <div className="h-full flex flex-col rounded-lg border border-(--border) bg-base-100/40 backdrop-blur-[2px] p-6 hover:border-(--border)/80 transition-colors">
                  <h3 className="text-base font-semibold mb-4 text-base-content">Languages</h3>
                  <div className="flex-1 min-h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={languagesData} dataKey="value" nameKey="name" outerRadius={65} label={false}>
                          {languagesData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {languagesData.slice(0, 4).map((lang, i) => (
                      <span key={lang.name} className="px-2 py-1 rounded-md text-xs font-medium text-white" style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= Sub Components ============= */

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-(--border) bg-base-100/40 backdrop-blur-[2px] p-4 hover:border-(--border)/80 transition-colors">
      <p className="text-sm font-medium text-base-content/60 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-base-content">{value}</p>
        <div className="text-2xl text-base-content/30">{icon}</div>
      </div>
    </div>
  );
}
