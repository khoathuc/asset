import { getAllApprovalFlows } from "./approval.flow";

export function ApprovalFlowName({ approval_flow }: { approval_flow: string }) {
  const approvalFlows = getAllApprovalFlows();

  const res = approvalFlows.find((approvalFlow) => {
    return approvalFlow.value == approval_flow;
  });

  if (!res) {
    return <span>Undefined flow</span>;
  }

  return res.label;
}

export function ApprovalFlowDesc({ approval_flow }: { approval_flow: string }) {
  const approvalFlows = getAllApprovalFlows();

  const res = approvalFlows.find((approvalFlow) => {
    return approvalFlow.value == approval_flow;
  });

  if (!res) {
    return <span>Undefined flow</span>;
  }

  return res.desc;
}
