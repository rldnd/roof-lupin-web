import type { Service } from "@/common/types/service";

export const getServiceCategoryIconPath = (service: Service) => {
  if (service.icons.length === 0) return "";
  return service.icons.find((icon) => !icon.isSelected)?.iconPath;
};
