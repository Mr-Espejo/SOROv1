'use client';

import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

// Type for the combined form data
type DemoFormData = {
  clinicName?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
  openingHours?: string;
  testMode?: 'qr_connect' | 'sandbox' | 'expert_call';
};

// This function creates both clinic and demo_request documents initially
export const createInitialDemoDocuments = async (
  db: Firestore,
  clinicId: string,
  data: Partial<DemoFormData>
) => {
  const clinicRef = doc(db, 'clinics', clinicId);
  const demoRequestRef = doc(db, 'demo_requests', clinicId); // Use same ID for simplicity

  const clinicPayload = {
    id: clinicId,
    name: data.clinicName,
    email: data.email,
    phone: data.phone,
  };

  const demoRequestPayload = {
    id: clinicId,
    clinicId: clinicId,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  // Using Promise.all to run writes in parallel
  await Promise.all([
    setDoc(clinicRef, clinicPayload, { merge: true }),
    setDoc(demoRequestRef, demoRequestPayload, { merge: true })
  ]);
};

// This function updates the existing documents
export const updateDemoDocuments = async (
  db: Firestore,
  clinicId: string,
  data: Partial<DemoFormData>
) => {
  const clinicRef = doc(db, 'clinics', clinicId);
  const demoRequestRef = doc(db, 'demo_requests', clinicId);
  
  const payload: Partial<DemoFormData> = {};
  if (data.city) payload.city = data.city;
  if (data.address) payload.address = data.address;
  if (data.openingHours) payload.openingHours = data.openingHours;
  if (data.testMode) payload.testMode = data.testMode;


  // Update Clinic doc if there's relevant data
  const clinicData: Partial<DemoFormData> = {};
   if (data.city) clinicData.city = data.city;
   if (data.address) clinicData.address = data.address;
   if (data.openingHours) clinicData.openingHours = data.openingHours;

  const updatePromises = [];

  if (Object.keys(clinicData).length > 0) {
    updatePromises.push(updateDoc(clinicRef, clinicData));
  }

  // Update DemoRequest doc if there's a testMode
  if (data.testMode) {
     const demoRequestData = { testMode: data.testMode, status: 'in_progress' };
     updatePromises.push(updateDoc(demoRequestRef, demoRequestData));
  }

  if (updatePromises.length > 0) {
    await Promise.all(updatePromises);
  }
};
