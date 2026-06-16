import { ParentLayout } from "@/layouts";
import { View } from "react-native";
import Button from "@/components/button";
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
    <ParentLayout
      includeTabBarPadding={false}
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
            <Button
              variant="cancel"
              label="Cancel"
              style={{ flex: 1 }}
              onPress={handleCancel}
            />
            <Button
              variant="submit"
              label={isEditing ? "Update" : "Save"}
              style={{ flex: 1 }}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          {isEditing && (
            <View style={styles.actions}>
              <Button
                variant="disable"
                label={isActive ? "Disable" : "Reactivate"}
                style={{ flex: 1 }}
                onPress={handleToggle}
              />
              <Button
                variant="delete"
                label="Delete"
                style={{ flex: 1 }}
                onPress={handleDelete}
              />
            </View>
          )}
        </View>
      </RHFForm>
    </ParentLayout>
  );
};

export default UpsertNotifications;
