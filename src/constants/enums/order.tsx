enum ORDER_STATUS {
  all_value = 0,
  await_value = 1,
  pending_value = 2,
  progress_value = 3,
  completed_value = 4,
  partial_value = 5,
  processing_value = 6,
  canceled_value = 7,
  failed_value = 8,
  error_value = 9,
  all_label = 'All',
  await_label = "Awaiting",
  pending_label = "Pending",
  progress_label = "In progress",
  completed_label = "Completed",
  partial_label = "Partial",
  processing_label = "Processing",
  canceled_label = "Canceled",
  failed_label = "Failed",
  error_label = "Error",
}

export { ORDER_STATUS };
