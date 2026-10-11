import { useSyncExternalStore } from 'react'
import { getPermissions, subscribeToPermissions } from '@/notifications/permissions'
import type { ChimePermissions } from '@/types'

export function useChimePermissions(): ChimePermissions | null {
  return useSyncExternalStore(subscribeToPermissions, getPermissions)
}
