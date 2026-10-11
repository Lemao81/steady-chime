import { NativeModule, requireOptionalNativeModule } from 'expo'

declare class ExactAlarmModule extends NativeModule {
  canScheduleExactAlarms(): boolean
  openExactAlarmSettings(): Promise<void>
}

export default requireOptionalNativeModule<ExactAlarmModule>('ExactAlarm')
