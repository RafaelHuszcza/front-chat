import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, ButtonProps } from './ui/button'

interface CopyButtonProps extends ButtonProps {
  value: string
  text?: string
}

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  text,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)
  async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value)
  }
  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      variant={variant}
      className={cn('space-x-2', className)}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      {text && <span className="flex-1">{text}</span>}
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
