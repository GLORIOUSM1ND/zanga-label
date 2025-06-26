
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
      
      <Hero />
      
      <ProductShowcase 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
        darkMode={darkMode}
      />
      
      <AboutSection darkMode={darkMode} />
      
      <Lookbook />
      
      <SizeGuide darkMode={darkMode} />
      
      <ContactSection darkMode={darkMode} />
      
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
export const metadata = {
  title: 'ZANGA - Your Fashion Destination',
  description: 'Discover the latest trends in fashion with ZANGA. Shop now for exclusive collections and styles.',
  keywords: 'fashion, clothing, accessories, online shopping, ZANGA',
  openGraph: {
    title: 'ZANGA - Your Fashion Destination',
    description: 'Discover the latest trends in fashion with ZANGA. Shop now for exclusive collections and styles.',
    url: 'https://zanga.com',
    siteName: 'ZANGA',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZANGA Fashion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};