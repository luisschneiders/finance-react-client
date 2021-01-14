import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonAvatar,
  IonProgressBar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonImg,
  isPlatform
} from '@ionic/react';
import './Account.scss';
import { updateProfile } from '../../data/api/Firebase';
import { toast } from '../../components/toast/Toast';
import { StatusColor } from '../../enum/StatusColor';
import { delay } from '../../util/delay';
import { RouteComponentProps } from 'react-router';
import { setDisplayName, setPhotoURL } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import useFirebaseUpload from '../../hooks/useFirebaseUpload';
import LsImgPlaceholder from '../../components/img/ImgPlaceholder';
import { SIZE_64, BORDER_RADIUS_50, SIZE_48 } from '../../constants/Images';

interface OwnProps extends RouteComponentProps {}
interface StateProps {
  displayName?: string | null | undefined,
  photoURL?: string | null | undefined
}
interface DispatchProps {
  setDisplayName: typeof setDisplayName;
  setPhotoURL: typeof setPhotoURL;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({
    setDisplayName,
    displayName,
    setPhotoURL,
    photoURL
  }) => {

  const [username, setUsername] = useState<string | null | undefined>();
  const [busy, setBusy] = useState(false);
  const [{ data, isError, progress }, setFileData ] = useFirebaseUpload();
  const [isImageLoaded, setImageLoaded] = useState(false);
  const ios: boolean = isPlatform('ios');
  const onImgLoaded = () => {
    setImageLoaded(true);
  };

  const altImage: any = displayName;

  const account = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    const response: any = await updateProfile({
      displayName: username ? username : displayName,
      photoURL: data?.downloadUrl ? data?.downloadUrl : photoURL });
    await delay(500);
    setBusy(false);
    if (response) {
      setUsername(null);
      setDisplayName(username ? username : displayName);
      setPhotoURL(data?.downloadUrl ? data?.downloadUrl : photoURL);
      toast('Successfully updated!', StatusColor.DEFAULT);
    }
  }

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Updating..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <form noValidate onSubmit={account}>
          <IonCard>
            <IonCardHeader class="ion-text-center">
              <IonCardTitle>
                {displayName ? displayName : username}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="account account__avatar">
                <IonAvatar>
                  {!isImageLoaded && <LsImgPlaceholder size={ios ? SIZE_48 : SIZE_64} radius={BORDER_RADIUS_50}></LsImgPlaceholder>}
                  {photoURL ? <IonImg src={photoURL} alt={altImage} onIonImgDidLoad={onImgLoaded}/> : data && <IonImg src={data.downloadUrl} alt={data.metaData.name} onIonImgDidLoad={onImgLoaded}/>}
                </IonAvatar>

                <IonButton className="account account__fileUpload" fill="clear">
                  <span>Select Image</span>
                  <input type="file" accept="image/jpg" className="upload"
                    onChange={(e: any) => {
                      setPhotoURL('');
                      setFileData(e.target.files[0]);
                    }}/>
                </IonButton>

                {progress && (
                  <IonProgressBar value={progress.value}></IonProgressBar>
                )}
                {isError && <div>Error: {isError.message}</div>}

              </div>

            </IonCardContent>
          </IonCard>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text"
                        value={username} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setUsername(e.detail.value!)}
                        required>
              </IonInput>
            </IonItem>
          </IonList>
          <IonRow className="ion-padding-top">
            <IonCol>
              <IonButton type="submit" fill="solid" expand="block">Update</IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    displayName: state.userReducer.displayName,
    photoURL: state.userReducer.photoURL,
  }),
  mapDispatchToProps: {
    setDisplayName,
    setPhotoURL,
  },
  component: Account
});
