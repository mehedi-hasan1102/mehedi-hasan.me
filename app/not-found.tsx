'use client';

import Link from "next/link";
import Image from "next/image";
import { SiHomebrew } from "react-icons/si";

const NotFound = () => {
  return (
    <section className="font-geist mx-auto px-4 max-w-3xl relative overflow-hidden flex justify-center pt-20">
      <div className="relative z-10 min-h-screen w-full mt-1  py-4">

        {/* Header */}
        <div className="m-4 ">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-start">
            Oops! Page Not Found
          </h1>

          <p className="text-base mt-3 mb-0 text-base-content/75  ">
            The page you are looking for doesn’t exist or may have been moved. 
            Check the URL or return to the{" "}
            <Link
              href="/"
              className="font-medium hover:text-primary underline underline-offset-4 transition-colors"
            >
              homepage
            </Link>.
          </p>
        </div>

        {/* 404 Image */}
        <div className="flex justify-center mb-4">
          <Image
            src="/404.png"
            alt="404 Not Found"
            width={420}
            height={420}
            className="w-[260px] sm:w-[340px] md:w-[420px] h-auto"
            priority
          />
        </div>

        {/* Button */}
        <div className="flex justify-center py-8">
          <Link href="/" className="inline-flex flex-col items-start text-start">
            
            <span className="mt-3 inline-flex items-center gap-2 hover:text-primary font-medium text-sm">
              Go Home <SiHomebrew size={16} />
            </span>
          </Link>
        </div>

        <p className="text-start text-sm text-base-content/50 m-4">
          You can explore my projects, skills, or contact section from the homepage.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
