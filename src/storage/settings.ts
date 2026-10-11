import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_SETTINGS } from '@/constants'
import { parseSettings } from '@/domain/settings'
import type { Settings } from '@/types'

const SETTINGS_KEY = 'settings'

const listeners = new Set<() => void>()

let current: Settings | null = null
let loading: Promise<void> | null = null

function notify(): void {
  for (const listener of listeners) {
    listener()
  }
}

export function getSettings(): Settings | null {
  return current
}

export function subscribeToSettings(listener: () => void): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function loadSettings(): Promise<void> {
  loading ??= AsyncStorage.getItem(SETTINGS_KEY)
    .catch(() => null)
    .then((raw) => {
      current = parseSettings(raw)
      notify()
    })

  return loading
}

export async function updateSettings(changes: Partial<Settings>): Promise<void> {
  await loadSettings()
  current = { ...DEFAULT_SETTINGS, ...current, ...changes }
  notify()
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(current)).catch(() => undefined)
}
