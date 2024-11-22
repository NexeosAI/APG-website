import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<T> {
  columns: {
    accessorKey?: string
    id?: string
    header: string
    cell?: ({ row }: { row: { original: T } }) => ReactNode
  }[]
  data: T[]
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const getValue = (obj: T, path: string): ReactNode => {
    const value = path.split('.').reduce((acc: unknown, part) => {
      return acc && (acc as Record<string, unknown>)[part]
    }, obj)
    
    // Convert the value to a string to ensure it's a valid ReactNode
    return value?.toString() || ''
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || column.accessorKey}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell key={column.id || column.accessorKey}>
                  {column.cell
                    ? column.cell({ row: { original: row } })
                    : column.accessorKey
                    ? getValue(row, column.accessorKey)
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 