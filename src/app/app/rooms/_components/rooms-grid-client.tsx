'use client '

import { useRooms } from '@/api-uses/rooms'

import { Room } from '../_data/schema'
import { columns } from './columns'
import { DataGrid } from './data-grid'

export function RoomsGridClient() {
  const { data: rooms, isLoading, isSuccess } = useRooms()
  return (
    <div className="flex h-full w-full flex-col">
      {isLoading && <p className="m-auto text-center">Carregando...</p>}
      {isSuccess && (
        <DataGrid columns={columns} data={rooms as unknown as Room[]} />
      )}
    </div>
  )
}
