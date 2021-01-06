import * as firebase from 'firebase/app';
import 'firebase/storage';
import { useState, useEffect } from 'react';

interface UploadDataResponse { metaData: firebase.storage.FullMetadata, downloadUrl: any };
interface ProgressResponse { value: number };

const storageRef = firebase.storage().ref();

function useFirebaseUpload(): [{
  data: UploadDataResponse | undefined,
  isLoading: boolean,
  isError: any,
  progress: ProgressResponse | null
}, Function] {
  const [data, setData] = useState<UploadDataResponse | undefined>();
  const [fileData, setFileData] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>(false);
  const [progress, setProgress] = useState<ProgressResponse | null>(null);

  useEffect(() => {
    const uploadData = async () => {
      setIsError(false);
      setIsLoading(false);
      setProgress({ value: 0 });
      
      if (!fileData) {
        return;
      }

      try {
        let fName = `${(new Date()).getTime()}-${fileData.name}`;
        let ref = storageRef.child('images/avatar/' + fName);
        let uploadTask = ref.put(fileData);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (_progress: any) => {
            let value = (_progress.bytesTransferred / _progress.totalBytes);
            setProgress({ value });
          },
          (_error: any) => {
            setIsError(_error);
            setIsLoading(false);
          },
          async () => {
            setIsError(false);
            setIsLoading(false);

            let downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

            setData({
              metaData: uploadTask.snapshot.metadata,
              downloadUrl
            });

            setProgress(null);
          }
        )
      } catch(_error) {
        setIsError(_error);
        setIsLoading(false);
      }
    };

    fileData && uploadData();
  }, [fileData]);

  return [{ data, isLoading, isError, progress }, setFileData];
}

export default useFirebaseUpload;
