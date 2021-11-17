import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useApplicationContext } from '../modules/context/ApplicationContext';
import useFirebase from './useFirebase';

const useUpload = () => {
  const { storage } = useFirebase();
  const { state } = useApplicationContext();

  const image = async (file: File) => {
    const storageRef = ref(storage, `images/${state.user?.id}/${file.name}`);

    const metadata = {
      contentType: 'image',
    };

    await uploadBytes(storageRef, file, metadata);

    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  };

  return {
    image,
  };
};

export default useUpload;
