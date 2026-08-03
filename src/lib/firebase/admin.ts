import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

type ServiceAccountShape = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function readServiceAccount(): ServiceAccountShape | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as Partial<ServiceAccountShape>;

  if (!parsed.projectId || !parsed.clientEmail || !parsed.privateKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is missing required Firebase service account fields.');
  }

  return {
    projectId: parsed.projectId,
    clientEmail: parsed.clientEmail,
    privateKey: parsed.privateKey.replace(/\\n/g, '\n'),
  };
}

function getAdminApp() {
  const existingApp = getApps()[0];
  if (existingApp) {
    return existingApp;
  }

  const serviceAccount = readServiceAccount();

  if (serviceAccount) {
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return initializeApp();
}

export function getAdminFirestore() {
  return getFirestore(getAdminApp());
}
