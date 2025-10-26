"use client";

import React, { useState, useEffect } from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';
import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: React.ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    const firebaseInstances = initializeFirebase();
    setFirebase(firebaseInstances);
  }, []);

  if (!firebase) {
    // You can return a loader here if you want
    return null;
  }

  return (
    <FirebaseProvider 
      app={firebase.app} 
      auth={firebase.auth} 
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
