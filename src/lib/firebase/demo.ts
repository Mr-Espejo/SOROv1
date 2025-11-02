'use client';

import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Type for the combined form data
type DemoFormData = {
  clinicName?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  city?: string;
  address?: string;
  openingHours?: string;
  testMode?: 'qr_connect' | 'sandbox' | 'expert_call';
};

// This function creates both clinic and demo_request documents initially
export const createInitialDemoDocuments = (
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
    countryCode: data.countryCode,
  };

  const demoRequestPayload = {
    id: clinicId,
    clinicId: clinicId,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  // Create Clinic doc
  setDoc(clinicRef, clinicPayload, { merge: true }).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: clinicRef.path,
      operation: 'create',
      requestResourceData: clinicPayload,
    });
    errorEmitter.emit('permission-error', permissionError);
  });

  // Create DemoRequest doc
  setDoc(demoRequestRef, demoRequestPayload, { merge: true }).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: demoRequestRef.path,
      operation: 'create',
      requestResourceData: demoRequestPayload,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};

// This function updates the existing documents
export const updateDemoDocuments = (
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

  if (Object.keys(clinicData).length > 0) {
    updateDoc(clinicRef, clinicData).catch((serverError) => {
        const permissionError = new FirestorePermissionError({
        path: clinicRef.path,
        operation: 'update',
        requestResourceData: clinicData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }

  // Update DemoRequest doc if there's a testMode
  if (data.testMode) {
     const demoRequestData = { testMode: data.testMode, status: 'in_progress' };
     updateDoc(demoRequestRef, demoRequestData).catch((serverError) => {
        const permissionError = new FirestorePermissionError({
        path: demoRequestRef.path,
        operation: 'update',
        requestResourceData: demoRequestData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }
};

    