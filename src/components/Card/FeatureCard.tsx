// components/Card.tsx
import React from "react";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-[14px] rounded-lg p-6 flex flex-row items-center text-[#334E6E]">
      <div className="bg-white rounded-2xl mb-4 size-20 min-h-20 min-w-20 text-[#334E6E] flex items-center justify-center text-4xl">
        {icon}
      </div>
      <div className="flex flex-col items-start pl-6 -mt-4">
        <h4 className="font-semibold text-[16px] mb-2">{title}</h4>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
