import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, MessageCircle, Sun, Moon, Star, Timer, Users, Phone, Mail, MapPin, Filter, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import AboutSection from '@/components/AboutSection';
import Lookbook from '@/components/Lookbook';
import SizeGuide from '@/components/SizeGuide';
import ContactSection from '@/components/ContactSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light Mode Activated 💡" : "ZANGA Black Mode 🔥",
      description: darkMode ? "Welcome to the light side" : "Now that's more like it!",
    });
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, id: Date.now(), quantity: 1 }]);
    toast({
      title: "Added to Cart! 🔥",
      description: `${product.name} is now in your bag`,
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navigation 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        cart={cart}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />
      
      {/* === HERO SECTION === */}
      <Hero />

      {/* === PRODUCT SHOWCASE === */}
      <ProductShowcase 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
        darkMode={darkMode}
      />

      {/* === ABOUT SECTION === */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500 text-black font-bold px-4 py-1">STREET ROYALTY</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            <span className="text-yellow-400">ZANGA</span> is not just fashion — it's an identity.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Born on the streets. Built for legends. Every piece tells a story. Every story builds a legacy. 
            Welcome to the future of African streetwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Premium Quality", desc: "Only the finest fabrics and craftsmanship. No compromises, no shortcuts—just pure excellence." },
            { title: "African Authenticity", desc: "Rooted in our culture, designed for the world. Representing the best of Nigerian creativity and style." },
            { title: "Street Credibility", desc: "For the ones who keep it 100. Bold designs that make statements and turn heads everywhere." }
          ].map((item, i) => (
            <Card key={i} className="bg-gray-800 border-none text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* === LOOKBOOK / REAL PEOPLE === */}
      <Lookbook />

      {/* === SIZE GUIDE === */}
      <SizeGuide darkMode={darkMode} />

      {/* === TESTIMONIALS === */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Real People. Real Style. Real ZANGA.</h2>
          <div className="space-y-6">
            {[
              "Finally, streetwear that represents us properly. ZANGA is the real deal!",
              "The quality is insane! My ZANGA beanie gets compliments everywhere I go.",
              "Ordered 3 pieces last month. The fit, the vibe, everything is perfect."
            ].map((quote, i) => (
              <blockquote key={i} className="text-xl italic text-gray-300 border-l-4 border-yellow-500 pl-6">
                "{quote}"
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* === CONTACT & CTA === */}
      <ContactSection darkMode={darkMode} />

      {/* === SPECIAL OFFER === */}
      <section className="py-12 text-center bg-yellow-500 text-black">
        <h2 className="text-2xl font-bold">Special Offer Alert! 🎉</h2>
        <p className="mt-2">DM us <strong>"ZANGA20"</strong> on WhatsApp for a discount on your first order!</p>
        <Button className="mt-4 bg-black text-yellow-400 hover:bg-gray-800">
          Chat on WhatsApp
        </Button>
      </section>

      <FloatingWhatsApp />
    </div>
  );
};

export default Index;

export const metadata = {
  title: 'ZANGA LABEL – Premium Nigerian Streetwear',
  description: 'Born on the streets. Built for legends. ZANGA LABEL creates premium African streetwear for the bold, the authentic, and the unapologetically real.',
  keywords: 'Nigerian streetwear, African fashion, ZANGA LABEL, premium streetwear, Lagos fashion, urban style',
  openGraph: {
    title: 'ZANGA LABEL – Real Wears for Real Guys',
    description: 'Premium Nigerian streetwear that speaks identity, pride, and pure fire.',
    url: 'https://zangalabel.com',
    siteName: 'ZANGA LABEL',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZANGA LABEL – Premium African Streetwear',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};