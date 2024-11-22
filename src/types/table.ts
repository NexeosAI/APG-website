export interface DataTableProps<T> {
  columns: {
    accessorKey?: string
    id?: string
    header: string
    cell?: ({ row }: { row: { original: T } }) => React.ReactNode
  }[]
  data: T[]
} 