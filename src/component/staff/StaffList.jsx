import React from 'react';
import StaffCard from './Staff';

const staffList = [
  {
    name: "Sanath Somapala",
    role: "Loan Officer",
    assignment: "Assigned: Colombo Region",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    phone:"Phone: 047-463421"
  },
  {
    name: "Kasun Kalu Arachchi",
    role: "Rider",
    assignment: "Assigned: Kottawa Block-A",
    imageUrl: "https://images.unsplash.com/photo-1608391957733-08caeb461b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    phone:"Phone: 071-563421"
  },
  {
    name: "Sadun Gunasekara",
    role: "Rider",
    assignment: "Assigned: Maharagama Pamunuwa",
    imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    phone:"Phone: 071-462221"
  },
  {
    name: "Rashmika Dhanushan",
    role: "Rider",
    assignment: "Assigned: Kadawatha",
    imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    phone:"Phone: 077-163421"
  },
  {
    name: "Rashmika Dhanushan",
    role: "Rider",
    assignment: "Assigned: Kadawatha",
    imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    phone:"Phone: 077-163421"
  },
  
  
];

const StaffPage = () => {
  return (
    <div className="min-h-screen px-6 py-12 text-white bg-black relative overflow-hidden">
  
      {/* Heading and Paragraph */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
          Meet Our Dedicated Loan Agents
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Our experienced staff is always ready to help you with your loan journey.
          From processing new applications to collecting payments, they ensure
          smooth service delivery every day.
        </p>
      </div>

      {/* Staff Cards */}
      <div className="flex flex-wrap gap-6 ml-32">
        {staffList.map((staff, index) => (
          <StaffCard key={index} {...staff} />
        ))}
      </div>
    </div>
  );
};

export default StaffPage;