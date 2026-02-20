import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Code2, 
  BarChart3, 
  LineChart, 
  Cloud, 
  Workflow,
  Server,
  Search,
  GitBranch
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Database, label: 'SQL', desc: 'Complex queries & optimization' },
  { icon: Code2, label: 'Python', desc: 'pandas, NumPy, automation' },
  { icon: BarChart3, label: 'Power BI', desc: 'Dashboards & KPI reporting' },
  { icon: LineChart, label: 'Tableau', desc: 'Visual analytics' },
  { icon: Cloud, label: 'Snowflake', desc: 'Data modeling & warehousing' },
  { icon: Workflow, label: 'Azure Data Factory', desc: 'ETL pipelines' },
  { icon: GitBranch, label: 'Airflow', desc: 'Workflow orchestration' },
  { icon: Server, label: 'AWS', desc: 'S3, Redshift cloud platforms' },
  { icon: Search, label: 'Splunk / ELK', desc: 'Monitoring & logs' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const line = lineRef.current;
    const grid = gridRef.current;

    if (!section || !headline || !line || !grid) return;

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
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'none' },
        0.05
      );

      const cells = grid.querySelectorAll('.skill-cell');
      scrollTl.fromTo(cells,
        { y: '10vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(line,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cells,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative w-screen h-screen overflow-hidden z-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/skills_workspace.jpg" 
          alt="Workspace" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/65" />
      </div>

      {/* Gold Accent Line */}
      <div 
        ref={lineRef}
        className="absolute left-[5vw] top-[15vh] w-[45vw] h-[2px] bg-gold origin-left"
        style={{ willChange: 'transform, opacity', transform: 'rotate(-12deg)' }}
      />

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[7vw] top-[18vh] w-[34vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="text-[clamp(36px,4vw,56px)] font-heading font-bold text-cream mb-4">
          Skills
        </h2>
        <p className="text-graytext text-lg leading-relaxed">
          Technologies I use to build reliable analytics and reporting.
        </p>
      </div>

      {/* Skills Grid */}
      <div 
        ref={gridRef}
        className="absolute right-[7vw] top-[18vh] w-[40vw] grid grid-cols-3 gap-4"
      >
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="skill-cell bg-dark/80 backdrop-blur-sm rounded-2xl p-5 border border-white/5
                       hover:border-gold/30 hover:bg-dark-lighter/80 transition-all duration-300
                       group"
            style={{ willChange: 'transform, opacity' }}
          >
            <skill.icon className="w-6 h-6 text-gold mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-cream font-heading font-semibold text-sm mb-1">
              {skill.label}
            </h3>
            <p className="text-graytext text-xs leading-relaxed">
              {skill.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
