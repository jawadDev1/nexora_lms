import ProfileSidebar from '@/modules/profile/components/ProfileSidebar'
import React, { ReactNode } from 'react'

const ProfileLayout = ({ children}: {children: ReactNode}) => {

  return (
    <main className='max-w-[1200px] mx-auto pt-10 px-2 lg:px-1  grid grid-cols-[18%,1fr] lg:grid-cols-[290px,1fr] gap-x-5'>
        <ProfileSidebar />
        {children}
    </main>
  )
}

export default ProfileLayout