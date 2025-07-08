import { Button, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import Icons from "assets/icons";
import {
  TrashRedSVG,
  EditSVG,
  BlueEyeSVG,
  GreenEyeSVG,
  EditDisableSVG,
} from "assets/images";
import { EyeOutlined } from "@ant-design/icons";
import { RetweetOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/es/tooltip";
import "./style.scss";

type Props = {
  editFunction?: any;
  substractFunction?: any;
  removeFunction?: any;
  downloadFunction?: any;
  viewFunction?: any;
  viewBlueFunction?: any;
  viewGreenFunction?: any;
  disable?: any;
  downloading?: boolean;
  downloadTooltip?: string;
  removePopupPlacement?: TooltipPlacement;
  reviseFunction?: any;
};

const ListButtonActionUpdate: React.FC<Props> = ({
  substractFunction,
  downloadFunction,
  editFunction,
  removeFunction,
  viewFunction,
  viewBlueFunction,
  viewGreenFunction,
  downloading,
  disable = false,
  downloadTooltip,
  removePopupPlacement = "top",
  reviseFunction,
}) => {
  const [openPopconfirm, setOpenPopconfirm] = useState({
    confirmSubtract: false,
    confirmRemove: false,
  });

  return (
    <Space size={"small"}>
      {removeFunction ? (
        <Popconfirm
          className="danger-confirm"
          title="Bạn muốn xóa?"
          placement={removePopupPlacement}
          onConfirm={() => {
            removeFunction();
            setOpenPopconfirm({ ...openPopconfirm, confirmRemove: false });
          }}
          disabled={disable}
        >
          <Button
            icon={<TrashRedSVG />}
            danger
            size="small"
            onClick={() =>
              setOpenPopconfirm({ ...openPopconfirm, confirmRemove: true })
            }
            type="text"
            disabled={disable}
            className="disabled-delete"
          />
        </Popconfirm>
      ) : null}
      {editFunction ? (
        <Tooltip title="Chỉnh sửa">
          <Button
            icon={<EditSVG />}
            size="small"
            onClick={editFunction}
            type="text"
            disabled={disable}
            className="disabled"
          />
        </Tooltip>
      ) : null}
      {downloadFunction ? (
        <Tooltip title={downloadTooltip}>
          <Button
            icon={<Icons.download />}
            onClick={downloadFunction}
            loading={downloading ?? false}
            type="text"
            size="small"
            disabled={disable}
          />
        </Tooltip>
      ) : null}
      {substractFunction ? (
        <Popconfirm
          className="danger-confirm"
          title="Bạn muốn xóa?"
          placement={removePopupPlacement}
          onConfirm={() => {
            substractFunction();
            setOpenPopconfirm({ ...openPopconfirm, confirmSubtract: false });
          }}
        >
          <Button
            icon={<Icons.sub />}
            danger
            size="small"
            onClick={() =>
              setOpenPopconfirm({ ...openPopconfirm, confirmSubtract: true })
            }
            type="primary"
          />
        </Popconfirm>
      ) : null}
      {viewFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewFunction}
          icon={<EyeOutlined />}
        />
      ) : null}
      {viewBlueFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewBlueFunction}
          icon={<BlueEyeSVG />}
        />
      ) : null}
      {viewGreenFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewGreenFunction}
          icon={<GreenEyeSVG />}
        />
      ) : null}
      {reviseFunction ? (
        <Tooltip title = "Gửi duyệt lại">
          <Button
            type="text"
            size="small"
            onClick={reviseFunction}
            icon={<RetweetOutlined />}
          />
        </Tooltip>
      ) : null}
    </Space>
  );
};

export default ListButtonActionUpdate;
