'use client'
import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { roomsRoute } from '../routes'
import { roomQueryKeys } from './room-query-keys'
export function useRoom(id: string) {
  const getRoomFn = async () => {
    const response = await apiClient.get(`${roomsRoute}/${id}`)
    return response.data
  }

  return useQuery({
    queryKey: roomQueryKeys.detail(id.toString()),
    queryFn: getRoomFn,
    retry: 1,
  })
}
