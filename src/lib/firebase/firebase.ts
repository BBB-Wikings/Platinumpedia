import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import {
	PUBLIC_API_KEY,
	PUBLIC_APP_ID,
	PUBLIC_AUTH_DOMAIN,
	PUBLIC_MEASUREMENT_ID,
	PUBLIC_MESSAGING_SENDER_ID,
	PUBLIC_PROJECT_ID,
	PUBLIC_STORAGE_BUCKET
} from '$env/static/public';

const firebaseConfig: {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
} = {
	apiKey: PUBLIC_API_KEY,
	authDomain: PUBLIC_AUTH_DOMAIN,
	projectId: PUBLIC_PROJECT_ID,
	storageBucket: PUBLIC_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
	appId: PUBLIC_APP_ID,
	measurementId: PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
