import { TouchableOpacity, View, Text } from "react-native";
import { formatNotificationDateTime } from "@/utils/date-time-display";
import { INotificationCardProps } from "./notification-card.interface";
import { notificationCardStyles } from "./notification-card.styles";

export default function NotificationCard(props: INotificationCardProps) {
  const { item, onPress } = props;

  return (
    <TouchableOpacity
      style={notificationCardStyles.card}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={notificationCardStyles.cardHeader}>
        <Text style={notificationCardStyles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        {item.repeat !== "none" && (
          <View style={notificationCardStyles.repeatBadge}>
            <Text style={notificationCardStyles.repeatBadgeText}>
              {item.repeat.charAt(0).toUpperCase() + item.repeat.slice(1)}
            </Text>
          </View>
        )}
      </View>
      <Text style={notificationCardStyles.cardDateTime}>
        {formatNotificationDateTime(item)}
      </Text>
      {item.description ? (
        <Text style={notificationCardStyles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}
