
import { TrendingUp, Users, Car, Shield } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Car,
      value: "50,000+",
      label: "Cars Listed",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Trusted Dealers",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      value: "$2.8B+",
      label: "Transactions",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Success Rate",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
