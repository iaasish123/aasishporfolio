import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '35%', label: 'Reporting performance improvement' },
  { value: '25%', label: 'Reduction in incident response time' },
  { value: '5+', label: 'Years delivering analytics solutions' }
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const line = lineRef.current;
    const metricsEl = metricsRef.current;

    if (!section || !headline || !line || !metricsEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headline,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'none' },
        0.08
      );

      const metricItems = metricsEl.querySelectorAll('.metric-item');
      scrollTl.fromTo(metricItems,
        { y: '18vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'none' },
        0.12
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(line,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(metricItems,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="metrics" 
      className="relative w-screen h-screen overflow-hidden z-50"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/metrics_city.jpg" 
          alt="City view" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[7vw] top-[14vh]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="text-[clamp(36px,4vw,56px)] font-heading font-bold text-cream mb-2">
          Impact
        </h2>
        <p className="text-graytext text-lg">
          Measurable outcomes from recent work.
        </p>
      </div>

      {/* Gold Line */}
      <div 
        ref={lineRef}
        className="absolute left-[7vw] top-[34vh] w-[86vw] h-[2px] bg-gold origin-left"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Metrics */}
      <div 
        ref={metricsRef}
        className="absolute left-[7vw] right-[7vw] top-[44vh] flex justify-between"
      >
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="metric-item"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="text-[clamp(64px,8vw,120px)] font-heading font-bold text-gold leading-none mb-4">
              {metric.value}
            </div>
            <div className="text-graytext text-lg max-w-[24vw]">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
