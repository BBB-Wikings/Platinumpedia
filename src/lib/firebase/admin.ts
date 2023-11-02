import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL } from '$env/static/private';
import { PUBLIC_PROJECT_ID } from '$env/static/public';
import { credential } from 'firebase-admin';

const firebaseConfig = {
	credential: credential.cert({
		privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
		clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
		projectId: PUBLIC_PROJECT_ID
	}),
	databaseURL: `https://${PUBLIC_PROJECT_ID}.firebaseio.com`
};
export const firebase = initializeApp();
export const auth = getAuth(firebase);
export const firestore = getFirestore();
