import { initializeApp } from 'firebase/app';

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC4zMrKNTvl3OUkm1uXYi7tLvWO3Dy9jjM',
    authDomain: 'vem-pro-fut-aa81d.firebaseapp.com',
    projectId: 'vem-pro-fut-aa81d',
    storageBucket: 'vem-pro-fut-aa81d.appspot.com',
    messagingSenderId: '177049543023',
    appId: '1:177049543023:web:5212612a3e6e4f60aac89a',
  };

  return initializeApp(firebaseConfig);
};

export default useFirebase;
