import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC4zMrKNTvl3OUkm1uXYi7tLvWO3Dy9jjM',
    authDomain: 'vem-pro-fut-aa81d.firebaseapp.com',
    projectId: 'vem-pro-fut-aa81d',
    storageBucket: 'vem-pro-fut-aa81d.appspot.com',
    messagingSenderId: '177049543023',
    appId: '1:177049543023:web:5212612a3e6e4f60aac89a',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);

  return {
    app,
    auth,
    storage,
    firestore,
  };
};

export default useFirebase;
