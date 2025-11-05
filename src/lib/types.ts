
import type { Timestamp } from 'firebase/firestore';

export type Lead = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  clinicName?: string;
  source: string;
  createdAt: Timestamp;
};
