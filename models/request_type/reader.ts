import { User } from "@/models/user/user";

export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  private readName() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  }

  async readCForm(){
    const form = this.formData?.get("form")?.toString();
    if(!form){
      return ;
    }
    return JSON.parse(form)
  }

  private async readDefaultApprovers() {
    const default_approvers = this.formData?.get("default_approvers")?.toString();
    if (!default_approvers || default_approvers.length == 0) {
      throw new Error("Empty or invalid default approvers");
    }

    const approver_ids = JSON.parse(default_approvers);
    const promises = approver_ids.map(async (approver_id: string | number) => {
      const user = await User.loader().getById(parseInt(approver_id.toString()));
      if (!user) {
        throw new Error("Invalid approvers");
      }
      if (!user.activated) {
        throw new Error("One approver is not activate anymore");
      }
    });
  
    await Promise.all(promises);
    return approver_ids;
  }


  private async readDefaultFollowers() {
    const default_followers = this.formData?.get("default_followers")?.toString();
    if (!default_followers || default_followers.length == 0) {
      throw new Error("Empty or invalid default followers");
    }
  
    const follower_ids = JSON.parse(default_followers);
    const promises = follower_ids.map(async (follower_id: string | number) => {
      const user = await User.loader().getById(parseInt(follower_id.toString()));
      if (!user) {
        throw new Error("Invalid followers");
      }
      if (!user.activated) {
        throw new Error("One follower is not activate anymore");
      }
    });
  
    await Promise.all(promises);
    return follower_ids;
  }


  private readAllowChangeApprovers() {
    const allow_change_approvers = this.formData?.get("allow_change_approvers")?.toString();
  
    if (allow_change_approvers === "true") {
      return true;
    } else if (allow_change_approvers === "false") {
      return false;
    }
  
    throw new Error("Invalid allow change approvers type");
  }


  private readApprovalFlow() {
    const approval_follow = this.formData?.get("approval_follow")?.toString();
    if (!approval_follow) {
      throw new Error("Approval flow is required");
    }
  
    if (!["sequential", "parallel", "one_approver"].includes(approval_follow)) {
      throw new Error("Invalid approval flow");
    }
  
    return approval_follow;
  }


  private readDescription(){
    return this.formData?.get("description")?.toString();
  }
  

  /**
   * @desc read formData
   * @param formData
   */
  async read() {
    const name = this.readName();
    const default_approvers = await this.readDefaultApprovers();
    const default_followers = await this.readDefaultFollowers();
    const allow_change_approvers = this.readAllowChangeApprovers();
    const approval_follow = this.readApprovalFlow();
    const description = this.readDescription();

    return {
      name,
      default_approvers,
      default_followers,
      allow_change_approvers,
      description,
      approval_follow,
    };
  }
}
