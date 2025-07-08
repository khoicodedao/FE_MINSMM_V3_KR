// components/AskSection.tsx
import React from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import BannerSection from "components/Container/BannerSection";

const AskSection: React.FC = () => {
  const panelStyle: React.CSSProperties = {
    borderRadius: "14px",
    border: "none",
  };

  const items = [
    {
      key: "1",
      label: "What exactly is an SMM panel?",
      content:
        "An SMM panel is an online shop that you can visit to purchase SMM services at great prices.",
    },
    {
      key: "2",
      label: "What types of SMM services do you sell on your panel?",
      content:
        "We sell various types of SMM services, including followers, likes, views, and more.",
    },
    {
      key: "3",
      label: "Is it safe to buy SMM services on this panel?",
      content: "Yes, it is completely safe to buy SMM services on our panel.",
    },
    {
      key: "4",
      label: 'What does "mass order" mean?',
      content:
        "Mass order allows you to place multiple orders at once, saving you time and effort.",
    },
    {
      key: "5",
      label: 'What does "Drip-feed" mean?',
      content:
        "Drip-feed is a service that helps you grow your account at your desired speed, gradually.",
    },
    {
      key: "6",
      label: "Mass orders — what are they?",
      content:
        "Mass orders refer to the ability to place a large number of orders simultaneously.",
    },
  ];

  return (
    <div className="">
      <BannerSection
        color="text-white"
        title="Most Asked Questions"
        des="Our staff picked some of the most asked questions about SMM panels and replied to them."
      />
      <div className="mt-20">
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) =>
            isActive ? (
              <MinusCircleOutlined
                style={{ fontSize: "20px" }}
                className="absolute right-6 top-3.5"
              />
            ) : (
              <PlusCircleOutlined
                style={{ fontSize: "20px" }}
                className="absolute right-6 top-3.5"
              />
            )
          }
          className="grid grid-cols-1 gap-8 bg-transparent lg:grid-cols-2"
          style={{ background: "transparent" }}
        >
          {items.map((item) => (
            <Collapse.Panel
              key={item.key}
              header={
                <span className="w-fit text-[14px] font-bold text-[#334E6E]">
                  {item.label}
                </span>
              }
              className="h-fit bg-white py-2 pr-2 lg:w-[450px] xl:w-[550px]"
              style={panelStyle}
            >
              <p className="pl-3 text-[#334E6E]">{item.content}</p>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default AskSection;
