import { useData } from "@/context/data.context";

export interface TagOption{
    readonly value: string;
    readonly label: string;
    readonly color: string;
}

export function getAllTags() {
  const { contextData } = useData();
  const { tags } = contextData;

  var tagOptions: { value: any; label: any; color: any }[] = [];
  tags.forEach((tag: any) => {
    tagOptions.push({
      value: tag.id,
      label: tag.name,
      color: tag.color,
    });
  });

  return tagOptions;
}