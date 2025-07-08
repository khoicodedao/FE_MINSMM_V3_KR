export const PAYMENT_STATUS_OPTIONS = [
    {text: "Waiting", value: 0},
    {text: "Completed", value: 1},
    {text: "Pending", value: 2},
    {text: "Fail", value: 3},
    {text: "Expired", value: 4},
    {text: "Hold", value: 5},
    {text: "Underpaid", value: 6},
];

export const PAYMENT_MODE_OPTIONS = [
    {text: "Manual", value: 0},
    {text: "Auto", value: 1},
];

export const convertStatus = (status: number): string => {
    const foundStatus = PAYMENT_STATUS_OPTIONS.find((option) => option.value === status);
    return foundStatus ? foundStatus.text : 'Unknown';
};

export const convertMode = (mode: number): string => {
    const foundMode = PAYMENT_MODE_OPTIONS.find((option) => option.value === mode);
    return foundMode ? foundMode.text : 'Unknown';
};
