
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap } from 'lucide-react';

const Hero = () => {
  const backgroundImages = [
    "/zanga-images/hero3.jpg",
    "/zanga-images/hero2.jpg",
    "/zanga-images/hero5.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
              index === currentImageIndex ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <img
              src={image}
              alt={`ZANGA Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-yellow-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-400/30 rotate-12 animate-bounce"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/50 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content with Enhanced Animations */}
      <div 
        className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        style={{
          transform: `translateY(${scrollY * -0.2}px)`,
        }}
      >
        <div className="animate-fade-in">
          {/* Brand Badge */}
          <div className="flex items-center justify-center space-x-2 mb-6 animate-scale-in">
            <Star className="h-6 w-6 text-yellow-400 fill-current animate-pulse" />
            <span className="text-yellow-400 font-semibold tracking-wider bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
              PREMIUM NIGERIAN STREETWEAR
            </span>
            <Star className="h-6 w-6 text-yellow-400 fill-current animate-pulse" />
          </div>
          
          {/* Main Title with Glow Effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
              ZANGA
            </span>
            <span className="block text-blue-400 drop-shadow-glow animate-pulse">
              LABEL
            </span>
          </h1>
          
          
          {/* Signature Quote */}
          <div className="mb-8 animate-fade-in-up">
            <blockquote className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed">
              "Real Wears for Real Guys. ⚡"
            </blockquote>
            <p className="text-xl md:text-2xl text-yellow-400 font-semibold">
              ZANGA is not just fashion — it's a identity.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-up">
            <Button 
              onClick={scrollToProducts}
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-10 py-6 text-xl group transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            >
              <Zap className="mr-3 h-6 w-6" />
              SHOP NOW 🔥
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-6 text-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE LOOKBOOK
            </Button>
          </div>

          {/* What's Hot Banner */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-full inline-block animate-pulse shadow-2xl">
            <span className="font-bold text-lg">
              🔥 WHAT'S HOT: Trucker Cap - Limited Time 35,000 (Was ₦40,000)
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-1 h-16 bg-gradient-to-b from-white to-transparent rounded-full"></div>
          <div className="mt-2 text-white text-sm animate-pulse">SCROLL</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
