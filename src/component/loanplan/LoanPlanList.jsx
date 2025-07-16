import LoanPlanCard from './LoanPlan';
import { Sparkles } from 'lucide-react';

export default function LoanPlans() {
  const plans = [
    {
      name: "Starter Plan",
      amount: "25,000",
      duration: "30 Days",
      interest: "5%",
      description: "Perfect for first-time borrowers needing quick short-term support."
    },
    {
      name: "Business Boost",
      amount: "50,000",
      duration: "60 Days",
      interest: "8%",
      description: "Ideal for small business owners looking to scale operations."
    },
    {
      name: "Premium Flexi",
      amount: "100,000",
      duration: "90 Days",
      interest: "10%",
      description: "Designed for high-value clients with flexible repayment options."
    }
  ];

  return (
    <section className="relative py-20 px-6 sm:px-10  text-white overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-green-500 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-20 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
          Find the Loan Plan That Fits You
        </h1>
        
        <div className="flex justify-center items-center mb-4 text-emerald-300">
          <Sparkles size={24} className="mr-2" />
          <p className="text-lg font-medium">Flexible. Fast. Tailored to You.</p>
        </div>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Whether you're starting small or aiming high, our loan plans adapt to your pace and purpose. 
          Enjoy transparent terms, instant tracking, and personal support — all in one place.
        </p>

        {/* Loan Cards */}
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4">
          {plans.map((plan, index) => (
            <LoanPlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
