import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    date: 'Jul 2023 – Present',
    role: 'Data Analyst',
    company: 'George Washington University',
    desc: 'Operational dashboards, incident analytics, and ETL automation.'
  },
  {
    date: 'Jan 2022 – Dec 2022',
    role: 'Graduate Data Analyst',
    company: 'George Washington University',
    desc: 'Academic data pipelines, reporting, and research support.'
  },
  {
    date: 'Oct 2018 – Aug 2021',
    role: 'Data Analyst',
    company: 'Ericsson',
    desc: 'Telecom analytics, churn models, and campaign performance.'
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const line = lineRef.current;
    const entries = entriesRef.current;

    if (!section || !headline || !line || !entries) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headline,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(line,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: 'none' },
        0
      );

      const entryItems = entries.querySelectorAll('.exp-entry');
      scrollTl.fromTo(entryItems,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.12
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(line,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(entryItems,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative w-screen h-screen overflow-hidden z-30"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/experience_team.jpg" 
          alt="Team collaboration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[7vw] top-[18vh] w-[34vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="text-[clamp(36px,4vw,56px)] font-heading font-bold text-cream mb-4">
          Experience
        </h2>
        <p className="text-graytext text-lg leading-relaxed">
          Roles that shaped my approach to data, reporting, and delivery.
        </p>
      </div>

      {/* Vertical Gold Line */}
      <div 
        ref={lineRef}
        className="absolute left-[46vw] top-[18vh] w-[2px] h-[64vh] bg-gold origin-top"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Timeline Entries */}
      <div 
        ref={entriesRef}
        className="absolute right-[7vw] top-[18vh] w-[40vw] space-y-8"
      >
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="exp-entry bg-dark/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5
                       hover:border-gold/30 hover:bg-dark-lighter/80 transition-all duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="font-mono-label text-gold mb-2 block">
              {exp.date}
            </span>
            <h3 className="text-cream font-heading font-semibold text-xl mb-1">
              {exp.role}
            </h3>
            <p className="text-graytext/80 text-sm mb-2">
              {exp.company}
            </p>
            <p className="text-graytext text-sm leading-relaxed">
              {exp.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
