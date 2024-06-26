'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { filters } from '../_data/data'
import { CreateRoomModal } from './create-room-modal'
import { JoinRoomModal } from './join-room-modal'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataGridToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [filter, setFilter] = useState<string>(filters[0].value)

  return (
    <div className="flex flex-wrap  items-center justify-center gap-2">
      <Input
        placeholder="Digite o filtro"
        value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(filter)?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] bg-background lg:w-[250px]"
      />
      <Select defaultValue={filter} onValueChange={(e: string) => setFilter(e)}>
        <SelectTrigger className="w-48 bg-background ">
          <SelectValue placeholder="Selecione o filtro" />
        </SelectTrigger>
        <SelectContent>
          {filters.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button
          variant="destructive"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Limpar Filtros
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
      <CreateRoomModal />
      <JoinRoomModal />
    </div>
  )
}
