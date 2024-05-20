'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Room } from '../_data/schema'

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'id',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ownerId',

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'subject',
    enableSorting: false,
    enableHiding: false,
  },
]
