import type { INotification } from "@/store";

export interface INotificationCardProps {
  item: INotification;
  onPress: () => void;
}
