'use client';

import { addDoc, collection, Firestore, serverTimestamp } from 'firebase/firestore';

type LeadData = {
    name?: string | undefined;
    email: string;
    phone?: string | undefined;
    clinicName?: string | undefined;
    source: string;
}

export const saveLead = async (db: Firestore, data: LeadData) => {
    const leadsCollection = collection(db, 'leads');
    await addDoc(leadsCollection, {
        ...data,
        createdAt: serverTimestamp()
    });
};
