import Foundation

enum WidgetDataStore {
    static let appGroup = "group.com.feriadapp.app"

    static let daysKey = "widget_days"
    static let labelKey = "widget_label"
    static let titleKey = "widget_title"
    static let nameKey = "widget_name"
    static let isTodayKey = "widget_is_today"

    struct Snapshot {
        let days: String
        let label: String
        let title: String
        let name: String
        let isToday: Bool
    }

    private static var defaults: UserDefaults? {
        UserDefaults(suiteName: appGroup)
    }

    static func save(days: String, label: String, title: String, name: String, isToday: String) {
        defaults?.set(days, forKey: daysKey)
        defaults?.set(label, forKey: labelKey)
        defaults?.set(title, forKey: titleKey)
        defaults?.set(name, forKey: nameKey)
        defaults?.set(isToday, forKey: isTodayKey)
    }

    static func load() -> Snapshot {
        let store = defaults

        return Snapshot(
            days: store?.string(forKey: daysKey) ?? "--",
            label: store?.string(forKey: labelKey) ?? "días",
            title: store?.string(forKey: titleKey) ?? "Próximo feriado",
            name: store?.string(forKey: nameKey) ?? "Abrí Feriadapp",
            isToday: store?.string(forKey: isTodayKey) == "1"
        )
    }
}
