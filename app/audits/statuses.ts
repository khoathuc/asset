export const OPEN_STATUS = 'open';
export const CLOSED_STATUS = 'close';
export const OVERDUE_STATUS = 'overdue';

export const auditStatuses = [
  { value: OPEN_STATUS, label: "Open", color: "#ffbe00" },
  { value: CLOSED_STATUS, label: "Closed", color: "#00a96e" },
  { value: OVERDUE_STATUS, label: "OverDue", color: "#ff5861"}
];

export function getStatus(value: any) {
  if(!value){
    return ;
  }
  
  const request_status = auditStatuses.find((status: any) => {
    return status.value == value;
  });

  return request_status;
}