package com.lemao81.steadychime.chimetray

import android.content.Context
import android.os.Build
import expo.modules.notifications.notifications.model.Notification
import expo.modules.notifications.notifications.model.NotificationBehaviorRecord
import expo.modules.notifications.service.delegates.ExpoPresentationDelegate

class ChimePresentationDelegate(context: Context) : ExpoPresentationDelegate(context) {
  override suspend fun createNotification(
    notification: Notification,
    notificationBehavior: NotificationBehaviorRecord?,
  ): android.app.Notification {
    val built = super.createNotification(notification, notificationBehavior)
    val timeoutAfterMs = notification.notificationRequest.content.body?.optLong(TIMEOUT_AFTER_MS_KEY) ?: 0

    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O || timeoutAfterMs <= 0) {
      return built
    }

    return android.app.Notification.Builder.recoverBuilder(context, built)
      .setTimeoutAfter(timeoutAfterMs)
      .build()
  }

  private companion object {
    const val TIMEOUT_AFTER_MS_KEY = "timeoutAfterMs"
  }
}
