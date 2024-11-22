import { uploadFile } from "@/app/base/file";
import { RequestType } from "../request_type/request_type";
import { User } from "../user/user";

export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  readName() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  }

  async readRequestType() {
    const request_type_id = this.formData?.get("request_type_id")?.toString();
    if (request_type_id) {
      const request_type = await RequestType.loader().getById(
        parseInt(request_type_id),
      );
      if (!request_type) {
        throw new Error("This request type is not exist");
      }
      return request_type;
    }

    throw new Error("Request type is invalid");
  }

  readApprovalFlow() {
    const approval_follow = this.formData?.get("approval_follow")?.toString();
    if (!approval_follow) {
      throw new Error("Approval flow is required");
    }

    if (!["sequential", "parallel", "one_approver"].includes(approval_follow)) {
      throw new Error("Invalid approval flow");
    }

    return approval_follow;
  }

  async readApprovers() {
    const approvers = this.formData?.get("approvers")?.toString();
    if (!approvers || approvers.length == 0) {
      throw new Error("Empty or invalid approvers");
    }

    const approver_ids = JSON.parse(approvers);
    approver_ids.forEach(async (approver_id: string | number) => {
      const user = await User.loader().getById(
        parseInt(approver_id.toString()),
      );
      if (!user) {
        throw new Error("Invalid approvers");
      }
      if (!user.activated) {
        throw new Error("One approver is not activate anymore");
      }
    });

    return approver_ids;
  }


  async readFollowers() {
    const followers = this.formData?.get("followers")?.toString();
    if (!followers || followers.length == 0) {
      throw new Error("Empty or invalid followers");
    }
  
    const follower_ids = JSON.parse(followers);
    follower_ids.forEach(async (follower_id: string | number) => {
      const user = await User.loader().getById(
        parseInt(follower_id.toString()),
      );
      if (!user) {
        throw new Error("Invalid followers");
      }
      if (!user.activated) {
        throw new Error("One follower is not activate anymore");
      }
    });
  
    return follower_ids;
  }


  async readFile() {
    const file: File | null = this.formData?.get("file") as unknown as File;
    var file_url;
    if (file) {
      file_url = await uploadFile(file);
    }
  
    return file_url;
  }


  readCForm() {
    const form = this.formData?.get("form")?.toString();
  
    if (!form) {
      return;
    }
    return JSON.parse(form);
  }


  readDesc() {
    return this.formData?.get("description")?.toString();
  }

  async read() {
    const name = this.readName();
    const request_type_id = await this.readRequestType().then((res) => {
      return res.id;
    });

    const approval_follow = this.readApprovalFlow();
    const approvers = await this.readApprovers();
    const followers = await this.readFollowers();
    const file_url = await this.readFile();
    const description = this.readDesc();
    const form = this.readCForm();

    return {
      name,
      request_type_id,
      approval_follow,
      approvers,
      followers,
      file_url,
      form,
      description,
    };
  }
}
