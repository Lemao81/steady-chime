import { useEffect, useState } from 'react'
import { AppState } from 'react-native'
import { minuteOfDay, msUntilNextMinute } from '@/utils/clock'

export function useMinuteOfDay(): number {
  const [minute, setMinute] = useState(() => minuteOfDay(new Date()))

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    function tick(): void {
      const now = new Date()

      clearTimeout(timer)
      setMinute(minuteOfDay(now))
      timer = setTimeout(tick, msUntilNextMinute(now))
    }

    tick()

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        tick()
      }
    })

    return () => {
      clearTimeout(timer)
      subscription.remove()
    }
  }, [])

  return minute
}
