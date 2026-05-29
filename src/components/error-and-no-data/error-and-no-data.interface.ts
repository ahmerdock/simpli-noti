import type { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export type ErrorAndNoDataType = "error" | "noData";

export interface IErrorAndNoDataStateProps {
  type?: ErrorAndNoDataType;
  height?: number;
  message?: string;
  children?: ReactNode;
  src?: ImageSourcePropType;
  description?: string;
  buttonVisibility?: boolean;
  buttonText?: string;
  buttonClick?: () => void;
  noIcon?: boolean;
}
