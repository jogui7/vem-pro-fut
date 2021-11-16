export const IMAGE_DEFAULT_COVER_PATH = '/images/empty-image.png';

export interface IMedia {
  id?: string;
  url: string;
  file?: File;
}

export const getMediaCover = (media?: IMedia) => media?.url || IMAGE_DEFAULT_COVER_PATH;

export const readImageAsBase64 = async (file: any): Promise<string | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(event?.target?.result);
      }
    };
    reader.onerror = (event) => {
      process.stdout.write('error on read file');
      if (event.target) reject(event.target.result);
      reader.abort();
    };
    reader.readAsDataURL(file);
  });
