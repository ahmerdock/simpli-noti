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
import type { IFormValues } from "./upsert-notifications.interface";
import type { IRepeatType } from "@/store";

export default function UpsertNotifications() {
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
        <View style={upsertNotificationsStyles.form}>
          <RHFTextField<IFormValues>
            name="title"
            label="Title"
            placeholder="e.g. Team Meeting"
            required
          />

          <View style={upsertNotificationsStyles.dateTimeRow}>
            <RHFDatePicker<IFormValues>
              name="date"
              label="Start Date"
              required
              containerStyle={upsertNotificationsStyles.dateTimeField}
            />

            <RHFTimePicker<IFormValues>
              name="time"
              label="Time"
              required
              containerStyle={upsertNotificationsStyles.dateTimeField}
            />
          </View>

          <RHFSelect<IFormValues, IRepeatType>
            name="repeat"
            label="Repeat"
            options={REPEAT_OPTIONS}
          />

          <RHFTextField<IFormValues>
            name="description"
            label="Description"
            placeholder="Short note about this notification..."
            multiline
            numberOfLines={4}
            maxLength={DESCRIPTION_MAX}
            showCharCount
          />

          <View style={upsertNotificationsStyles.actions}>
            <Button
              variant="cancel"
              label="Cancel"
              style={upsertNotificationsStyles.actionButton}
              onPress={handleCancel}
            />
            <Button
              variant="submit"
              label={isEditing ? "Update" : "Save"}
              style={upsertNotificationsStyles.actionButton}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          {isEditing && (
            <View style={upsertNotificationsStyles.actions}>
              <Button
                variant="disable"
                label={isActive ? "Disable" : "Reactivate"}
                style={upsertNotificationsStyles.actionButton}
                onPress={handleToggle}
              />
              <Button
                variant="delete"
                label="Delete"
                style={upsertNotificationsStyles.actionButton}
                onPress={handleDelete}
              />
            </View>
          )}
        </View>
      </RHFForm>
    </StackLayout>
  );
}
