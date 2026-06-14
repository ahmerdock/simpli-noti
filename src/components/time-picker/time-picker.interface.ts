export interface ITimePickerProps {
  hour: string;
  minute: string;
  period: string;
  onChange: (hour: string, minute: string, period: string) => void;
}
