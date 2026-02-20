import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Executive Operations Dashboard',
    desc: 'Unified incident and performance data into a single source of truth.',
    image: '/card_dashboard.jpg'
  },
  {
    title: 'Cloud Cost & Reliability Analytics',
    desc: 'Identified optimization opportunities across AWS and Azure workloads.',
    image: '/card_cloud.jpg'
  },
  {
    title: 'Customer Churn & Segmentation',
    desc: 'Delivered segmentation insights that improved campaign ROI.',
    image: '/card_segmentation.jpg'
  }
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

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
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      const cardItems = cards.querySelectorAll('.work-card');
      // Card 1 from left
      scrollTl.fromTo(cardItems[0],
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );
      // Card 2 from bottom
      scrollTl.fromTo(cardItems[1],
        { y: '100vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );
      // Card 3 from right
      scrollTl.fromTo(cardItems[2],
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cardItems,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative w-screen h-screen overflow-hidden z-40 bg-dark"
    >
      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[7vw] top-[10vh]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="text-[clamp(36px,4vw,56px)] font-heading font-bold text-cream mb-2">
          Selected Work
        </h2>
        <p className="text-graytext text-lg">
          A few projects that show how I turn raw data into action.
        </p>
      </div>

      {/* Cards */}
      <div 
        ref={cardsRef}
        className="absolute bottom-[12vh] left-[7vw] right-[7vw] flex justify-between gap-6"
      >
        {projects.map((project, index) => (
          <div 
            key={index}
            className="work-card w-[26vw] h-[56vh] bg-dark-lighter rounded-2xl overflow-hidden
                       shadow-card border border-white/5 group cursor-pointer
                       hover:border-gold/30 transition-all duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Image */}
            <div className="h-[62%] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Content */}
            <div className="h-[38%] p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-cream font-heading font-semibold text-lg mb-2 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-graytext text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View details</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
