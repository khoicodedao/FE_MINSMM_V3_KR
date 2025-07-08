type StepCardProps = {
  stepNumber: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon,
  title,
  description,
}) => {
  const isEvenStep = stepNumber % 2 === 0;

  return (
    <div>
      {stepNumber !== 1 && (
        <div className="mx-auto flex h-[80px] w-[2px] items-center bg-[#160B42]"></div>
      )}
      <div
        className={`relative flex items-center gap-10 p-6 ${
          isEvenStep ? "flex-row-reverse md:mr-[31.5%]" : "md:ml-[31.5%]"
        }`}
      >
        {/* Biểu tượng và số bước */}
        <div className="mb-2 hidden text-[#160B42] lg:block">{icon}</div>
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E4E1EE] text-2xl font-bold">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#160B42] text-white">
              {stepNumber}
            </div>
          </div>
        </div>
        <div className={`${isEvenStep ? "text-right" : "text-left"}`}>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-[#334E6E]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
