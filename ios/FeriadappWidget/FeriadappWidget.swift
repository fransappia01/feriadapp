import WidgetKit
import SwiftUI

struct FeriadappWidgetEntry: TimelineEntry {
    let date: Date
    let days: String
    let label: String
    let title: String
    let name: String
}

struct FeriadappWidgetProvider: TimelineProvider {
    func placeholder(in context: Context) -> FeriadappWidgetEntry {
        FeriadappWidgetEntry(
            date: Date(),
            days: "16",
            label: "días",
            title: "Próximo feriado",
            name: "Paso a la Inmortalidad del General Martín Güemes"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (FeriadappWidgetEntry) -> Void) {
        completion(makeEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<FeriadappWidgetEntry>) -> Void) {
        let entry = makeEntry()
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())
            ?? Date().addingTimeInterval(3600)
        completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
    }

    private func makeEntry() -> FeriadappWidgetEntry {
        let snapshot = WidgetDataStore.load()

        return FeriadappWidgetEntry(
            date: Date(),
            days: snapshot.days,
            label: snapshot.label,
            title: snapshot.title,
            name: snapshot.name
        )
    }
}

struct FeriadappWidgetEntryView: View {
    var entry: FeriadappWidgetProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(Color(red: 0.12, green: 0.16, blue: 0.22))

            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(Color(red: 0.16, green: 0.21, blue: 0.28), lineWidth: 1)

            VStack(spacing: 4) {
                Text(entry.title.uppercased())
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundColor(Color(red: 0.66, green: 0.83, blue: 0.96))
                    .tracking(1)

                Text(entry.days)
                    .font(.system(size: family == .systemSmall ? 44 : 56, weight: .bold, design: .rounded))
                    .foregroundColor(.white)
                    .minimumScaleFactor(0.5)
                    .lineLimit(1)

                Text(entry.label.uppercased())
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Color(red: 0.55, green: 0.61, blue: 0.71))
                    .tracking(1.5)

                if family != .systemSmall {
                    Text(entry.name)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(.white.opacity(0.9))
                        .multilineTextAlignment(.center)
                        .lineLimit(2)
                        .padding(.top, 4)
                }
            }
            .padding(12)
        }
    }
}

struct FeriadappWidget: Widget {
    let kind: String = "FeriadappWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FeriadappWidgetProvider()) { entry in
            FeriadappWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Feriadapp")
        .description("Días hasta el próximo feriado en Argentina.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
