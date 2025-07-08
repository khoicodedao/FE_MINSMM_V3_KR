const BannerSection = ({
  color = "text-[#334E6E]",
  title,
  des,
}: {
  color?: string;
  title: string;
  des: string;
}) => {
  return (
    <div className={`${color} flex flex-col gap-4 pb-2 sm:pb-[15px] pt-16 sm:pt-[108px]`}>
      <h3 className="text-center text-[31.5px] font-bold">{title}</h3>
      <h4 className="text-center text-[14px]">{des}</h4>
    </div>
  );
};

export default BannerSection;
