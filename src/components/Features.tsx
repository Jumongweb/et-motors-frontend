
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield, TrendingUp, Users, Car, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm matches buyers with their perfect car based on preferences, budget, and lifestyle.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Blockchain-verified history, escrow payments, and comprehensive buyer protection for complete peace of mind.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Smart Pricing",
      description: "Real-time market analytics and price predictions help both buyers and sellers make informed decisions.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Verified Dealers",
      description: "All dealers go through rigorous verification to ensure you're dealing with trusted professionals only.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Car,
      title: "Virtual Showroom",
      description: "Experience cars like never before with 360° tours, AR visualization, and detailed inspection reports.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "Dedicated customer success team available 24/7 to assist with your buying or selling journey.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white/50 to-blue-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Features That Drive Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to buy or sell cars with confidence, powered by cutting-edge technology and human expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-8">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
