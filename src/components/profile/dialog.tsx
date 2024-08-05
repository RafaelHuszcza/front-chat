'use client'
import { Session } from 'next-auth'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { UserForm } from './user-form'

interface ProfileDialogProps {
  isOpen: boolean
  onOpenChange: () => void
  user: Session['user']
}

export function ProfileDialog({
  isOpen,
  onOpenChange,
  user,
}: ProfileDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-auto flex-col rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center">Editar Perfil</DialogTitle>
        </DialogHeader>
        <UserForm user={user} cancelAction={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
