import React from 'react';

const ShippingTimeline = () => {
  const activities = [
    {
      type: 'Return',
      description: "You returned this order because you don't want the item anymore.",
      date: 'Fri, 15th Dec',
      additionalInfo: null
    },
    {
      type: 'Refund',
      description: 'Processed by hubeco.',
      date: 'Mon, 1st Jan',
      additionalInfo: 'Expected by Jan 01'
    }
  ];

  return (
    <div className="w-full mx-auto p-6 my-5 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Shipping activity</h2>
      
      <div className="relative">
        {activities.map((activity, index) => (
          <div key={index} className="flex mb-8 last:mb-0">
            {/* Timeline line */}
            {index !== activities.length - 1 && (
              <div className="absolute h-full w-px bg-gray-200 left-2.5 top-3 z-0" />
            )}
            
            {/* Activity dot */}
            <div className="relative z-10">
              <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            
            {/* Activity content */}
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.type}</h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  {activity.additionalInfo && (
                    <p className="text-sm text-gray-500 mt-1">{activity.additionalInfo}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingTimeline;