import { Image, Row, Space, Typography } from "antd";
import { FC } from "react";
import productJpg from "assets/images/jpg/product-1.jpg";
import "components/ItemOrder/style.scss";

type Props = {
  //   quantity: number;
  //   setQuantity: any;
};

const ItemOrder: FC<Props> = ({}) => {
  return (
    <Space
      style={{ marginBottom: "30px" }}
      size={20}
      className="item-order-container"
    >
      <Image src={productJpg} />
      <div>
        <Row style={{ marginBottom: "4px" }}>
          <Typography className="title">Supreme toys cooker</Typography>
        </Row>
        <Row>
          <Typography className="subTitle">Kitchenware Item</Typography>
        </Row>
        <Row
          justify={"space-between"}
          style={{ marginTop: "8px" }}
          align={"middle"}
        >
          <Typography className="cost">$250</Typography>
          <Space>
            <div className="quantityChangeBn">-</div>
            <Typography className="quantity">4</Typography>
            <div className="quantityChangeBn">+</div>
          </Space>
        </Row>
      </div>
    </Space>
  );
};

export default ItemOrder;
