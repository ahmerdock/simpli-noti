import { ParentLayout } from "@/layouts";
import { Pressable, Text, View } from "react-native";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";
import { PAGE_TITLES } from "@/constants/routes";
import {
  RHFForm,
  RHFTextField,
  RHFDatePicker,
  RHFTimePicker,
  RHFSelect,
} from "@/components/react-hook-form";
import useUpsertNotifications from "./use-upsert-notifications";
import {
  DESCRIPTION_MAX,
  FormValues,
  REPEAT_OPTIONS,
  RepeatValue,
} from "./upsert-notifications.utils";

const UpsertNotifications = () => {
  const styles = upsertNotificationsStyles;
  const { form, handleSubmit, handleCancel, onSubmit } = useUpsertNotifications();

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

          <RHFSelect<FormValues, RepeatValue>
            name="repeat"
            label="Repeat"
            options={REPEAT_OPTIONS}
          />

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
    </ParentLayout>
  );
};

export default UpsertNotifications;
