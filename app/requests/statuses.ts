export const requestStatuses = [
  { value: "pending", label: "Pending", color: "warning" },
  { value: "rejected", label: "Reject", color: "error" },
  { value: "approved", label: "Approved", color: "success" },
];

export function getPendingStatus() {
    const pending_status = requestStatuses.find((status: any) => {
      return status.value == "pending";
    });
  
    return pending_status;
  }