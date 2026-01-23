import Image from "next/image";
import TypewriterText from "../ui/TypewriterText";
import HeroActions from "./HeroActions";

const HeroSection = () => {
  return (
    <section className="font-geist w-full max-w-3xl mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-6 rounded-xl p-5">

        {/* LCP IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden">
            <Image
              src="/assets/images/profile.png"
              alt="Mehedi Hasan"
              fill
              priority
              sizes="(max-width: 768px) 160px, 192px"
              className="object-cover"
            />
          </div>
        </div>

        {/* TEXT */}
        <div>
          <p className="text-sm tracking-wide text-base-content/60 mb-2">
            Hi, I’m Mehedi Hasan
            <TypewriterText />
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Full-Stack{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Web Developer
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-base-content/70 max-w-md">
            I build scalable, high-performance web applications using modern
            JavaScript technologies with a strong focus on clean architecture
            and user experience.
          </p>

          <HeroActions />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
