import { ReactNode } from "react";

export interface IRHFModalSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
}
