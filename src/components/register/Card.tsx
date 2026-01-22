import React from 'react';

const Card = ({ title, subtitle, icon }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-brown">{subtitle}</p>
    </div>
  );
};

export default Card;