import { Fragment } from "react";
import { Pressable, Text, View } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import RHFModalSheet from "../rhf-modal-sheet";
import RHFPickerField from "../rhf-picker-field";
import { rhfSelectStyles } from "./rhf-select.styles";
import { IRHFSelectProps } from "./rhf-select.interface";
import useRHFSelect from "./use-rhf-select";
import { getSelectedLabel } from "./rhf-select.utils";

export default function RHFSelect<T extends FieldValues, V extends string>(
  props: IRHFSelectProps<T, V>,
) {
  const {
    name,
    label,
    options,
    required = false,
    placeholder = "Select...",
    modalTitle = label,
    containerStyle,
  } = props;

  const { control } = useFormContext<T>();

  const { visible, open, close, selectOption } = useRHFSelect();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <RHFPickerField
            label={label}
            required={required}
            text={getSelectedLabel(value, options)}
            placeholder={placeholder}
            icon={ChevronDown}
            errorMessage={error?.message}
            containerStyle={containerStyle}
            onPress={open}
          />

          <RHFModalSheet visible={visible} title={modalTitle} onClose={close}>
            {options.map((option, index) => {
              const isActive = value === option.value;

              return (
                <Fragment key={option.value}>
                  {index > 0 && <View style={rhfSelectStyles.optionDivider} />}
                  <Pressable
                    style={[
                      rhfSelectStyles.option,
                      isActive && rhfSelectStyles.optionActive,
                    ]}
                    onPress={() => selectOption(onChange, option.value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                  >
                    <Text
                      style={[
                        rhfSelectStyles.optionText,
                        isActive && rhfSelectStyles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                </Fragment>
              );
            })}
          </RHFModalSheet>
        </>
      )}
    />
  );
}
