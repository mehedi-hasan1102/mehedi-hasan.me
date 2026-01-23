'use client';

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { Blog } from "../../lib/blogs";


const MONTH_ORDER: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

type Structured = Record<string, Record<string, Blog[]>>;

interface BlogContentProps {
  years: string[];
  structured: Structured;
}

export function BlogContent({ years, structured }: BlogContentProps) {
  const handleNavigate = useCallback((slug: string) => {
    window.location.href = `/blog/${slug}`;
  }, []);

  const sortedData = useMemo(() => {
    return years.map((year) => {
      const months = Object.keys(structured[year]).sort(
        (a, b) => MONTH_ORDER[b] - MONTH_ORDER[a]
      );

      const monthData = months.map((month) => {
        const blogs = [...structured[year][month]].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return { month, blogs };
      });

      const totalBlogs = monthData.reduce(
        (sum, m) => sum + m.blogs.length,
        0
      );

      return { year, monthData, totalBlogs };
    });
  }, [years, structured]);

  return (
    <section className="w-full mx-auto font-geist rounded-lg backdrop-blur-sm p-4">
      {/* Header */}
      <div className="m-4">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
          Blog
        </h1>
        <p className="text-base mt-2 mb-0 text-base-content/75">
          I have been programming for nearly six years. Over the past year, I’ve worked with a variety of technologies, and I’m here to share my experience. You can also read my tweets on {" "}
          <a
            href="https://x.com/mehedihasan1102"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary underline underline-offset-6 transition-colors"
          >
            X
          </a>.
        </p>
      </div>


      {sortedData.length === 0 ? (
        <p className="text-center text-base-content/60 mt-8">
          No posts published yet.
        </p>
      ) : (
        <div className="space-y-10 mt-6">
          {sortedData.map(({ year, monthData, totalBlogs }) => (
            <div key={year}>
              {/* Year */}
              <div className="flex items-end gap-2 mb-2 px-4">
                <h2 className="text-xl font-medium">{year}</h2>
                <span className="text-sm text-base-content/50">
                  • {totalBlogs}
                </span>
              </div>

              <div className="h-px bg-base-content/10 mb-6" />

              {/* Months */}
              <div className="space-y-6">
                {monthData.map(({ month, blogs }) => (
                  <div key={month}>
                    <h3 className="text-sm uppercase tracking-wide text-base-content/50 mb-3 px-4">
                      {month}
                    </h3>

                    <div className="space-y-6">
                      {blogs.map((blog) => (
                        <div
                          key={blog.slug}
                          onClick={() => handleNavigate(blog.slug)}
                          className="
        group flex gap-4 rounded-lg
        px-3 py-3 sm:px-4
        cursor-pointer
        transition-colors
      "
                        >
                          {/* Thumbnail */}
                          <div className="hidden sm:block w-28 h-20 relative overflow-hidden rounded-md flex-shrink-0">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title + Arrow (resume-style) */}
                            <div className="inline-flex items-center group-hover:underline underline-offset-4">
                              <h4 className="text-[15px] font-medium leading-snug tracking-tight">
                                {blog.title} ↗
                              </h4>
                              
                            </div>

                            {/* Meta */}
                            <p className="mt-1 text-xs text-base-content/45">
                              {blog.date} • {blog.readTime}
                            </p>

                            {/* Description */}
                            {blog.description && (
                              <p className="mt-2 text-sm text-base-content/80 line-clamp-2">
                                 {blog.description?.slice(0, 50)}…
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      )}

      <div className="m-4 mt-6">
  <p className="text-sm text-base-content/60">
    Want to see more posts or connect with me professionally? Visit my{" "}
    <a
      href="https://www.linkedin.com/in/mehedi-hasan1102"
      target="_blank"
      className="font-medium hover:text-primary text-base-content/60 underline underline-offset-6"
    >
      LinkedIn
    </a>{" "}
    for updates, projects, and career insights.
  </p>
</div>

    </section>
  );
}
