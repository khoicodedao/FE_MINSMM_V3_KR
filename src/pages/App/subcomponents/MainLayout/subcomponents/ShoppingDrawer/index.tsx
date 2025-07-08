import { FC } from "react";
import { Drawer, Row, Typography } from "antd";
import ItemOrder from "components/ItemOrder";
import "pages/App/subcomponents/MainLayout/subcomponents/ShoppingDrawer/style.scss";

type Props = {
  isOpenCart: boolean;
  closeCart: any;
};

const ShoppingDrawer: FC<Props> = ({ isOpenCart, closeCart }) => {
  return (
    <div className="shopping-infor-container">
      <Drawer width={330} closeIcon={false} open={isOpenCart} onClose={closeCart}>
        <Row justify={'space-between'} className="title-container">
            <Typography className="title-cart">Shopping Cart</Typography>
            <div className="item-count-container">5 new</div>
        </Row>
        <ItemOrder />
        <ItemOrder />
        <ItemOrder />
        <ItemOrder />
        <Row justify={'space-between'} style={{marginBottom: '30px'}}>
            <Typography className="costLabel">Sub total</Typography>
            <Typography className="costText">USD $2530</Typography>
        </Row>
        <Row justify={'space-between'} style={{marginBottom: '30px'}}>
            <Typography className="costLabel">Total</Typography>
            <Typography className="costText">USD $2530</Typography>
        </Row>
      </Drawer>
    </div>
  );
};

export default ShoppingDrawer;
