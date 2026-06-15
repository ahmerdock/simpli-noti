import { router } from "expo-router";
import { ParentLayout } from "@/layouts";
import { Pressable, Text, View, Modal, FlatList, Image } from "react-native";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";
import { PAGE_TITLES } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ChevronDownIcon } from "@/assets/icons";
import {
  RHFForm,
  RHFTextField,
  RHFDatePicker,
  RHFTimePicker,
} from "@/components/react-hook-form";

const DESCRIPTION_MAX = 160;

const REPEAT_OPTIONS = [
  { label: "No Repeat", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
] as const;

type RepeatValue = (typeof REPEAT_OPTIONS)[number]["value"];

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  repeat: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
  description: z.string().max(DESCRIPTION_MAX).optional(),
});

type FormValues = z.infer<typeof schema>;

const UpsertNotifications = () => {
  const styles = upsertNotificationsStyles;

  const [showRepeatPicker, setShowRepeatPicker] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      repeat: "none",
      description: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const repeatValue = watch("repeat");

  const handleCancel = () => router.back();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // wire up expo-notifications here
  };

  const repeatLabel =
    REPEAT_OPTIONS.find((o) => o.value === repeatValue)?.label ?? "No Repeat";

  return (
    <ParentLayout
      includeTabBarPadding={false}
      titleProps={{ title: PAGE_TITLES.ADD_NOTIFICATION }}
    >
      <RHFForm form={form}>
        <View style={styles.form}>
          <RHFTextField<FormValues>
            name="title"
            label="Title"
            placeholder="e.g. Team Meeting"
            required
          />

          <View style={styles.dateTimeRow}>
            <RHFDatePicker<FormValues>
              name="date"
              label="Date"
              placeholder="DD/MM/YY"
              required
              containerStyle={styles.dateTimeField}
            />

            <RHFTimePicker<FormValues>
              name="time"
              label="Time"
              placeholder="HH:MM AM"
              required
              containerStyle={styles.dateTimeField}
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Repeat</Text>
            <Pressable
              style={styles.dropdownTrigger}
              onPress={() => setShowRepeatPicker(true)}
            >
              <Text style={styles.dropdownTriggerText}>{repeatLabel}</Text>
              <Image source={ChevronDownIcon} style={styles.dropdownIcon} />
            </Pressable>
          </View>

          <RHFTextField<FormValues>
            name="description"
            label="Description"
            placeholder="Short note about this notification..."
            multiline
            numberOfLines={4}
            maxLength={DESCRIPTION_MAX}
            showCharCount
          />

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </RHFForm>

      <Modal
        visible={showRepeatPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRepeatPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setShowRepeatPicker(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Repeat</Text>
            <FlatList
              data={REPEAT_OPTIONS}
              keyExtractor={(item) => item.value}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.repeatOptionDivider} />
              )}
              renderItem={({ item }) => {
                const isActive = repeatValue === item.value;
                return (
                  <Pressable
                    style={[
                      styles.repeatOption,
                      isActive && styles.repeatOptionActive,
                    ]}
                    onPress={() => {
                      setValue("repeat", item.value as RepeatValue, {
                        shouldValidate: true,
                      });
                      setShowRepeatPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.repeatOptionText,
                        isActive && styles.repeatOptionTextActive,
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
    </ParentLayout>
  );
};

export default UpsertNotifications;
