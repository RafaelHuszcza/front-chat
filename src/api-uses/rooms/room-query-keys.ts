import { roomsRoute } from '../routes'

export const roomQueryKeys = {
  all: [roomsRoute],
  details: () => [...roomQueryKeys.all, 'detail'],
  detail: (id: string) => [...roomQueryKeys.details(), id],
}
