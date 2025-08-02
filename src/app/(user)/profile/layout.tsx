import ProfileSidebar from '@/modules/profile/components/ProfileSidebar'
import React, { ReactNode } from 'react'

const ProfileLayout = ({ children}: {children: ReactNode}) => {

  return (
    <main className='max-w-[1200px] mx-auto pt-10  grid grid-cols-[290px,1fr] gap-x-5'>
        <ProfileSidebar />
        {children}
    </main>
  )
}

export default ProfileLayout