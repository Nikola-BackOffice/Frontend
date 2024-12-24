'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, [ref]);

  const { scrollXProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 100%'],
  });

  const widthTransform = useTransform(scrollXProgress, [0, 1], [0, width]);
  const opacityTransform = useTransform(scrollXProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto flex min-w-[2000px] pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-500 dark:text-neutral-500 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}{' '}
            </div>
          </div>
        ))}
        <div
          style={{
            width: width + 'px',
          }}
          className="absolute top-40 h-[2px] overflow-hidden bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700"
        >
          <motion.div
            style={{
              width: widthTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-y-0 h-[2px] rounded-full bg-gradient-to-l from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
