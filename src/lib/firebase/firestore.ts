'use client';

import { addDoc, collection, Firestore, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type LeadData = {
    name?: string | undefined;
    email: string;
    phone?: string | undefined;
    clinicName?: string | undefined;
    contactAndClinic?: string | undefined;
    source: string;
    collectionName?: string | undefined;
}

export const saveLead = (db: Firestore, data: LeadData) => {
    const { collectionName = 'leads', ...leadData } = data;
    const leadsCollection = collection(db, collectionName);
    const leadPayload = {
        ...leadData,
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
