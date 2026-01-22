'use client';

import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- Types ---------------- */

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

/* ---------------- Component ---------------- */

export default function DashboardPage() {
  const USERNAME = "mehedi-hasan1102";

  const [repos, setRepos] = useState<Repo[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [languagesData, setLanguagesData] = useState<LanguageData[]>([]);
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
  });

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        /* -------- Profile -------- */
        const profileRes = await fetch(
          `https://api.github.com/users/${USERNAME}`
        );
        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profile = await profileRes.json();

        /* -------- Repos -------- */
        const repoRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100`
        );
        if (!repoRes.ok) throw new Error("Repo fetch failed");
        const repoData: Repo[] = await repoRes.json();

        const totalStars = repoData.reduce((a, r) => a + r.stargazers_count, 0);
        const totalForks = repoData.reduce((a, r) => a + r.forks_count, 0);

        /* -------- Latest Repos -------- */
        const latestRepos = [...repoData]
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .slice(0, 5);

        /* -------- Commits -------- */
        const commitResults = await Promise.all(
          latestRepos.map(async (repo) => {
            const res = await fetch(
              `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=1`
            );
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

        /* -------- Languages -------- */
        const langMap: Record<string, number> = {};
        repoData.forEach((r) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
          }
        });

        setLanguagesData(
          Object.entries(langMap).map(([name, value]) => ({
            name,
            value,
          }))
        );

        setStats({
          repos: profile.public_repos,
          stars: totalStars,
          forks: totalForks,
          followers: profile.followers,
        });

        setRepos(latestRepos);
        setCommits(commitResults.filter(Boolean) as Commit[]);
      } catch (error) {
        console.error("GitHub dashboard error:", error);
      }
    }

    fetchGitHubData();
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
    "#FF9F40",
  ];

  return (
    <section className="text-base-content font-geist max-w-3xl mx-auto pt-20">
      <div className="min-h-screen rounded-lg p-4 backdrop-blur-sm transition-shadow">

        {/* Header */}
     <div className="m-4">
  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
    Dashboard
  </h1>

  <p className="text-base mt-2 mb-0 text-base-content/75">
    Explore my GitHub projects, contributions, and open-source work. This dashboard
    highlights my recent repositories, activity, and ongoing experiments.
    Feel free to star, fork, or connect with me on{" "}
    <a
      href="https://github.com/mehedi-hasan1102"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary underline underline-offset-6 transition-colors"
    >
      GitHub
    </a>
    .
  </p>
</div>


        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-12 mx-4">
          {[
            { label: "Repositories", value: stats.repos },
            { label: "Stars", value: stats.stars },
            { label: "Forks", value: stats.forks },
            { label: "Followers", value: stats.followers },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-primary/30 p-4 text-center"
            >
              <p className="text-sm text-base-content/60 mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contribution Graph */}
        <section className="mb-10">
          <h3 className="text-xl mb-4">Contribution Activity</h3>
          <img
            src={`https://ghchart.rshah.org/${USERNAME}`}
            alt="GitHub Contributions"
            className="w-full rounded-lg"
            loading="lazy"
          />
        </section>

        {/* Language Chart */}
        {languagesData.length > 0 && (
          <section className="mb-10">
            <h3 className="text-xl mb-4">Language Usage</h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languagesData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {languagesData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {languagesData.map((lang, i) => (
                <span
                  key={lang.name}
                  className="px-3 py-1 rounded-full text-xs text-base-content"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                >
                  {lang.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Latest Repos */}
        <section className="mb-10">
          <h3 className="text-xl mb-4">Latest Repositories</h3>

          <ul className="space-y-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg p-4 hover:bg-base-200 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{repo.name}</span>
                  <FiArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>

                <p className="text-sm text-base-content/80 mt-1 line-clamp-2">
                  {repo.description || "No description provided"}
                </p>

                <div className="text-xs mt-2 flex gap-4">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  {repo.language && <span>{repo.language}</span>}
                </div>
              </a>
            ))}
          </ul>
        </section>

        {/* Recent Commits */}
        <section>
          <h3 className="text-xl mb-4">Recent Commits</h3>

          <ul className="space-y-3">
            {commits.map((commit, i) => (
              <a
                key={i}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg p-4 hover:bg-base-200 transition"
              >
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      <span className="text-base-content/60">
                        [{commit.repo}]
                      </span>{" "}
                      {commit.message.split("\n")[0]}
                    </p>

                    <p className="text-xs text-base-content/60 mt-1">
                      {new Date(commit.date).toLocaleString()}
                    </p>
                  </div>

                  <FiArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 mt-1"
                  />
                </div>
              </a>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
