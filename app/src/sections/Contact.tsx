import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(right,
        { x: '10vw', opacity: 0, rotate: 1 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative w-full min-h-screen bg-dark py-24 z-60"
    >
      <div className="max-w-[86vw] mx-auto flex flex-col lg:flex-row gap-16">
        {/* Left Column */}
        <div 
          ref={leftRef}
          className="lg:w-[38vw]"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-[clamp(36px,4vw,56px)] font-heading font-bold text-cream mb-6">
            Let's work together
          </h2>
          <p className="text-graytext text-lg leading-relaxed mb-10">
            If you need dashboards, data pipelines, or reporting systems—let's talk.
          </p>

          {/* Direct Contacts */}
          <div className="space-y-5">
            <a 
              href="mailto:iamaasishkumar@gmail.com"
              className="flex items-center gap-4 text-graytext hover:text-gold transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-dark-lighter border border-white/10 
                            flex items-center justify-center group-hover:border-gold/50 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span>iamaasishkumar@gmail.com</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/immadisettyaasishkumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-graytext hover:text-gold transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-dark-lighter border border-white/10 
                            flex items-center justify-center group-hover:border-gold/50 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <span>linkedin.com/in/immadisettyaasishkumar</span>
            </a>
            
            <div className="flex items-center gap-4 text-graytext">
              <div className="w-10 h-10 rounded-full bg-dark-lighter border border-white/10 
                            flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span>Washington, DC • Open to relocation</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div 
          ref={rightRef}
          className="lg:w-[40vw]"
          style={{ willChange: 'transform, opacity' }}
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-dark-lighter rounded-2xl p-8 border border-white/5"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-cream text-sm mb-2 font-heading">Name</label>
                <Input 
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-dark border-white/10 text-cream placeholder:text-graytext/50
                           focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>
              
              <div>
                <label className="block text-cream text-sm mb-2 font-heading">Email</label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-dark border-white/10 text-cream placeholder:text-graytext/50
                           focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>
              
              <div>
                <label className="block text-cream text-sm mb-2 font-heading">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-dark border-white/10 text-cream placeholder:text-graytext/50
                           focus:border-gold focus:ring-gold/20 min-h-[140px] resize-none"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gold text-dark font-heading font-semibold hover:bg-gold/90
                         py-3 rounded-pill transition-all duration-300 hover:-translate-y-0.5
                         flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
