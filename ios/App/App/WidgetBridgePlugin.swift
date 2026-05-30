import Foundation
import Capacitor
import WidgetKit

@objc(WidgetBridgePlugin)
public class WidgetBridgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WidgetBridgePlugin"
    public let jsName = "WidgetBridge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "updateData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "refresh", returnType: CAPPluginReturnPromise),
    ]

    @objc func updateData(_ call: CAPPluginCall) {
        guard
            let days = call.getString("days"),
            let label = call.getString("label"),
            let title = call.getString("title"),
            let name = call.getString("name")
        else {
            call.reject("Missing required fields")
            return
        }

        let isToday = call.getString("isToday") ?? "0"
        WidgetDataStore.save(days: days, label: label, title: title, name: name, isToday: isToday)

        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }

        call.resolve()
    }

    @objc func refresh(_ call: CAPPluginCall) {
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }
        call.resolve()
    }
}
