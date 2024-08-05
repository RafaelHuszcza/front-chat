'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { apiClient } from '../api-client'
import { roomsRoute } from '../routes'
import { roomQueryKeys } from './room-query-keys'
import { Room } from './use-edit-room'

const createRoomFn = async (newRoom: Room) => {
  try {
    const response = await apiClient.post(roomsRoute, newRoom)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response
    } else {
      throw error
    }
  }
}

export function useCreateRoom() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: createRoomFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: roomQueryKeys.all })
    },
    onSuccess: (data) => {
      toast.success('Sala', {
        description: 'Sala criado com sucesso',
      })
      router.push(`/app/rooms/${data.id}`)
    },

    onError: async (error) => {
      let errorMessage: string = 'Erro ao criar Sala'
      if (
        (
          error as unknown as {
            data: { message: string }
          }
        )?.data?.message
      ) {
        errorMessage = (
          error as unknown as {
            data: { message: string }
          }
        )?.data?.message
      }

      toast.error('Erro ao Criar Sala', {
        description: errorMessage,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: roomQueryKeys.all })
    },
  })
}
