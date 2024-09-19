import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { SignedIn, SignIn, useUser } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';

import { Button } from './ui/button';
import { BriefcaseBusiness, PenBox, Heart } from 'lucide-react';


const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch]  = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if(search.get('sign-in')) {
      setShowSignIn(true);
    }
  }, [search]);



  const handleOverlayClick = (e) => {
     if(e.target === e.currentTarget) {
       setShowSignIn(false)
       setSearch({});
     }
  }

  return (
    <>
     <nav className='py-4 px-4 flex justify-between items-center'>
        <Link>
           <img src='/logo.png' alt='Hirrd logo' className='h-28'/>
        </Link>
      
    <header className='flex gap-8'>
      <SignedOut>
      <Button variant = "outline" onClick={() => setShowSignIn(true)}>Login</Button>
    
      </SignedOut>
      <SignedIn>
        {user?.unsafeMetadata?.role === "recruiter" && (
          <Link to="/post-job">
               <Button variant="destructive" className="rounded-full">
        <PenBox size={20} className='mr-2' />
          Post a Job
        </Button>
          </Link>
       ) }
        <UserButton 
           appearance={{
              elements: {
                  avatarBox: "w-10 h-10",
              },
           }}
           
           >

            <UserButton.MenuItems>
              <UserButton.Link
                label='My Jobs'
                labelIcon={<BriefcaseBusiness size={15} />}
                href='/my-jobs'
                />

               <UserButton.Link
                label='Saved Jobs'
                labelIcon={<Heart  size={15} />}
                href='/saved-jobs'
                /> 
            </UserButton.MenuItems>

        </UserButton>
      </SignedIn>
      </header>
 
     </nav>

     {showSignIn && <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
      
       <SignIn
        signUpForceRedirectUrl='/onboarding'
        fallbackRedirectUrl='/onboarding'
        />
        
      </div>}
    </>
  )
}

export default Header;