import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Filter, Timer, Star, ShoppingBag, Heart, Zap } from 'lucide-react';
import { release } from 'os';


function useLiveCountdown(releaseDate: string) {
  const calculateTimeLeft = () => {
    const difference = new Date(releaseDate).getTime() - new Date().getTime();
    if (difference <= 0) return "🎉 Dropping Now!";
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [releaseDate]);

  return timeLeft;
}

const ProductShowcase = ({ selectedCategory, setSelectedCategory, addToCart, darkMode }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(0);

  // Auto-flip index every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlippedIndex(prev => (prev + 1) % 2); // flip between 0 and 1
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('products');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Add image URLs to products
  const products = [
    {
      id: 1,
      name: "PRIVATE CLUB EXCLUSIVE - By Zanga Label",
      category: "Tops",
      colors: ["Blue & White Stripes", "Yellow & White Stripes"],
      fabric: "Confidential Blend – Premium Streetwear Grade",
      fit: "Bold Fit | Statement Cut",
      sizes: ["M", "L", "XL"],
      stock: 32,
      originalPrice: 50000,
      price: 45000,
      badge: "NEW ARRIVAL",
      isHot: true,
      description: "🔥This isn’t mass market — this is luxury streetwear. When you wear it, you’re not just dressing — you’re making a statement.",
      images: ['/zanga-images/private-club1.jpg', '/zanga-images/private-club2.jpg'],


    },

    {
      id: 2,
      name: "ZANGA LABEL EXECUTIVE TOP",
      category: "Tops",
      colors: ["White", "Black"],
      fabric: "Premium Cotton Blend",
      fit: "Clean Cut | Smart Fit",
      originalPrice: 30000,
      price: 25000,
      sizes: ["M", "L", "XL", "2XL"],
      badge: "LIMITED EDITION",
      isHot: true,
      stock: 19,
      description: "Elevate your style with premium cotton blend construction.",
      images: ['/zanga-images/hero2.jpg', '/zanga-images/hero3.jpg'],
    },
    {
      id: 3,
      name: "ZANGA LABEL SINGLET",
      category: "Tops",
      colors: ["Black", "White", "Ashy"],
      fabric: "100% Cotton",
      fit: "Normal Fit",
      price: 15000,
      sizes: ["M", "L", "XL", "2XL"],
      stock: 15,
      description: "Essential comfort meets street style.",
      images: ['/zanga-images/singlet2.jpg', '/zanga-images/singlet1.jpg'],
    },
    {
      id: 4,
      name: "ZANGA LABEL THICK ARMLESS",
      category: "Tops",
      colors: ["Ash", "Black"],
      fabric: "100% Cotton",
      fit: "Normal Fit",
      price: 25000,
      sizes: ["M", "L", "XL", "2XL"],
      stock: 12,
      description: "Bold statement piece for the confident.",
      images: ['/zanga-images/armless1.jpg', '/zanga-images/armless2.jpg'],
    },
    {
      id: 5,
      name: "ZANGA LABEL BEANIE",
      category: "Headwear",
      colors: ["Black × Yellow", "White × Black", "Navy × White", "Black × White"],
      fabric: "100% Quality Knit Acrylic",
      fit: "Stretch-Fit | Unisex",
      originalPrice: 25000,
      price: 20000,
      sizes: ["One Size"],
      badge: "DOUBLE-SIDED",
      stock: 19,
      description: "Double-sided design: ZANGA front, LABEL back.",
      images: ['/zanga-images/beanie1.jpg', '/zanga-images/beanie2.jpg'],
    },
    {
      id: 6,
      name: "ZANGA LABEL TRUCKER CAP",
      category: "Caps",
      colors: ["White/Black", "Yellow/White"],
      fabric: "Embroidered front logo",
      fit: "Adjustable snapback fit",
      price: 35000,
      sizes: ["One Size"],
      badge: "REAL GUYS ONLY 👑",
      stock: 24,
      isLimited: true,
      description: "For the real ones who know quality.",
      images: ['/zanga-images/cap1.jpg', '/zanga-images/cap2.jpg'],
    }
  ];

  const categories = ["All", "Tops", "Headwear", "Caps"];
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color first!");
      return;
    }
    addToCart({
      ...selectedProduct,
      size: selectedSize,
      color: selectedColor
    });
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

  const handleQuickAddToCart = (product) => {
    setSelectedProduct(product);
  };

  return (
    <section id="products" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-lg px-6 py-2">
              PREMIUM COLLECTION
            </Badge>
            <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-yellow-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-yellow-400">
            STREET ROYALTY 🔥
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every piece tells a story. Every story builds a legacy. Welcome to the future of African streetwear.
          </p>
        </div>
      </div>

      {/* Enhanced Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category, index) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`transform transition-all duration-300 hover:scale-105 ${selectedCategory === category
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg'
              : 'hover:border-yellow-500 hover:text-yellow-500 hover:shadow-md'
              }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Filter className="w-4 h-4 mr-2" />
            {category}
          </Button>
        ))}
      </div>

      {/* Enhanced Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => {
          const countdown = useLiveCountdown(product.releaseDate);
          return (
            <Card
              key={product.id}
              className={`group hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'
                } shadow-xl hover:shadow-2xl transform hover:-translate-y-2`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
              }}
            >
              {/* Enhanced Badge System */}
              <div className="absolute top-3 left-3 z-20">
                <Badge className="bg-black text-yellow-500 font-bold shadow-lg">
                  ZANGA
                </Badge>
              </div>
              <div className="absolute top-3 right-3 z-20 space-y-2">
                {product.badge && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold block shadow-lg">
                    {product.badge}
                  </Badge>
                )}
                {product.isHot && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold flex items-center shadow-lg animate-pulse">
                    🔥 HOT
                  </Badge>
                )}
                {product.isLimited && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center shadow-lg">
                    <Timer className="w-3 h-3 mr-1" />
                    LIMITED
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                {/* 3D Flip Image Slider */}
                <div className="aspect-square mb-6 flip-container">
                  <div
                    className={`flip-card ${flippedIndex === index % 2 ? 'flipped' : ''}`}
                    style={{ height: '100%' }}
                  >
                    <img src={product.images[0]} alt={product.name} />
                    <img src={product.images[1]} alt={`${product.name} Alternate`} />
                  </div>
                </div>


                {/* Enhanced Product Info */}
                <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                  <h3 className="font-bold text-xl mb-3 hover:text-yellow-600 transition-colors group-hover:text-yellow-600">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Fabric:</strong> {product.fabric}</p>
                    <p className="text-sm"><strong>Fit:</strong> {product.fit}</p>
                  </div>
                  {/* Pricing */}
                  {!product.comingSoon && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                        {product.stock} in stock
                      </Badge>
                    </div>
                  )}

                </div>

                {/* Enhanced Add to Cart Button */}
                {product.comingSoon ? (
                  <div className="w-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 font-bold text-center py-4 rounded-xl shadow-md animate-pulse space-y-1">
                    🚧 Coming Soon – Stay Tuned!
                    {product.releaseDate && (
                      <div className="text-sm opacity-80 font-mono">
                        {countdown}
                      </div>
                    )}
                    <a
                      href="https://wa.me/2349017715919?text=I'm+interested+in+ZANGA+IMMORTAL+TOP+when+it+drops!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm font-medium underline text-yellow-700 hover:text-yellow-900 transition"
                    >
                      Notify Me on WhatsApp When It Drops
                    </a>
                  </div>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAddToCart(product);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    SELECT OPTIONS
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Modal for Full View */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                    {selectedProduct.name}
                    {selectedProduct.isHot && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                        🔥 HOT
                      </Badge>
                    )}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Full-size Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3">Product Details</h4>
                      <div className="space-y-2">
                        <p><strong>Fabric:</strong> {selectedProduct.fabric}</p>
                        <p><strong>Fit:</strong> {selectedProduct.fit}</p>
                        <p><strong>Stock:</strong> {selectedProduct.stock} items available</p>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProduct.description}</p>
                      </div>
                      {selectedProduct.originalPrice && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-green-600 font-semibold">
                            💰 Save ₦{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()}!
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Selection Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="color" className="text-sm font-semibold mb-3 block">
                          Select Color *
                        </Label>
                        <Select value={selectedColor} onValueChange={setSelectedColor}>
                          <SelectTrigger className="border-2 focus:border-yellow-500 h-12">
                            <SelectValue placeholder="Choose color" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProduct.colors.map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="size" className="text-sm font-semibold mb-3 block">
                          Select Size *
                        </Label>
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                          <SelectTrigger className="border-2 focus:border-yellow-500 h-12">
                            <SelectValue placeholder="Choose size" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProduct.sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* Price and Add to Cart */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Price</p>
                          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            ₦{selectedProduct.price.toLocaleString()}
                          </div>
                        </div>
                        <Button
                          onClick={handleAddToCart}
                          disabled={!selectedSize || !selectedColor}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          size="lg"
                        >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          ADD TO BAG 🔥
                        </Button>
                      </div>
                    </div>
                    {(!selectedSize || !selectedColor) && (
                      <p className="text-center text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        ⚠️ Please select both size and color to add to bag
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProductShowcase;