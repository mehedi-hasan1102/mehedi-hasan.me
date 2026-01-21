'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const GitHubActivitySection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto px-4 text-base-content font-geist py-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="text-lg font-semibold tracking-tight">
          GitHub Activity
        </h2>
      </motion.div>

      {/* Contribution Graph */}
      <div className="overflow-hidden">
        <img
          src="https://ghchart.rshah.org/mehedi-hasan1102"
          alt="GitHub contribution graph"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Footer link */}
      <div className="pt-6 text-center">
        <Link
          href="https://github.com/mehedi-hasan1102"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-1
            text-sm font-medium
            hover:text-primary
            
          "
        >
          View GitHub profile
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.section>
  );
};

export default GitHubActivitySection;
