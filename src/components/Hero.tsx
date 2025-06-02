import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 10,000+ dealers and 50,000+ buyers
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Drive Your Dreams.
            </span>
            <br />
            <span className="text-gray-900">Sell With Confidence.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The intelligent car marketplace that connects trusted dealers with qualified buyers through
            AI-powered matching, transparent pricing, and secure transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-full group"
              asChild
            >
              <Link to="/browse">
                Start Buying Cars
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 rounded-full border-2 hover:bg-gray-50"
              onClick={handlePlay}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl relative">
              <ReactPlayer
                url="https://youtu.be/KPEPEhfQcCU?si=fcp7V097vdOUoOre"
                width="100%"
                height="100%"
                playing={isPlaying}
                controls
                light="https://via.placeholder.com/800x450?text=AutoConnect+Demo"
                playIcon={
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-medium">See E&T Motors in Action</p>
                  </div>
                }
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
