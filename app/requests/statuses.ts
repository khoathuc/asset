export const requestStatuses = [
  { value: "pending", label: "Pending", color: "#ffbe00" },
  { value: "rejected", label: "Reject", color: "#ff5861" },
  { value: "approved", label: "Approved", color: "#00a96e" },
];

export function getPendingStatus() {
  const pending_status = requestStatuses.find((status: any) => {
    return status.value == "pending";
  });

  return pending_status;
}
