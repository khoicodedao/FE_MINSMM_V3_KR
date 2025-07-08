import BannerSection from "../../../../components/Container/BannerSection";
import FeatureCard from "components/Card/FeatureCard";

import {
  FileFilled,
  LikeFilled,
  PayCircleFilled,
  TruckFilled,
} from "@ant-design/icons";

const FeatureSection = () => {
  const cards = [
    {
      icon: <LikeFilled />,
      title: "High quality",
      description: "The highest quality SMM services to meet your needs.",
    },
    {
      icon: <FileFilled />,
      title: "Incredible prices",
      description: "SMM services on our panel are unbelievably cheap.",
    },
    {
      icon: <PayCircleFilled />,
      title: "Numerous payment options",
      description: "Choose a payment method that works best for you.",
    },
    {
      icon: <TruckFilled />,
      title: "Fast delivery",
      description: "You will be surprised at how quick our order delivery is.",
    },
  ];

  return (
    <div className="">
      <BannerSection
        title="Why order SMM services from us?"
        des="Let us help you build your online presence quickly and efficiently."
      />
      <div className="pb-[135px] pt-[65px]">
        <div className="grid grid-cols-1 gap-x-20 gap-y-6 lg:grid-cols-2">
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
