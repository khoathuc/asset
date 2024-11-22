import { getAssetById } from "@/app/assets/actions";
import { uploadFile } from "@/app/base/file";
import { isValidDateFormat } from "@/lib/utils/datetime";
import { isValidPriceFormat } from "@/lib/utils/price";
import { assets } from "@prisma/client";

async function readAsset(formData: FormData) {
  const asset_id = formData.get("asset_id")?.toString();
  if (!asset_id) {
    throw new Error("Invalid Asset");
  }

  const asset = await getAssetById(parseInt(asset_id));
  if (!asset) {
    throw new Error("Invalid Asset");
  }

  return asset;
}

async function readFile(formData: FormData) {
  const file: File | null = formData.get("file") as unknown as File;

  var file_url = null;
  if (file) {
    file_url = await uploadFile(file);
  }

  return file_url;
}

function readChanges(formData: FormData, asset: assets) {
  if (!asset) {
    throw new Error("Invalid Asset");
  }

  var changes_value = {};
  const changes_data = formData.get("changes")?.toString();
  if (changes_data) {
    const changes = JSON.parse(changes_data);
    Object.entries(changes).map(([key, value]) => {
      var field = null;
      switch (key) {
        case "status":
          field = "status_id";
          break;
        case "location":
          field = "location_id";
          break;
        case "assignee":
          field = "assignee_id";
          break;
        default:
          break;
      }
      if (field) {
        changes_value = { ...changes_value, [field]: value };
      }
    });
  }

  return changes_value;
}

function readChangesLog(formData: FormData, asset: assets) {
  if (!asset) {
    throw new Error("Invalid Asset");
  }

  var changes_log = {};
  const changes_data = formData.get("changes")?.toString();
  if (changes_data) {
    const changes = JSON.parse(changes_data);
    Object.entries(changes).map(([key, value]) => {
      const old = getOld(key, asset);
      changes_log = { ...changes_log, [key]: { old, new: value } };
    });
  }

  return changes_log;
}

function getOld(key: string, asset: assets) {
  if (!asset) {
    return;
  }

  switch (key) {
    case "status":
      return asset.status_id;
    case "location":
      return asset.location_id;
    case "assignee":
      return asset.assignee_id;
  }
}

function readActionCost(formData: FormData) {
  const action_cost = formData.get("action_cost")?.toString();

  if (!action_cost) {
    throw new Error("Purchase price is required");
  }

  if (!isValidPriceFormat(action_cost)) {
    throw new Error("Invalid price format");
  }

  return action_cost;
}

function readActionDate(formData: FormData) {
  var action_date = formData.get("action_date")?.toString();

  if (!action_date) {
    throw new Error("Action Date is required");
  }

  if (!isValidDateFormat(action_date)) {
    throw new Error("Action Date is wrong format");
  }

  return new Date(action_date);
}

function readDescription(formData: FormData) {
  return formData.get("description")?.toString();
}

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

export async function readData(formData: FormData) {
  const name = readName(formData);
  const asset = await readAsset(formData);
  const changes_log = readChangesLog(formData, asset);
  const changes = readChanges(formData, asset);
  const action_cost = readActionCost(formData);
  const action_date = readActionDate(formData);
  const description = readDescription(formData);
  const file_url = await readFile(formData);
  return {
    asset,
    changes,
    changes_log,
    name,
    action_cost,
    action_date,
    description,
    file_url,
  };
}
