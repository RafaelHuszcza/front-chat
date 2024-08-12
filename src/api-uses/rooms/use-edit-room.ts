'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { roomsRoute } from '../routes'
import { roomQueryKeys } from './room-query-keys'
export interface Room {
  subject: string
}
export function useEditRoom() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const editRoomFn = async (updatedRoom: Room) => {
    const response = await apiClient.put(`${roomsRoute}/${id}`, updatedRoom)
    return response
  }

  return useMutation({
    mutationFn: editRoomFn,
    onMutate: async (updatedRoom) => {
      await queryClient.cancelQueries({
        queryKey: roomQueryKeys.detail(id.toString()),
      })
      const previousRoom = queryClient.getQueryData(
        roomQueryKeys.detail(id.toString()),
      )
      queryClient.setQueryData(roomQueryKeys.detail(id.toString()), updatedRoom)
      return { previousRoom, updatedRoom }
    },
    onSuccess: () => {
      toast.success('Sala', {
        description: 'Sala editado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err, newRoom, context?: any) => {
      console.log('Error creating new room', err)
      toast.error('Room', {
        description: 'Erro ao editar Room',
      })
      queryClient.setQueryData(roomQueryKeys.all, context.previousRoom)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: roomQueryKeys.all })
    },
  })
}
