// components/ReviewSection.tsx
import ReviewCard from "components/Card/ReviewCard";
import BannerSection from "components/Container/BannerSection";
import React from "react";

const ReviewSection = () => {
  const reviews = [
    {
      content:
        "I’ve tried quite a few ways to help my accounts grow, and so far this one works best for me! You don’t have to spend a lot of money at all because everything is so cheap here. But also it’s really cool how you get the results you want so quickly.",
      author: "Juliana Diaz",
    },
    {
      content:
        "If you’re wondering how you can help your social media accounts get more attention fast, this is it! No need to wait for a long time either because SMM services on this panel are delivered super quickly. The services are sooo cheap too.",
      author: "Kelly Newsom",
    },
    {
      content:
        "SMM specialists constantly look for ways to make their jobs easier and THIS IS IT, GUYS! This SMM panel will make your job run smoothly. I’m telling you. Services here are so cheap that you will be blown away.",
      author: "Reese Owens",
    },
    {
      content:
        "I can only speak from my experience but let me tell you this: you can’t go wrong with this SMM panel. Great services that are so cheap!",
      author: "Anika Bhagat",
    },
  ];

  return (
    <div className="relative grid w-full gap-16 bg-[#E9E7F1] px-6 py-16 lg:grid-cols-12 xl:px-0">
      <div className="z-4 h-fit lg:col-span-4">
        <div className="z-4 flex h-fit flex-col gap-4 text-[#334E6E]">
          <h3 className="z-4 text-[31.5px] font-bold">
            Success stories of our customers
          </h3>
          <h4 className="text-[14px]">
            Learn how our panel helped our customers build online engagement.
          </h4>
        </div>
      </div>

      {/* Các review của khách hàng */}
      <div className="z-10 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:col-span-8">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            content={review.content}
            author={review.author}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
