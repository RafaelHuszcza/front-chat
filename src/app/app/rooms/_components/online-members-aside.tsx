'use client'
import { MenuIcon, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Member } from './chat'

export default function OnlineMembersAside({ members }: { members: Member[] }) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setCollapsed(true);
    }
  };
  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <aside
      className={cn(
        'w-64 flex-col border-r duration-500 hidden sm:flex',
        collapsed ? 'w-16' : 'w-72',
      )}
    >
      <header
        className={cn(
          'flex h-12 items-center justify-between border-b p-0',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        <h2
          className={cn([
            'w-full text-center text-lg font-semibold ',
            collapsed ? 'hidden' : '',
          ])}
        >
          Membros
        </h2>
        <Users className=" block sm:hidden" />
        <Button variant="ghost" className="hidden sm:block" onClick={toggleCollapsed}>
          <MenuIcon />
        </Button>
      </header>
      <main className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden p-4">
        {members.map((member) => (
          <div key={member.id} className="flex h-12 items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className={cn([collapsed ? 'hidden' : ''])}>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-muted-foreground">
                {member.email}
              </div>
            </div>
          </div>
        ))}
      </main>
    </aside>
  )
}
