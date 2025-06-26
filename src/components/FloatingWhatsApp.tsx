
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = "Hi ZANGA LABEL! 👋 I'm interested in your premium streetwear collection. Can you help me out? 🔥";
    const whatsappUrl = `https://wa.me/2349017715919?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat on WhatsApp</span>
      </Button>
      
      <div className="absolute -top-12 -left-20 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us! 💬
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
