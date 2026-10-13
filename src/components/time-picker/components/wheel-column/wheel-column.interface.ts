export interface IWheelColumnProps {
  label: string;
  data: string[];
  selected: string;
  onSelect: (val: string) => void;
}
