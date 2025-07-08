import { ORDER_STATUS } from "constants/enums";

const ConvertOrderStatus = (value: number) => {
  switch (value) {
    case ORDER_STATUS.all_value:
      return ORDER_STATUS.all_label;
    case ORDER_STATUS.await_value:
      return ORDER_STATUS.await_label;
    case ORDER_STATUS.pending_value:
      return ORDER_STATUS.pending_label;
    case ORDER_STATUS.progress_value:
      return ORDER_STATUS.progress_label;
    case ORDER_STATUS.completed_value:
      return ORDER_STATUS.completed_label;
    case ORDER_STATUS.partial_value:
      return ORDER_STATUS.partial_label;
    case ORDER_STATUS.processing_value:
      return ORDER_STATUS.processing_label;
    case ORDER_STATUS.canceled_value:
      return ORDER_STATUS.canceled_label;
    case ORDER_STATUS.failed_value:
      return ORDER_STATUS.failed_label;
    case ORDER_STATUS.error_value:
      return ORDER_STATUS.error_label;
    default:
      return "";
  }
};

export { ConvertOrderStatus };
