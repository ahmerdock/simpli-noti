import { StackLayout } from "@/layouts";
import { View } from "react-native";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";
import { PAGE_TITLES } from "@/constants/routes";
import {
  Button,
  RHFDatePicker,
  RHFForm,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from "@/components";
import useUpsertNotifications from "./use-upsert-notifications";
import { DESCRIPTION_MAX, REPEAT_OPTIONS } from "./upsert-notifications.data";
import type { FormValues } from "./upsert-notifications.interface";
import type { RepeatType } from "@/store";

export default function UpsertNotifications() {
  const styles = upsertNotificationsStyles;
  const {
    form,
    handleSubmit,
    handleCancel,
    handleDelete,
    onSubmit,
    isEditing,
    isActive,
    handleToggle,
  } = useUpsertNotifications();

  return (
    <StackLayout
      titleProps={{
        title: isEditing
          ? PAGE_TITLES.EDIT_NOTIFICATION
          : PAGE_TITLES.ADD_NOTIFICATION,
      }}
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
              label="Start Date"
              required
              containerStyle={styles.dateTimeField}
            />

            <RHFTimePicker<FormValues>
              name="time"
              label="Time"
              required
              containerStyle={styles.dateTimeField}
            />
          </View>

          <RHFSelect<FormValues, RepeatType>
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
            <Button
              variant="cancel"
              label="Cancel"
              style={styles.actionButton}
              onPress={handleCancel}
            />
            <Button
              variant="submit"
              label={isEditing ? "Update" : "Save"}
              style={styles.actionButton}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          {isEditing && (
            <View style={styles.actions}>
              <Button
                variant="disable"
                label={isActive ? "Disable" : "Reactivate"}
                style={styles.actionButton}
                onPress={handleToggle}
              />
              <Button
                variant="delete"
                label="Delete"
                style={styles.actionButton}
                onPress={handleDelete}
              />
            </View>
          )}
        </View>
      </RHFForm>
    </StackLayout>
  );
}
