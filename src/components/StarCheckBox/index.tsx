import React, { useState } from "react";
import 'components/StarCheckBox/style.scss'
import { Input } from "antd";

const StarCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="star-checkbox-container">
      <Input
        type="checkbox"
        id="star"
        className="star-input"
        checked={isChecked}
        onChange={handleClick} // Handle the click event
      />
      <label htmlFor="star" className="star-label"></label>
    </div>
  );
};

export default StarCheckBox;