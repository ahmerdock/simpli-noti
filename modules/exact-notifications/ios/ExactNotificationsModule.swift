import ExpoModulesCore
import UserNotifications

struct ScheduleRecord: Record {
  @Field var id: String = ""
  @Field var title: String = ""
  @Field var body: String = ""
  @Field var triggerAtMillis: Double = 0
  @Field("repeat") var repeatRule: String = "none"
  @Field var anchorMillis: Double = 0
}

/// Without a delegate iOS suppresses notifications that arrive while the app is
/// open; this presents them as banners instead.
final class ForegroundPresenter: NSObject, UNUserNotificationCenterDelegate {
  static let shared = ForegroundPresenter()

  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([.banner, .list, .sound])
  }
}

public class ExactNotificationsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExactNotifications")

    OnCreate {
      UNUserNotificationCenter.current().delegate = ForegroundPresenter.shared
    }

    // Channels are Android-only.
    AsyncFunction("ensureChannel") {}

    AsyncFunction("getPermissionStatus") { (promise: Promise) in
      UNUserNotificationCenter.current().getNotificationSettings { settings in
        promise.resolve(ExactNotificationsModule.statusString(settings.authorizationStatus))
      }
    }

    AsyncFunction("requestPermission") { (promise: Promise) in
      UNUserNotificationCenter.current()
        .requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
          promise.resolve(granted ? "granted" : "denied")
        }
    }

    AsyncFunction("schedule") { (input: ScheduleRecord, promise: Promise) in
      let content = UNMutableNotificationContent()
      content.title = input.title
      if !input.body.isEmpty {
        content.body = input.body
      }
      content.sound = .default

      let trigger = ExactNotificationsModule.makeTrigger(
        triggerAtMillis: input.triggerAtMillis,
        repeatRule: input.repeatRule
      )
      let request = UNNotificationRequest(
        identifier: input.id,
        content: content,
        trigger: trigger
      )

      let center = UNUserNotificationCenter.current()
      // Re-scheduling the same id replaces the previous one.
      center.removePendingNotificationRequests(withIdentifiers: [input.id])
      center.add(request) { error in
        if let error = error {
          promise.reject("ERR_SCHEDULE", error.localizedDescription)
        } else {
          promise.resolve(nil)
        }
      }
    }

    AsyncFunction("cancel") { (id: String, clearDelivered: Bool?) in
      let center = UNUserNotificationCenter.current()
      center.removePendingNotificationRequests(withIdentifiers: [id])
      if clearDelivered != false {
        center.removeDeliveredNotifications(withIdentifiers: [id])
      }
    }

    AsyncFunction("getScheduledIds") { (promise: Promise) in
      UNUserNotificationCenter.current().getPendingNotificationRequests { requests in
        promise.resolve(requests.map { $0.identifier })
      }
    }

    // Battery optimization is Android-only.
    AsyncFunction("openBatteryOptimizationSettings") {}
  }

  private static func makeTrigger(triggerAtMillis: Double, repeatRule: String) -> UNCalendarNotificationTrigger {
    let date = Date(timeIntervalSince1970: triggerAtMillis / 1000.0)
    let calendar = Calendar.current
    let repeats = repeatRule != "none"

    let components: DateComponents
    switch repeatRule {
    case "daily":
      components = calendar.dateComponents([.hour, .minute, .second], from: date)
    case "weekly":
      components = calendar.dateComponents([.weekday, .hour, .minute, .second], from: date)
    case "monthly":
      components = calendar.dateComponents([.day, .hour, .minute, .second], from: date)
    case "yearly":
      components = calendar.dateComponents([.month, .day, .hour, .minute, .second], from: date)
    default:
      components = calendar.dateComponents(
        [.year, .month, .day, .hour, .minute, .second],
        from: date
      )
    }

    return UNCalendarNotificationTrigger(dateMatching: components, repeats: repeats)
  }

  private static func statusString(_ status: UNAuthorizationStatus) -> String {
    switch status {
    case .authorized, .provisional, .ephemeral:
      return "granted"
    case .notDetermined:
      return "undetermined"
    default:
      return "denied"
    }
  }
}
