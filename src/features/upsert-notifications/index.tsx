import { router } from "expo-router";
import { ParentLayout } from "@/layouts";
import { Pressable, Text, View, Modal, FlatList, Image } from "react-native";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";
import { PAGE_TITLES } from "@/constants/routes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useUnistyles } from "react-native-unistyles";
import { CalendarIcon, ClockIcon, ChevronDownIcon } from "@/assets/icons";
import TimePicker from "@/components/time-picker";
import { RHFForm, RHFTextField } from "@/components/react-hook-form";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

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
  const { theme } = useUnistyles();
  const styles = upsertNotificationsStyles;

  const defaultStyles = useDefaultStyles();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRepeatPicker, setShowRepeatPicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [timeHour, setTimeHour] = useState("12");
  const [timeMinute, setTimeMinute] = useState("00");
  const [timePeriod, setTimePeriod] = useState("AM");

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

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const repeatValue = watch("repeat");

  const handleCancel = () => router.back();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // wire up expo-notifications here
  };

  const repeatLabel =
    REPEAT_OPTIONS.find((o) => o.value === repeatValue)?.label ?? "No Repeat";

  const handleTimeChange = (h: string, m: string, p: string) => {
    setTimeHour(h);
    setTimeMinute(m);
    setTimePeriod(p);
  };

  const confirmTime = () => {
    setValue("time", `${timeHour}:${timeMinute} ${timePeriod}`, {
      shouldValidate: true,
    });
    setShowTimePicker(false);
  };

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

          {/* Date & Time row */}
          <View style={styles.dateTimeRow}>
            {/* Date */}
            <View style={[styles.fieldWrapper, styles.dateTimeField]}>
              <Text style={styles.fieldLabel}>Date</Text>
              <Controller
                control={control}
                name="date"
                render={({ field: { value } }) => (
                  <Pressable
                    style={styles.dateTimeTrigger}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text
                      style={[
                        styles.dateTimeTriggerText,
                        !value && { color: theme.colors.textSecondary },
                      ]}
                    >
                      {value || "DD/MM/YY"}
                    </Text>
                    <Image
                      source={CalendarIcon}
                      style={styles.dateTimeTriggerIcon}
                    />
                  </Pressable>
                )}
              />
              {errors.date && (
                <Text style={styles.fieldError}>{errors.date.message}</Text>
              )}
            </View>

            {/* Time */}
            <View style={[styles.fieldWrapper, styles.dateTimeField]}>
              <Text style={styles.fieldLabel}>Time</Text>
              <Controller
                control={control}
                name="time"
                render={({ field: { value } }) => (
                  <Pressable
                    style={styles.dateTimeTrigger}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text
                      style={[
                        styles.dateTimeTriggerText,
                        !value && { color: theme.colors.textSecondary },
                      ]}
                    >
                      {value || "HH:MM AM"}
                    </Text>
                    <Image
                      source={ClockIcon}
                      style={styles.dateTimeTriggerIcon}
                    />
                  </Pressable>
                )}
              />
              {errors.time && (
                <Text style={styles.fieldError}>{errors.time.message}</Text>
              )}
            </View>
          </View>

          {/* Repeat */}
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

          {/* Actions */}
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

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setShowDatePicker(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Date</Text>
            <DateTimePicker
              mode="single"
              date={selectedDate}
              onChange={({ date }) => {
                if (date) setSelectedDate(dayjs(date));
              }}
              styles={{
                ...defaultStyles,
                today: {
                  borderColor: theme.colors.primary,
                  borderWidth: 1,
                },
                selected: {
                  backgroundColor: theme.colors.primary,
                },
                selected_label: {
                  color: theme.colors.background,
                },
                day_label: {
                  color: theme.colors.text,
                },
                weekday_label: {
                  color: theme.colors.textSecondary,
                },
                header: {
                  backgroundColor: theme.colors.backgroundSecondary,
                },
                month_selector_label: {
                  color: theme.colors.text,
                  fontFamily: theme.typography.primary.medium,
                },
                year_selector_label: {
                  color: theme.colors.text,
                  fontFamily: theme.typography.primary.medium,
                },
                button_prev: {
                  tintColor: theme.colors.primary,
                },
                button_next: {
                  tintColor: theme.colors.primary,
                },
              }}
            />
            <Pressable
              style={styles.modalConfirmBtn}
              onPress={() => {
                setValue("date", selectedDate.format("DD / MM / YYYY"), {
                  shouldValidate: true,
                });
                setShowDatePicker(false);
              }}
            >
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setShowTimePicker(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Time</Text>
            <TimePicker
              hour={timeHour}
              minute={timeMinute}
              period={timePeriod}
              onChange={handleTimeChange}
            />
            <Pressable style={styles.modalConfirmBtn} onPress={confirmTime}>
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Repeat Picker Modal */}
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
