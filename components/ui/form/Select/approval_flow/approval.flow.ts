export const SEQUENTIAL_FLOW = "sequential";
export const PARALLEL_FLOW = "parallel";
export const ONE_APPROVER_FLOW = "one_approver";

export interface FlowOption {
  readonly value: string;
  readonly label: string;
}

export function getAllApprovalFlows() {
    return [
        {label: "Sequential", value: SEQUENTIAL_FLOW},
        {label: "Parallel", value: PARALLEL_FLOW},
        {label: "One Approver", value: ONE_APPROVER_FLOW},
    ]
}
