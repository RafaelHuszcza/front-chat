import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { apiClient } from '../api-client'
import { roomsRoute } from '../routes'
import { roomQueryKeys } from './room-query-keys'

export function useRooms() {
  const getRoomsFn = async () => {
    try {
      const response = await apiClient.get(`${roomsRoute}`)
      return response.data
    } catch (err) {
      return []
    }
  }

  return useQuery({
    queryKey: roomQueryKeys.all,
    queryFn: () => getRoomsFn(),
    placeholderData: keepPreviousData,
  })
}
