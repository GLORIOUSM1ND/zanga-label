
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler } from 'lucide-react';

const SizeGuide = ({ darkMode }) => {
  const sizeCharts = {
    tops: [
      { size: "M", chest: "38-40", length: "26", shoulder: "17" },
      { size: "L", chest: "40-42", length: "27", shoulder: "18" },
      { size: "XL", chest: "42-44", length: "28", shoulder: "19" },
      { size: "2XL", chest: "44-46", length: "29", shoulder: "20" }
    ],
    fits: [
      {
        name: "Clean Cut",
        description: "Tailored fit that hugs your frame perfectly. Sharp, professional, and confident.",
        icon: "✂️"
      },
      {
        name: "Smart Fit",
        description: "Balanced between fitted and relaxed. Perfect for versatile styling.",
        icon: "🎯"
      },
      {
        name: "Normal Fit",
        description: "Classic comfortable fit with room to move. Timeless and reliable.",
        icon: "👕"
      }
    ]
  };

  return (
    <section id="size-guide" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-500 text-white font-bold mb-6 text-lg px-6 py-2">
            <Ruler className="w-4 h-4 mr-2" />
            SIZE GUIDE
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Fit
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Because great style starts with the right fit. Here's everything you need to know.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Size Chart */}
          <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                📏 Size Chart (Inches)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-center">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 font-bold">Size</th>
                      <th className="py-3 px-4 font-bold">Chest</th>
                      <th className="py-3 px-4 font-bold">Length</th>
                      <th className="py-3 px-4 font-bold">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeCharts.tops.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-semibold text-yellow-600">{row.size}</td>
                        <td className="py-3 px-4">{row.chest}</td>
                        <td className="py-3 px-4">{row.length}</td>
                        <td className="py-3 px-4">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-center font-medium">
                  <strong>Pro Tip:</strong> Measure yourself while wearing a light shirt for the most accurate fit!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fit Types */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-8">
              🎯 Understanding Our Fits
            </h3>
            
            {sizeCharts.fits.map((fit, index) => (
              <Card key={index} className={`group hover:scale-105 transition-all duration-300 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{fit.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                        {fit.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {fit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Measurement Guide */}
            <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-4 text-center">
                  📐 How to Measure
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Chest:</span>
                    <span>Around the fullest part of your chest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Length:</span>
                    <span>From highest point of shoulder to hem</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Shoulder:</span>
                    <span>From shoulder point to shoulder point</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Notes */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className={`text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <CardContent className="p-6">
                <div className="text-2xl mb-3">🧵</div>
                <h4 className="font-bold mb-2">Premium Fabric</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All our pieces are pre-shrunk and maintain their fit after washing.
                </p>
              </CardContent>
            </Card>

            <Card className={`text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <CardContent className="p-6">
                <div className="text-2xl mb-3">🔄</div>
                <h4 className="font-bold mb-2">Easy Returns</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Not happy with the fit? We'll help you get it right.
                </p>
              </CardContent>
            </Card>

            <Card className={`text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <CardContent className="p-6">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hit us up on WhatsApp for personalized sizing advice!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
