import BannerSection from "../../../../components/Container/BannerSection";

import {
  UserAddOutlined,
  DollarOutlined,
  SettingOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import StepCard from "components/Card/StepCard";

const SugStepSection = () => {
  const steps = [
    {
      stepNumber: 1,
      icon: <UserAddOutlined style={{ fontSize: "40px" }} />,
      title: "Create an account",
      description: "Start with registering on our panel and logging in.",
    },
    {
      stepNumber: 2,
      icon: <DollarOutlined style={{ fontSize: "42px" }} />,
      title: "Make a deposit",
      description:
        "Pick the most suitable payment option & add funds to your account.",
    },
    {
      stepNumber: 3,
      icon: <SettingOutlined style={{ fontSize: "42px" }} />,
      title: "Choose a service",
      description:
        "See the list of our SMM services and place your orders on our panel.",
    },
    {
      stepNumber: 4,
      icon: <LikeOutlined style={{ fontSize: "42px" }} />,
      title: "Enjoy fast results",
      description:
        "Once your order is complete, enjoy the growth of your social media account.",
    },
  ];

  return (
    <div className="">
      <BannerSection
        title="Where to begin?"
        des="Give your business a new height following these 4 easy steps."
      />
      <div className="mx-auto my-20 flex flex-col">
        {steps.map((step) => (
          <StepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SugStepSection;
