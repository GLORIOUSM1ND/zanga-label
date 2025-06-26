import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, MapPin, User, Phone, MessageCircle, Copy, CheckCircle, ShoppingBag, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const OrderForm = ({ cart, totalPrice }) => {
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: ''
  });
  const [copiedAccount, setCopiedAccount] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyToClipboard = (text, accountType) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountType);
    setTimeout(() => setCopiedAccount(null), 2000);
    toast({
      title: "Copied! 📋",
      description: `${accountType} account number copied to clipboard`,
    });
  };

  const validateStep1 = () => {
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'state'];
    const missingFields = requiredFields.filter(field => !customerInfo[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information ⚠️",
        description: "Please fill in all required fields to proceed.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const generateWhatsAppMessage = () => {
    const orderSummary = cart.map(item => 
      `• ${item.name} (${item.color} - ${item.size}) - ₦${item.price.toLocaleString()}`
    ).join('\n');

    const message = `🔥 NEW ZANGA ORDER 🔥

📦 ORDER DETAILS:
${orderSummary}

💰 TOTAL: ₦${totalPrice.toLocaleString()}

👤 CUSTOMER INFO:
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

📍 DELIVERY ADDRESS:
${customerInfo.address}
${customerInfo.city}, ${customerInfo.state}

💳 PAYMENT MADE TO:
${copiedAccount === 'OPay' ? 'OPay Digital Services Limited' : 'ALAT/WEMA Bank'}
Account: ${copiedAccount === 'OPay' ? '9168138583' : '0289897160'}

✅ I HAVE MADE THE PAYMENT
Please find my payment proof attached below:

[Upload your payment screenshot here]

Thank you for choosing ZANGA LABEL! 🙌`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = () => {
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/2349017715919?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Order Sent! 🚀",
      description: "Your order has been sent via WhatsApp. Please upload your payment proof to complete the process.",
    });
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[
          { num: 1, label: "Details", icon: User },
          { num: 2, label: "Payment", icon: CreditCard },
          { num: 3, label: "Complete", icon: MessageCircle }
        ].map((stepItem, index) => (
          <div key={stepItem.num} className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              step >= stepItem.num 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              <stepItem.icon className="w-5 h-5" />
            </div>
            <span className={`ml-2 font-medium ${step >= stepItem.num ? 'text-yellow-600' : 'text-gray-500'}`}>
              {stepItem.label}
            </span>
            {index < 2 && (
              <div className={`w-8 h-1 mx-4 rounded ${
                step > stepItem.num ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Customer Information */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          {/* Order Summary */}
          <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ShoppingBag className="w-6 h-6 mr-2 text-yellow-600" />
                Your ZANGA Bag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.color} • {item.size}
                      </p>
                    </div>
                    <p className="font-semibold text-lg text-yellow-600">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span className="text-yellow-600">₦{totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="w-6 h-6 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={customerInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-2 focus:border-yellow-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="e.g., +234 901 234 5678"
                    className="h-12 border-2 focus:border-yellow-500"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold mb-2 block">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="h-12 border-2 focus:border-yellow-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="w-6 h-6 mr-2" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="address" className="text-sm font-semibold mb-2 block">Street Address *</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                  className="border-2 focus:border-yellow-500 min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="text-sm font-semibold mb-2 block">City *</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g., Lagos"
                    className="h-12 border-2 focus:border-yellow-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-semibold mb-2 block">State *</Label>
                  <Input
                    id="state"
                    value={customerInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="e.g., Lagos State"
                    className="h-12 border-2 focus:border-yellow-500"
                    required
                  />
                </div>
              </div>
              
              {/* Shop Address */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold mb-3 flex items-center text-blue-800">
                  🏪 ZANGA LABEL Shop Address
                </h4>
                <div className="text-sm text-blue-700">
                  <p><strong>Address:</strong> No 8 Showunmi Street, Iyanaiyesi Adoodo, Ota, Ogun State</p>
                  <p className="mt-2 text-xs">Visit us for in-person shopping and fittings!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Continue to Payment <Zap className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Payment Information */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CreditCard className="w-6 h-6 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* OPay Option */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 text-white font-bold">RECOMMENDED</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl text-green-800">💚 OPay (Instant Transfer)</h4>
                  </div>
                  <div className="space-y-3 text-sm text-green-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Bank:</strong> OPay Digital Services Limited</p>
                        <p><strong>Account Name:</strong> DAMILARE OLUSOJI OLADIPUPO</p>
                      </div>
                      <div className="flex items-center justify-between bg-green-100 p-4 rounded-lg">
                        <div>
                          <p className="text-xs text-green-600 mb-1">Account Number</p>
                          <p className="font-bold text-lg text-green-800">9168138583</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard('9168138583', 'OPay')}
                          className="h-10 px-3 bg-green-200 hover:bg-green-300"
                        >
                          {copiedAccount === 'OPay' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs mt-3 bg-green-200 p-2 rounded">
                      ✅ Fast transfers, instant confirmation, lowest fees
                    </p>
                  </div>
                </div>

                {/* ALAT/WEMA Option */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl text-blue-800">🏦 ALAT/WEMA Bank</h4>
                    <Badge variant="outline" className="border-blue-500 text-blue-600">ALTERNATIVE</Badge>
                  </div>
                  <div className="space-y-3 text-sm text-blue-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Bank:</strong> ALAT/WEMA Bank</p>
                        <p><strong>Account Name:</strong> DAMILARE OLUSOJI OLADIPUPO</p>
                      </div>
                      <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                        <div>
                          <p className="text-xs text-blue-600 mb-1">Account Number</p>
                          <p className="font-bold text-lg text-blue-800">0289897160</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard('0289897160', 'ALAT')}
                          className="h-10 px-3 bg-blue-200 hover:bg-blue-300"
                        >
                          {copiedAccount === 'ALAT' ? (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-yellow-300 text-center">
                  <p className="text-sm text-yellow-800 mb-2">Total Amount to Pay</p>
                  <p className="text-4xl font-bold text-yellow-600 mb-2">₦{totalPrice.toLocaleString()}</p>
                  <p className="text-xs text-yellow-700">Please ensure exact amount is transferred</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mt-6">
                <h4 className="font-bold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Next Steps:
                </h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Make payment to any of the accounts above</li>
                  <li>Take a screenshot of your payment receipt</li>
                  <li>Click "I HAVE PAID" below</li>
                  <li>Upload your payment proof on WhatsApp</li>
                  <li>We'll confirm and ship your order! 🚀</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="flex-1 py-4 text-lg"
            >
              Back to Details
            </Button>
            <Button
              onClick={handleSubmitOrder}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              I HAVE PAID - SEND ORDER 🔥
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              By clicking the button above, your order details will be sent to our WhatsApp for processing.
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
              <span className="flex items-center">🔒 Secure Payment</span>
              <span className="flex items-center">📞 24/7 Support</span>
              <span className="flex items-center">🚚 Fast Delivery</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
