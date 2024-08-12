'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { roomsRoute } from '../routes'
import { roomQueryKeys } from './room-query-keys'
export function useDeleteRoom() {
  const queryClient = useQueryClient()
  const deleteRoomFn = async (id: string) => {
    const response = await apiClient.delete(`${roomsRoute}/${id}`)
    return response
  }

  return useMutation({
    mutationFn: deleteRoomFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: roomQueryKeys.all })
    },
    onSuccess: () => {
      toast.success('Excluir Sala', {
        description: 'Sala excluído com sucesso',
      })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: roomQueryKeys.all })
      toast.error('Erro ao excluir Sala', {
        description: 'Erro ao excluir Sala',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: roomQueryKeys.all })
    },
  })
}
