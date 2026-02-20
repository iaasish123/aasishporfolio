import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    const caption = captionRef.current;
    const socials = socialsRef.current;
    const image = imageRef.current;

    if (!section || !panel || !headline || !cta || !caption || !socials || !image) return;

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(panel, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo(image, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 0)
        .fromTo(headline.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 }, 0.2)
        .fromTo(cta, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 0.5)
        .fromTo([caption, socials], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.6);

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([panel, headline, cta, caption, socials, image], { 
              opacity: 1, x: 0, y: 0, scale: 1 
            });
          }
        }
      });

      // ENTRANCE (0-30%): Elements are already visible from load animation
      // SETTLE (30-70%): Hold position
      // EXIT (70-100%): Exit animations
      
      // Panel exit
      scrollTl.fromTo(panel, 
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline exit
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTA exit
      scrollTl.fromTo(cta,
        { scale: 1, opacity: 1 },
        { scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.78
      );

      // Image exit
      scrollTl.fromTo(image,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Caption and socials exit
      scrollTl.fromTo([caption, socials],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="hero"
      className="relative w-screen h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <img 
          src="/hero_city_skyline.jpg" 
          alt="City skyline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent" />
      </div>

      {/* Left Panel */}
      <div 
        ref={panelRef}
        className="absolute left-0 top-0 w-[52vw] h-full bg-dark/78"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[7vw]">
        {/* Headline Group */}
        <div ref={headlineRef} className="max-w-xl" style={{ willChange: 'transform, opacity' }}>
          <span className="font-mono-label text-gold mb-4 block">DATA ANALYST</span>
          <h1 className="text-[clamp(44px,5vw,76px)] font-heading font-bold text-cream leading-[0.95] mb-6">
            Aasish<br />Kumar
          </h1>
          <p className="text-xl text-graytext mb-8">
            SQL • Power BI • Snowflake
          </p>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToWork}
          className="w-fit px-8 py-3 bg-gold text-dark font-heading font-semibold rounded-pill 
                     hover:scale-105 hover:-translate-y-0.5 transition-transform duration-300
                     flex items-center gap-2 group"
          style={{ willChange: 'transform, opacity' }}
        >
          View my work
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div 
        ref={captionRef}
        className="absolute left-[7vw] bottom-[8vh] text-graytext text-sm"
        style={{ willChange: 'opacity' }}
      >
        Washington, DC • Open to relocation
      </div>

      {/* Social Links */}
      <div 
        ref={socialsRef}
        className="absolute right-[7vw] bottom-[8vh] flex items-center gap-6"
        style={{ willChange: 'opacity' }}
      >
        <a 
          href="https://www.linkedin.com/in/immadisettyaasishkumar/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-graytext hover:text-gold transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          <span className="text-sm">LinkedIn</span>
        </a>
        <a 
          href="mailto:iamaasishkumar@gmail.com"
          className="flex items-center gap-2 text-graytext hover:text-gold transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span className="text-sm">Email</span>
        </a>
      </div>
    </section>
  );
}
