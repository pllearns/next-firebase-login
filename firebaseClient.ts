import firebase from 'firebase'

const FIREBASE_CONFIG = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.IREBASE_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

export default function firebaseClient() {
  if(!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
  }
}