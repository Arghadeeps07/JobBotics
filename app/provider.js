'use client';

import { db } from '@/utils/db';
import { userTable } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';

const Provider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      checkNewUser();
    }
  }, [isLoaded, isSignedIn, user]);

  const checkNewUser = async () => {
    // const result = await db
    //   .select()
    //   .from(userTable)
    //   .where(eq(userTable.email, user?.primaryEmailAddress?.emailAddress));

    // console.log(result);

    // if (result?.length === 0) {
    //   const userResp = await db
    //     .insert(userTable)
    //     .values({
    //       name: user?.fullName,
    //       email: user?.primaryEmailAddress?.emailAddress,
    //     })
    //     .returning({ id: userTable.id });

    //   console.log(userResp);
    // }

    const resp=await axios.post('/api/create-user', {user:user});
    console.log(resp.data);
    
  };

  return <div>{children}</div>;
};

export default Provider;
 