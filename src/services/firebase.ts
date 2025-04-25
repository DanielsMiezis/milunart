import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp,
  where
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth functions
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Firestore functions
export interface Artwork {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnail?: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  featured?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const getArtworks = async (): Promise<Artwork[]> => {
  const artworksQuery = query(collection(db, 'artworks'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(artworksQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Artwork));
};

export const getFeaturedArtworks = async (): Promise<Artwork[]> => {
  const artworksQuery = query(
    collection(db, 'artworks'), 
    where('featured', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(artworksQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Artwork));
};

export const addArtwork = async (artwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>) => {
  return addDoc(collection(db, 'artworks'), {
    ...artwork,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
};

export const updateArtwork = async (id: string, artwork: Partial<Omit<Artwork, 'id' | 'createdAt'>>) => {
  const docRef = doc(db, 'artworks', id);
  return updateDoc(docRef, {
    ...artwork,
    updatedAt: Timestamp.now()
  });
};

export const deleteArtwork = async (id: string) => {
  return deleteDoc(doc(db, 'artworks', id));
};

// Storage functions
export const uploadImage = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const deleteImage = async (path: string) => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};

export { app, auth, db, storage };