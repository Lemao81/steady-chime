import { useEffect, useState } from 'react'
import { subscribeToChimeSync } from '@/notifications/chimes'
import { scheduledChimeCount } from '@/notifications/dev-chimes'

export function useScheduledChimeCount(): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    function refresh(): void {
      void scheduledChimeCount().then(setCount, () => undefined)
    }

    refresh()

    return subscribeToChimeSync(refresh)
  }, [])

  return count
}
