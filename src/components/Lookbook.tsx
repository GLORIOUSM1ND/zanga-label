
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Instagram, Camera } from 'lucide-react';

const Lookbook = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const lookbookImages = [
    {
      src: "/zanga-images/duo.jpg",
      title: "Power Duo",
      description: "Clean fits for the confident"
    },
    {
      src: "/zanga-images/solo.jpg",
      title: "Solo Flex",
      description: "Style that speaks volumes"
    },
    {
      src: "/zanga-images/street.jpg",
      title: "Street Ready",
      description: "Where comfort meets culture"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lookbookImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + lookbookImages.length) % lookbookImages.length);
  };

  return (
    <section id="lookbook" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-yellow-500 text-black font-bold mb-6 text-lg px-6 py-2">
            <Camera className="w-4 h-4 mr-2" />
            LOOKBOOK
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the Vision.
            <span className="block text-yellow-500">Feel the Energy.</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real people, real style, real ZANGA. This is how legends wear their confidence.
          </p>
        </div>

        {/* Image Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
            <img
              src={lookbookImages[currentSlide].src}
              alt={lookbookImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-bold mb-2">{lookbookImages[currentSlide].title}</h3>
              <p className="text-lg text-gray-200">{lookbookImages[currentSlide].description}</p>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {lookbookImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: "Glorious",
              location: "Lagos",
              text: " Finally, streetwear that represents us properly. ZANGA is the real deal!🔥",
              rating: 5
            },
            {
              name: "OlaWire",
              location: "Abuja",
              text: "The quality is insane! My ZANGA beanie gets compliments everywhere I go.",
              rating: 5
            },
            {
              name: "Mayor",
              location: "South Africa",
              text: "Ordered 3 pieces last month. The fit, the vibe, everything is perfect. 💯",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="text-yellow-500">⭐</div>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg mr-4"
          >
            SHOP THE LOOK
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-black font-bold px-8 py-4 text-lg"
          >
            <Instagram className="w-5 h-5 mr-2" />
            FOLLOW US
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
