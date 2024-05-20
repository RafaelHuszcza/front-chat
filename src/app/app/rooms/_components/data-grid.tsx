'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Room } from '../_data/schema'
import { DataGridToolbar } from './data-grid-toolbar'
import { RoomsCard } from './rooms-card'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataGrid<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="flex h-full flex-1 flex-col space-y-4 pt-8">
      <DataGridToolbar table={table} />
      <div className="flex h-full w-full flex-wrap content-start justify-center  gap-4 overflow-auto">
        {table.getRowModel().rows?.length > 0 &&
          table.getRowModel().rows.map((row) => {
            const room = row.getVisibleCells()[0].row.original as Room

            return <RoomsCard key={row.id} room={room} />
          })}
      </div>
    </div>
  )
}
