export type RecordValue = string | number | boolean | null | undefined | Date | RecordValue[]

export interface GenericRecord {
  [key: string]: RecordValue
} 