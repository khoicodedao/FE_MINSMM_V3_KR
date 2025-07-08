import React from "react";
import "components/IdContainer/style.scss";

type Props = {
  value: number | string;
};

const IdContainer: React.FC<Props> = ({ value }) => {
  return <div className="id-contaier">{value}</div>;
};

export default IdContainer;
