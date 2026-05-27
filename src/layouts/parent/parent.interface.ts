import { IScreenTitleProps } from "@/components/screen-title/screen-title.interface";
import { ReactNode } from "react";

export interface IParentLayoutProps {
  children: ReactNode;
  titleProps: IScreenTitleProps;
}
