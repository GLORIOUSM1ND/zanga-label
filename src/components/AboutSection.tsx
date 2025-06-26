import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Zap } from 'lucide-react';

const AboutSection = ({ darkMode }) => {
  const stats = [
    { icon: Users, number: "10K+", label: "Happy Customers" },
    { icon: Award, number: "100%", label: "Premium Quality" },
    { icon: Star, number: "4.9", label: "Average Rating" },
    { icon: Zap, number: "24/7", label: "Fast Delivery" }
  ];

  return (
    <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="bg-yellow-500 text-black font-bold mb-6 text-lg px-6 py-2">
            THE ZANGA STORY
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Born on the Streets.
            <span className="block text-blue-500">Built for Legends.</span>
          </h2>
          
          <div className="text-lg leading-relaxed space-y-6 text-gray-600 dark:text-gray-300">
            <p>
              <strong className="text-yellow-500">ZANGA LABEL</strong> isn't just clothing—it's a movement. 
              Born from the vibrant streets of Nigeria, we create premium streetwear that speaks 
              to the bold, the authentic, and the unapologetically real.
            </p>
            
            <p>
              Every thread tells a story of <strong>African excellence</strong>. Every design carries 
              the spirit of our culture. When you wear ZANGA, you're not just wearing clothes—
              you're wearing <strong>identity, pride, and pure fire</strong> 🔥.
            </p>
            
            <p className="text-xl font-semibold text-yellow-500">
              "For the real ones who know quality when they see it."
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className={`text-center group hover:scale-105 transition-transform duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'
            }`}>
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-yellow-500 group-hover:text-blue-500 transition-colors" />
                <div className="text-2xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className={`group hover:scale-105 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only the finest fabrics and craftsmanship. No compromises, 
                no shortcuts—just pure excellence.
              </p>
            </CardContent>
          </Card>

          <Card className={`group hover:scale-105 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-4">African Authenticity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rooted in our culture, designed for the world. 
                Representing the best of Nigerian creativity and style.
              </p>
            </CardContent>
          </Card>

          <Card className={`group hover:scale-105 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-4">Street Credibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                For the ones who keep it 100. Bold designs that make 
                statements and turn heads everywhere.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
