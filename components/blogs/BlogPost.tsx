'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Blog } from "../../lib/blogs";
import { ScrollProgress } from "../ui/scroll-progress";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// Props for BlogPost
interface Props {
  blog: Blog;
}

const BlogPost: React.FC<Props> = ({ blog }) => {
  const router = useRouter();
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    const serializeContent = async () => {
      try {
        setIsLoading(true);
        const source = await serialize(blog.fullContent);
        setMdxSource(source);
      } catch (err) {
        console.error("Error serializing MDX:", err);
        setError("Failed to load blog content");
      } finally {
        setIsLoading(false);
      }
    };

    if (blog.fullContent) {
      serializeContent();
    }
  }, [blog.fullContent]);

  // Custom components for MDX with copy functionality
  const components = {
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
      const getCodeContent = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (React.isValidElement(node)) {
          const nodeProps = node.props as Record<string, unknown>;
          if (typeof nodeProps.children === 'string') return nodeProps.children;
          return getCodeContent(nodeProps.children as React.ReactNode);
        }
        return '';
      };
      
      const codeContent = getCodeContent(children);
      const isCopied = copiedCode === codeContent;
      
      return (
        <div className="relative">
          <pre {...props} className="bg-base-200 p-4 overflow-x-auto text-sm leading-relaxed rounded-lg border border-primary/20">
            {children}
          </pre>
          <button
            onClick={() => handleCopy(codeContent)}
            className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-primary text-primary-content opacity-80 hover:opacity-100 transition"
          >
            {isCopied ? "✓ Copied" : "⧉ Copy"}
          </button>
        </div>
      );
    },
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-base-100 to-base-100">
      <ScrollProgress />

      {/* Hero Section */}
     
      {blog.image && (
  <div className="flex justify-center mb-16 overflow-hidden mt-16">
    <div className="relative w-full max-w-3xl h-80 sm:h-96 lg:h-[480px]">
      <Image
        src={blog.image}
        alt={blog.title}
        fill
        className="object-cover"
        priority
      />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-base-100 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />
    </div>
  </div>
)}


      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-primary  transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Header Section */}
        <header className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="badge badge-sm badge-primary font-medium uppercase tracking-wide">
              {blog.category}
            </span>
            <span className="text-sm text-base-content/60">
              {new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-3xl lg:text-3xl font-bold tracking-tight leading-[1.1] text-base-content mb-4">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-base-content/70 border-t border-base-300 pt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {error && (
          <div className="alert alert-error mb-8 max-w-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-8l2 2m0 0l2 2m-2-2l-2-2m2 2l2 2" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* MDX Content */}
        {mdxSource && (
       

<div className="
  max-w-3xl mx-auto px-4 text-base-content text-sm leading-relaxed

  [&_p]:my-4
  [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:font-black
  [&_h2]:mt-5 [&_h2]:mb-3 [&_h2]:font-bold
  [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:font-semibold
  [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:ml-6
  [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6
  [&_a]:underline [&_a]:underline-offset-4  [&_a]:text-base-content [&_a]:transition-colors [&_a:hover]:text-primary
  [&_blockquote]:my-4 [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50
  [&_pre]:my-4 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:bg-base-200
  [&_code:not(pre_code)]:my-2 [&_code:not(pre_code)]:px-2 [&_code:not(pre_code)]:py-1 [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:bg-base-200/60 [&_code:not(pre_code)]:text-primary
">





            <MDXRemote {...mdxSource} components={components} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-14 pt-8 pb-16 max-w-3xl border-t border-base-300">
          <div className="bg-base-200/50 rounded-xl p-8 space-y-4">
            <p className="text-sm text-base-content/70">
              <span className="font-semibold">Published:</span> {new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-base-content/70">
              <span className="font-semibold">Reading time:</span> {blog.readTime}
            </p>
            <p className="text-sm text-base-content/70">
              <span className="font-semibold">Category:</span> 
              <span className="badge badge-sm badge-primary ml-2">{blog.category}</span>
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
