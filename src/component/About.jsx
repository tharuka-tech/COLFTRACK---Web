import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  HandCoins,
  Clock,
  Smartphone,
  Eye 
} from 'lucide-react';
import mobileImg from '../assets/mobile2.png';

export default function AboutUs() {
  const features = [
    {
      title: 'Daily Tracking Made Easy',
      icon: <Clock className="text-green-400" size={24} />,
      desc: 'Real-time updates on your loan status and payments',
    },
    {
      title: 'Flexible Loan Plans',
      icon: <HandCoins className="text-green-400" size={24} />,
      desc: 'Customized repayment options tailored to your income',
    },
    {
      title: 'Trusted Field Agents',
      icon: <ShieldCheck className="text-green-400" size={24} />,
      desc: 'Our certified riders provide personal assistance',
    },
    {
      title: 'Customer Portal',
      icon: <Smartphone className="text-green-400" size={24} />,
      desc: '24/7 access to your account from any device',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Customers' },
    { value: '98%', label: 'Repayment Rate' },
    { value: '24/7', label: 'Support Available' },
    { value: '100%', label: 'Transparent Process' },
  ];

  return (
    <section className="text-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto">
        {/* Intro Text */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Empowering <span className="text-green-400">Daily Progress</span> Through Smarter Lending
          </h1>
          <div className="max-w-3xl mx-auto">
           
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            "https://images.unsplash.com/photo-1591637305338-647472624b6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJpa2UlMjByaWRlcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://img.freepik.com/premium-photo/portrait-latin-telephone-operator-standing-with-headset_146105-93469.jpg?uid=R150368863&ga=GA1.1.560078233.1707627766&semt=ais_hybrid&w=740",
            mobileImg,
            "https://img.freepik.com/premium-photo/image-st-patrick-s-day-style-fluid-gestures_118124-81462.jpg?uid=R150368863&ga=GA1.1.560078233.1707627766&semt=ais_hybrid&w=740"
          ].map((img, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl h-160">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {['Field Agent', '24/7 Customer Support', ' Mobile App', 'Flexible Loan Plan'][index]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why <span className="text-green-400">COLFTRACK</span> Stands Out
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Unlike traditional lenders, we combine the personal touch of community banking with 
              cutting-edge technology to create a seamless borrowing experience.
            </p>

    
             <p className="text-lg text-gray-300 leading-relaxed mb-10">
              Our mission is to make financial growth accessible through daily tracking, flexible plans, 
              and a network of trusted field agents - all managed through our secure digital platforms.
            </p>

            {/* Replacing Button with Key Values */}
            <ul className="space-y-4">
              {[
                { icon: <ShieldCheck className="text-green-400" size={20} />, text: "Secure & Transparent Lending" },
                { icon: <HandCoins className="text-green-400" size={20} />, text: "Community-Centered Approach" },
                { icon: <Clock className="text-green-400" size={20} />, text: "Real-Time Payment Tracking" },
                { icon: <Eye className="text-green-400" size={20} />, text: "Know Your Money. Anytime. Anywhere" },

              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-3">{item.icon}</div>
                  <span className="text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-800 p-5 rounded-xl hover:bg-gray-700 transition-all"
              >
                <div className="p-2 bg-gray-700 rounded-lg mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-400 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all"
            >
              <div className="text-3xl font-bold text-green-400">{stat.value}</div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
