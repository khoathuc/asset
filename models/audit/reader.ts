import { uploadFile } from "@/app/base/file";
import { isValidDateFormat } from "@/lib/utils/datetime";
import { User } from "../user/user";
import { Location } from "@/models/location/location";
import { locations } from "@prisma/client";
import { Asset } from "../asset/asset";

type assetCompactType = {
  id: number|string,
  name: string,
}

type statType = {
  assets?: assetCompactType[],
  auditeds?: number[],
}

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

  readAuditDate() {
    var raw_start_date = this.formData?.get("start_date")?.toString();

    if (!raw_start_date) {
      throw new Error("Start Date is required");
    }

    if (!isValidDateFormat(raw_start_date)) {
      throw new Error("Start Date is wrong format");
    }

    var raw_end_date = this.formData?.get("end_date")?.toString();

    if (!raw_end_date) {
      throw new Error("End Date is required");
    }

    if (!isValidDateFormat(raw_end_date)) {
      throw new Error("End Date is wrong format");
    }

    const start_date = new Date(raw_start_date);
    const end_date = new Date(raw_end_date);
    if (start_date > end_date) {
      throw new Error("Start Date is not allow to greater then End Date");
    }

    return { start_date, end_date };
  }

  async readFile() {
    const file: File | null = this.formData?.get("file") as unknown as File;
    var file_url;
    if (file) {
      file_url = await uploadFile(file);
    }

    return file_url;
  }

  readDesc() {
    return this.formData?.get("description")?.toString();
  }

  async readLocations() {
    const locations = this.formData?.get("locations")?.toString();
    if (!locations || locations.length == 0) {
      throw new Error("Empty or invalid locations");
    }

    const location_ids = JSON.parse(locations);
    location_ids.forEach(async (location_id: number) => {
      const location = await Location.loader().getById(location_id);
      if (!location) {
        throw new Error("This location is not exist");
      }

      if (!location.status) {
        throw new Error(`${location.name} is not active`);
      }

      if (location.auditing) {
        throw new Error(`${location.name} is in another audit period`);
      }
    });

    return location_ids;
  }

  async readAuditors() {
    const auditors = this.formData?.get("auditors")?.toString();
    if (!auditors || auditors.length == 0) {
      throw new Error("Empty or invalid auditors");
    }

    const auditor_ids = JSON.parse(auditors);
    auditor_ids.forEach(async (auditor_id: string | number) => {
      const user = await User.loader().getById(parseInt(auditor_id.toString()));
      if (!user) {
        throw new Error("Invalid auditors");
      }
      if (!user.activated) {
        throw new Error("One auditor is not activate anymore");
      }
    });

    return auditor_ids;
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

  async readAuditLogs() {
    const locations = this.formData?.get("locations")?.toString();
    if (!locations) {
      throw new Error("Empty locations");
    }

    const location_ids = JSON.parse(locations);
    if (!location_ids || location_ids.length == 0) {
      throw new Error("Empty or invalid locations");
    }

    var assets:assetCompactType[] = [];
    const location_assets = await Asset.loader().getInLocations(location_ids);
    if(location_assets){
      location_assets.forEach((location_asset)=>{
        assets.push({
          id: location_asset.id,
          name: location_asset.name,
        })
      })
    }

    var stat: statType = {};
    stat.assets = assets;
    stat.auditeds = [];

    return stat;
  }

  async read() {
    try {
      const name = this.readName();
      const locations = await this.readLocations();
      const auditors = await this.readAuditors();
      const followers = await this.readFollowers();
      const file_url = await this.readFile();
      const description = this.readDesc();
      const { start_date, end_date } = this.readAuditDate();
      const stat = await this.readAuditLogs();

      return {
        name,
        locations,
        auditors,
        followers,
        file_url,
        start_date,
        end_date,
        data: { stat },
        description,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
