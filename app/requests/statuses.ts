export const PENDING_STATUS = 'pending';
export const REJECTED_STATUS = 'rejected';
export const APPROVED_STATUS = 'approved';

export const requestStatuses = [
  { value: "pending", label: "Pending", color: "#ffbe00" },
  { value: "rejected", label: "Reject", color: "#ff5861" },
  { value: "approved", label: "Approved", color: "#00a96e" },
];

export function getStatus(value: any) {
  if(!value){
    return ;
  }
  
  const request_status = requestStatuses.find((status: any) => {
    return status.value == value;
  });

  return request_status;
}