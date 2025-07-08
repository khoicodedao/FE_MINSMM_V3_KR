import React from "react";

const BoxContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 sm:px-6">
      {children}
    </div>
  );
};

export default BoxContainer;
