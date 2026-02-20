import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer.querySelector('.footer-content'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="w-full bg-dark-lighter py-12 z-70"
    >
      <div className="footer-content max-w-[86vw] mx-auto flex flex-col md:flex-row 
                      items-center justify-between gap-6">
        <div className="text-cream font-heading font-semibold text-lg">
          © Aasish Kumar
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://www.linkedin.com/in/immadisettyaasishkumar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-graytext hover:text-gold transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a 
            href="mailto:iamaasishkumar@gmail.com"
            className="flex items-center gap-2 text-graytext hover:text-gold transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
