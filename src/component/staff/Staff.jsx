import React from 'react';

const StaffCard = ({ name, role, assignment, phone, imageUrl }) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-72 transform hover:scale-105 filter grayscale hover:filter-none hover:text-white transition-all duration-500">
      <div className="overflow-hidden rounded-full w-24 h-24 mx-auto mb-4">
        <img
          src={imageUrl || "/images/default-profile.png"}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-green-400 text-center">{role}</p>
      <p className="text-sm text-gray-400 text-center mt-1">{phone}</p>
      <p className="text-sm text-gray-300 text-center mt-2">{assignment}</p>
      
    </div>
  );
};

export default StaffCard;
