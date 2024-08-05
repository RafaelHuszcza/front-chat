'use client'

import { CornerDownLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function Form({ className }: { className?: string }) {
  return (
    <form
      className={cn([
        'relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring ',
        className,
      ])}
    >
      <Label htmlFor="message" className="sr-only">
        Mensagem
      </Label>
      <Textarea
        id="message"
        placeholder="Escreva sua mensagem..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  )
}
