import { ReactNode } from "react";
import { IScreenTitleProps } from "@/components/screen-title/screen-title.interface";

export interface IStackLayoutProps {
  children?: ReactNode;
  titleProps: IScreenTitleProps;
}
