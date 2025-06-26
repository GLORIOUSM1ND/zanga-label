import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Sun, Moon, X, Menu } from 'lucide-react';
import OrderForm from './OrderForm';

const Navigation = ({ darkMode, toggleDarkMode, cart, removeFromCart, getTotalPrice }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        darkMode ? 'bg-gray-900/80 border-b border-gray-700' : 'bg-white/80 border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/zanga-images/zanga.jpg" 
                alt="ZANGA LABEL" 
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
              <a href="#products" className="hover:text-blue-500 transition-colors">Products</a>
              <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="#lookbook" className="hover:text-blue-500 transition-colors">Lookbook</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-yellow-500 text-black">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg h-screen overflow-y-auto">

                  <SheetHeader>
                    <SheetTitle>Your ZANGA Bag 🔥</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500">Your bag is empty. Time to shop! 🛍️</p>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
                                <p className="font-bold">₦{item.price.toLocaleString()}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>₦{getTotalPrice().toLocaleString()}</span>
                        </div>

                        <div className="pb-24">
  <OrderForm cart={cart} totalPrice={getTotalPrice()} />
</div>

                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <a href="#home" className="block text-lg hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#products" className="block text-lg hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#about" className="block text-lg hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#lookbook" className="block text-lg hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Lookbook</a>
            <a href="#contact" className="block text-lg hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;
