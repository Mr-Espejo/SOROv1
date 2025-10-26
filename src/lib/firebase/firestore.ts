'use client';

import { addDoc, collection, Firestore, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type LeadData = {
    name?: string | undefined;
    email: string;
    phone?: string | undefined;
    clinicName?: string | undefined;
    source: string;
}

export const saveLead = (db: Firestore, data: LeadData) => {
    const leadsCollection = collection(db, 'leads');
    const leadPayload = {
        ...data,
        createdAt: serverTimestamp()
    };
    
    // Non-blocking write with specific permission error handling
    addDoc(leadsCollection, leadPayload).catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: leadsCollection.path,
            operation: 'create',
            requestResourceData: leadPayload,
        });

        // Emit the contextual error for the global listener
        errorEmitter.emit('permission-error', permissionError);
    });
};
