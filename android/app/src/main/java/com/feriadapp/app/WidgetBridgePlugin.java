package com.feriadapp.app;

import android.content.SharedPreferences;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridgePlugin extends Plugin {

    private static final String PREFS_NAME = "CapacitorStorage";

    @PluginMethod
    public void updateData(PluginCall call) {
        String days = call.getString("days");
        String label = call.getString("label");
        String title = call.getString("title");
        String name = call.getString("name");
        String isToday = call.getString("isToday", "0");

        if (days == null || label == null || title == null || name == null) {
            call.reject("Missing required fields");
            return;
        }

        SharedPreferences prefs = getContext().getSharedPreferences(PREFS_NAME, android.content.Context.MODE_PRIVATE);
        prefs
            .edit()
            .putString("widget_days", days)
            .putString("widget_label", label)
            .putString("widget_title", title)
            .putString("widget_name", name)
            .putString("widget_is_today", isToday)
            .apply();

        FeriadappWidgetProvider.updateAll(getContext());
        call.resolve();
    }

    @PluginMethod
    public void refresh(PluginCall call) {
        FeriadappWidgetProvider.updateAll(getContext());
        call.resolve();
    }
}
