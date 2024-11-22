import { requests, users } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export class Checkout {
  PENDING_STATUS = "pending";
  REJECTED_STATUS = "rejected";
  APPROVED_STATUS = "approved";

  SEQUENTIAL_FLOW = "sequential";
  PARALLEL_FLOW = "parallel";
  ONE_APPROVER_FLOW = "one_approver";

  private request?: requests;
  private approvals?: any;
  private rejections?: any;
  private approvers?: any;
  private approval_follow?: string;

  private approver?: users | null;
  private rejector?: users | null;

  constructor(
    request: requests,
    approver: users | null = null,
    rejector: users | null = null,
  ) {
    this.request = request;
    this.approvals = request.approvals;
    this.rejections = request.rejections;
    this.approvers = request.approvers;
    this.approval_follow = request.approval_follow;

    this.approver = approver;
    this.rejector = rejector;
  }

  /**
   *
   * @returns request
   */
  getRequest() {
    return this.request;
  }


  reject(){
    if (!this.rejector) {
      throw new Error("Invalid approvers");
    }

    var rejections: any = this.rejections ? this.rejections : [];
    rejections.push(this.rejector.id);

    this.setRejections(rejections);
  }

  /**
   * push approver into approval array
   */
  approve() {
    if (!this.approver) {
      throw new Error("Invalid approvers");
    }

    var approvals: any = this.approvals ? this.approvals : [];
    approvals.push(this.approver.id);

    this.setApprovals(approvals);
  }

  getApprovals() {
    return this.approvals;
  }

  setApprovals(approvals: JsonValue) {
    this.approvals = approvals;
  }
  
  getRejections() {
    return this.rejections;
  }

  setRejections(rejections: JsonValue) {
    this.rejections = rejections;
  }

  getApprovers() {
    return this.approvers;
  }

  setApprovers(approvers: JsonValue) {
    this.approvers = approvers;
  }

  verifyApprove() {
    try {
      if(!this.approver){
        throw new Error("Invalid approver");
      }
      if (!this.approver.activated) {
        throw new Error("One approver is not activate anymore");
      }
      //Check if approver can approve request
      if (!this.approvers || !Array.isArray(this.approvers)) {
        throw new Error("Request do not have approvers");
      }

      if (!this.approvers.includes(this.approver.id)) {
        throw new Error("User is not allowed to approve request");
      }

      //Check if user already approve this request
      if (this.approvals && this.approvals.includes(this.approver.id)) {
        throw new Error("User has already approved this request");
      }

      //Check if user already reject this request
      if (this.rejections && this.rejections.includes(this.approver.id)) {
        throw new Error("User has already rejected this request");
      }

      const approval_flow = this.approval_follow;
      //If sequential flow, need to check if before approver is already approved the request or not
      if (approval_flow == this.SEQUENTIAL_FLOW) {
        const index_approver = this.approvers.indexOf(this.approver.id);
        const before_approver_id = this.approvers[index_approver - 1];

        //Check if user already approve this request
        if (before_approver_id >= 0 && this.approvals && !this.approvals.includes(before_approver_id)) {
          throw new Error("Before user is not yet approve this request");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return { res: false, message: error.message };
      } else
        return { res: false, message: "User can not approve this request" };
    }

    return { res: true };
  }


  verifyReject(){
    try{
      if(!this.rejector){
        throw new Error("Invalid rejector");
      }
      if (!this.rejector.activated) {
        throw new Error("One rejector is not activate anymore");
      }
      //Check if rejector can reject request
      if (!this.approvers || !Array.isArray(this.approvers)) {
        throw new Error("Request do not have approvers");
      }

      if (!this.approvers.includes(this.rejector.id)) {
        throw new Error("User is not allowed to reject request");
      }

      //Check if user already approve this request
      if (this.approvals && this.approvals.includes(this.rejector.id)) {
        throw new Error("User has already approved this request");
      }

      //Check if user already reject this request
      if (this.rejections && this.rejections.includes(this.rejector.id)) {
        throw new Error("User has already rejected this request");
      }

      const approval_flow = this.approval_follow;
      //If sequential flow, need to check if before approver is already approved the request or not
      if (approval_flow == this.SEQUENTIAL_FLOW) {
        const index_rejector = this.approvers.indexOf(this.rejector.id);
        const before_rejector_id = this.approvers[index_rejector - 1];

        //Check if user already approve this request
        if (before_rejector_id >= 0 && this.approvals && !this.approvals.includes(before_rejector_id)) {
          throw new Error("Before user is not yet approve this request");
        }
      }
    }catch(error){
      if (error instanceof Error) {
        return { res: false, message: error.message };
      } else
        return { res: false, message: "User can not approve this request" };
    }

    return {res: true};
  }

  /**
   * Return status of this instance
   */
  checkout() {
    const approval_flow = this.approval_follow;

    if (!this.approvers || !Array.isArray(this.approvers)) {
      throw new Error("Request approvers is invalid");
    }

    if (approval_flow == this.PARALLEL_FLOW) {
      return this.checkoutParralel();
    }

    if (approval_flow == this.SEQUENTIAL_FLOW) {
      return this.checkoutSequential();
    }

    if (approval_flow == this.ONE_APPROVER_FLOW) {
      return this.checkoutOneApprover();
    }
  }

  checkoutParralel() {
    if (this.approvals && Array.isArray(this.approvals) && this.approvals.length == this.approvers.length) {
      return this.APPROVED_STATUS;
    }

    if (this.rejections && Array.isArray(this.rejections) && this.rejections.length > 0) {
      return this.REJECTED_STATUS;
    }

    return this.PENDING_STATUS;
  }

  checkoutSequential() {
    if (this.approvals && Array.isArray(this.approvals) && this.approvals.length == this.approvers.length) {
      return this.APPROVED_STATUS;
    }

    if (this.rejections && Array.isArray(this.rejections) && this.rejections.length > 0) {
      return this.REJECTED_STATUS;
    }

    return this.PENDING_STATUS;
  }

  checkoutOneApprover(){
    if (this.approvals && Array.isArray(this.approvals) && this.approvals.length > 0) {
      return this.APPROVED_STATUS;
    }

    if (this.rejections && Array.isArray(this.rejections) && this.rejections.length == this.approvers.length) {
      return this.REJECTED_STATUS;
    } 

    return this.PENDING_STATUS;
  }
}
