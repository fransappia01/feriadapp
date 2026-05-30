package com.feriadapp.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;

public class FeriadappWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }

    public static void updateWidget(
        Context context,
        AppWidgetManager appWidgetManager,
        int appWidgetId
    ) {
        android.content.SharedPreferences prefs = context.getSharedPreferences(
            "CapacitorStorage",
            Context.MODE_PRIVATE
        );

        String days = prefs.getString("widget_days", "--");
        String label = prefs.getString("widget_label", "días");
        String title = prefs.getString("widget_title", "Próximo feriado");
        String name = prefs.getString("widget_name", "Abrí Feriadapp");

        android.widget.RemoteViews views = new android.widget.RemoteViews(
            context.getPackageName(),
            R.layout.widget_feriadapp
        );

        views.setTextViewText(R.id.widget_title, title);
        views.setTextViewText(R.id.widget_days, days != null ? days : "--");
        views.setTextViewText(R.id.widget_label, label != null ? label : "días");
        views.setTextViewText(R.id.widget_name, name != null ? name : "Abrí Feriadapp");

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    public static void updateAll(Context context) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        ComponentName componentName = new ComponentName(context, FeriadappWidgetProvider.class);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(componentName);

        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }
}
