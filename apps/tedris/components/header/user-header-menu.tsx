'use client'

import { signOut, useSession } from 'next-auth/react'
import { CircleNotchIcon, UserIcon } from '@madrasah/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@madrasah/ui/components/dropdown-menu'

export const UserHeaderMenu = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <CircleNotchIcon className="h-6 w-6 animate-spin" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Profile</DropdownMenuItem>
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
