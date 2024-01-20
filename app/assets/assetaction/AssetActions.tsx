"use client";
import { useData } from "@/context/data.context";
import { Prisma, actions, assets } from "@prisma/client";
import AssetAction from "./AssetAction";

function checkCondition(asset: assets, conditions: any) {
  for (let i = 0; i < conditions.length; ++i) {
    const condition = conditions[i];
    if (!condition) {
      return false;
    }

    if (!condition.field) {
      return false;
    }

    switch (condition.field) {
      case "location":
        if (condition.condition == "not equal") {
          if (asset.location_id == condition.value) {
            return false;
          }
        } else {
          if (asset.location_id != condition.value) {
            return false;
          }
        }

        break;
      case "status":
        if (condition.condition == "not equal") {
          if (asset.status_id == condition.value) {
            return false;
          }
        } else {
          if (asset.status_id != condition.value) {
            return false;
          }
        }
        break;
      case "assignee":
        if (condition.condition == "not equal") {
          if (asset.assignee_id == condition.value) {
            return false;
          }
        } else {
          if (asset.assignee_id != condition.value) {
            return false;
          }
        }
        break;
      default:
        return false;
    }
  }
  return true;
}

function filterActions(asset: assets, actions: actions[]) {
  return actions.filter((action) => {
    if (Array.isArray(action.conditions) && action.conditions.length != 0) {
      return checkCondition(asset, action.conditions);
    }

    return true;
  });
}

export default function AssetActions({ asset }: { asset: assets }) {
  const { contextData } = useData();

  const actions = contextData.actions;
  var actionList: actions[] = [];
  if (actions) {
    actionList = filterActions(asset, actions);
  }

  return (
    <ul
      tabIndex={0}
      className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
    >
      {actionList.map((action) => (
        <AssetAction asset={asset} action={action} />
      ))}
    </ul>
  );
}
