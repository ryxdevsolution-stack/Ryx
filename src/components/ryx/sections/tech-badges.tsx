"use client";

import { motion } from "framer-motion";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { SectionLabel } from "../section-label";
import { SITE_CONFIG } from "@/lib/site-config";
import { makeStaggerParent, FADE_UP_CHILD, POP_CHILD } from "../motion";
import { SectionReveal } from "../section-reveal";

const wrapperParent = makeStaggerParent(0.07, 0);
const badgesParent = makeStaggerParent(0.04, 0.1);

export function TechBadgesSection() {
  const techs = SITE_CONFIG.technologies;

  return (
    <ParallaxBanner className="ig-section-white">
      {/* Background layer — texture drifts */}
      <ParallaxBannerLayer
        translateY={[-15, 15]}
        scale={[1.06, 1]}
        shouldAlwaysCompleteAnimation
        className="ig-texture opacity-40"
      />

      {/* Content drives the banner height */}
      <div className="relative z-10 py-14 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionReveal variants={wrapperParent} className="flex flex-col items-center gap-8" amount={0.2}>
            <motion.div variants={FADE_UP_CHILD}>
              <SectionLabel text="Technologies we build with" variant="light" />
            </motion.div>

            <SectionReveal variants={badgesParent} className="flex flex-wrap justify-center gap-3" amount={0.1}>
              {techs.map((tech) => (
                <motion.span
                  key={tech}
                  variants={POP_CHILD}
                  className="px-5 py-2.5 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-600 hover:border-black hover:text-black transition-colors duration-300 cursor-default shadow-sm"
                  whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                >
                  {tech}
                </motion.span>
              ))}
            </SectionReveal>

            <motion.p variants={FADE_UP_CHILD} className="text-sm text-neutral-400 text-center max-w-xs">
              Production-grade tools trusted by teams worldwide
            </motion.p>
          </SectionReveal>

        </div>
      </div>
    </ParallaxBanner>
  );
}
