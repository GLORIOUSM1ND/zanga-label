import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Clock } from 'lucide-react';

const ContactSection = ({ darkMode }) => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+234 901 771 5919",
      action: "tel:+2349017715919",
      color: "text-green-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "Chat with us now",
      action: "https://wa.me/2349017715919",
      color: "text-green-500"
    },
    {
      icon: Instagram,
      title: "Follow Us",
      details: "@zangalabel",
      action: "#",
      color: "text-pink-500"
    },
    {
      icon: MapPin,
      title: "Based In",
      details: "Nigeria",
      action: "#",
      color: "text-blue-500"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM" }
  ];

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-green-500 text-white font-bold mb-6 text-lg px-6 py-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            GET IN TOUCH
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Connect?
            <span className="block text-green-500">Let's Talk ZANGA.</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Questions? Custom orders? Just want to say what's up? 
            We're here for all the real conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => (
              <Card 
                key={index} 
                className={`group hover:scale-105 transition-all duration-300 cursor-pointer ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'
                }`}
                onClick={() => contact.action !== "#" && window.open(contact.action, '_blank')}
              >
                <CardContent className="p-6 text-center">
                  <contact.icon className={`h-8 w-8 mx-auto mb-4 ${contact.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{contact.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Hours & Quick Actions */}
          <div className="space-y-6">
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600 dark:text-gray-300">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                    onClick={() => window.open('https://wa.me/2349017715919?text=Hi ZANGA! I want to make an order 🔥', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Order via WhatsApp
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover:border-blue-500 hover:text-blue-500"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Browse Products
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover:border-yellow-500 hover:text-yellow-500"
                    onClick={() => document.getElementById('size-guide')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Check Size Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-r from-yellow-500 to-orange-500 text-black ${darkMode ? 'border-gray-700' : ''}`}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">🔥 Special Offer Alert!</h3>
                <p className="mb-4">
                  DM us "ZANGA20" on WhatsApp for a special discount on your first order!
                </p>
                <Button 
                  className="bg-black text-yellow-500 hover:bg-gray-800 font-bold"
                  onClick={() => window.open('https://wa.me/2349017715919?text=ZANGA20 - I want my special discount! 🔥', '_blank')}
                >
                  Claim Now 💎
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/zanga-images/zanga.jpg" 
              alt="ZANGA LABEL" 
              className="h-6 w-auto"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>ZANGA LABEL</strong> - Premium Nigerian Streetwear
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For the real ones who know quality when they see it. 🔥
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
