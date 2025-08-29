'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Respond to referrals in minutes',
  'Fill beds with quality referrals',
  'Reduce administrative burden',
  'Boost your revenue'
];

export default function BenefitCycler() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 pl-8">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center space-x-3">
                            <CheckCircle 
                    className={`h-5 w-5 flex-shrink-0 transition-colors duration-500 ${
                      index === activeIndex ? 'text-[#00B5E2]' : 'text-slate-400'
                    }`} 
                  />
          <span 
            className={`transition-colors duration-500 ${
              index === activeIndex ? 'text-slate-200' : 'text-slate-300'
            }`}
          >
            {benefit}
          </span>
        </div>
      ))}
    </div>
  );
}
