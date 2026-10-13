import { View, Text, Pressable, FlatList } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import ChevronDown from "lucide-react-native/icons/chevron-down";
import { useUnistyles } from "react-native-unistyles";
import AppIcon from "../../app-icon";
import { rhfFieldStyles } from "../react-hook-form.styles";
import RHFFieldLabel from "../rhf-field-label";
import RHFFieldError from "../rhf-field-error";
import RHFModalSheet from "../rhf-modal-sheet";
import { rhfSelectStyles } from "./rhf-select.styles";
import { IRHFSelectProps } from "./rhf-select.interface";
import { useRHFSelect } from "./use-rhf-select";
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
  const fieldStyles = rhfFieldStyles;
  const { theme } = useUnistyles();
  const styles = rhfSelectStyles;

  const { visible, open, close, selectOption } = useRHFSelect();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedLabel = getSelectedLabel(value, options, placeholder);

        return (
          <>
            <View style={[fieldStyles.fieldWrapper, containerStyle]}>
              <RHFFieldLabel label={label} required={required} />

              <Pressable
                style={fieldStyles.trigger}
                onPress={open}
                accessibilityRole="button"
                accessibilityLabel={required ? `${label}, required` : label}
                accessibilityValue={{ text: selectedLabel }}
              >
                <Text style={fieldStyles.triggerText}>{selectedLabel}</Text>
                <AppIcon
                  icon={ChevronDown}
                  size={16}
                  color={theme.colors.textSecondary}
                />
              </Pressable>

              {error && <RHFFieldError message={error.message} />}
            </View>

            <RHFModalSheet visible={visible} title={modalTitle} onClose={close}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View style={styles.optionDivider} />
                )}
                renderItem={({ item }) => {
                  const isActive = value === item.value;
                  return (
                    <Pressable
                      style={[styles.option, isActive && styles.optionActive]}
                      onPress={() => selectOption(onChange, item.value)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isActive && styles.optionTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </RHFModalSheet>
          </>
        );
      }}
    />
  );
}
