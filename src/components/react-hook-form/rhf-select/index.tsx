import { View, Text, Pressable, Image, Modal, FlatList } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { ChevronDownIcon } from "@/assets/icons";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { rhfSelectStyles } from "./rhf-select.styles";
import { IRHFSelectProps } from "./rhf-select.interface";
import { useRHFSelect } from "./use-rhf-select";
import { getSelectedLabel } from "./rhf-select.utils";

const RHFSelect = <T extends FieldValues, V extends string>(
  props: IRHFSelectProps<T, V>,
) => {
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
  const styles = rhfSelectStyles;

  const { visible, open, close, selectOption } = useRHFSelect();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedLabel = getSelectedLabel(
          value as V,
          options,
          placeholder,
        );

        return (
          <>
            <View style={[fieldStyles.fieldWrapper, containerStyle]}>
              <View style={fieldStyles.labelRow}>
                <Text style={fieldStyles.fieldLabel}>{label}</Text>
                {required && <Text style={fieldStyles.requiredMark}>*</Text>}
              </View>

              <Pressable
                style={styles.trigger}
                onPress={open}
                accessibilityLabel={required ? `${label}, required` : label}
              >
                <Text style={styles.triggerText}>{selectedLabel}</Text>
                <Image source={ChevronDownIcon} style={styles.triggerIcon} />
              </Pressable>

              {error && (
                <Text style={fieldStyles.fieldError}>{error.message}</Text>
              )}
            </View>

            <Modal
              visible={visible}
              transparent
              animationType="slide"
              onRequestClose={close}
            >
              <View style={styles.modalOverlay}>
                <Pressable style={styles.modalBackdrop} onPress={close} />
                <View style={styles.modalSheet}>
                  <View style={styles.modalHandle} />
                  <Text style={styles.modalTitle}>{modalTitle}</Text>
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
                          style={[
                            styles.option,
                            isActive && styles.optionActive,
                          ]}
                          onPress={() => selectOption(onChange, item.value)}
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
                </View>
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};

export default RHFSelect;
