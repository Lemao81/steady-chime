import type { ActivityState, ChimePermissions, PermissionNotice } from '@/types';

export function permissionNotice(activityState: ActivityState, permissions: ChimePermissions): PermissionNotice | null {
  if (permissions.notifications === 'denied') {
    return 'notifications-denied';
  }

  if (activityState === 'active' && !permissions.exactAlarms) {
    return 'exact-alarms-denied';
  }

  return null;
}
