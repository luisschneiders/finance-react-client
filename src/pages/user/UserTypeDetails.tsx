import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTitle,
  IonButton,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import { UserType } from '../../models/UserType';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsUserType from '../../data/userType/userType.selectors';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import { toast } from '../../components/toast/Toast';
import { setUserTypeById, updateUserType } from '../../data/userType/userType.actions';
import { UserProfileServer } from '../../models/UserProfileServer';
import { userTypeOptions } from './UserTypeOptions';


interface OwnProps extends RouteComponentProps<{
  id: string;
}>{}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  userType: UserType | undefined;
  userTypeById: UserType;
};

interface DispatchProps {
  setUserTypeById: typeof setUserTypeById;
  updateUserType: typeof updateUserType;
};

interface UserTypeDetailsProps extends OwnProps, StateProps, DispatchProps {};

const UserTypeDetailsPage: React.FC<UserTypeDetailsProps> = ({
    isLoggedIn,
    userProfileServer,
    match,
    userType,
    userTypeById,
    setUserTypeById,
    updateUserType,
  }) => {

    const [userTypeDescription, setUserTypeDescription] = useState<string>('');
    const [userTypeOptionsList, setUserTypeOptionsList] = useState<any[]>([]);
    const [userTypeRates, setUserTypeRates] = useState<number>(1);
    const [userTypeOption, setUserTypeOption] = useState<number>();

    const [isById, setIsById] = useState<boolean>(false);

    const userActionsOptions = async () => {
      const actions = userTypeOptions();
      setUserTypeOptionsList(await actions);
    }

    useEffect(() => {
      userActionsOptions();
      if (isLoggedIn && userProfileServer) {
        // If user refresh the page, fetch the User by id only once
        if (!userType && !isById) {
          setUserTypeById(userProfileServer.userId, parseInt(match.params.id));
          setIsById(true);
        }
      }
      console.log('LFS - userType: ', userType);
      console.log('LFS - userTypeById: ', userTypeById);
      if (userType) {
        setUserTypeDescription(userType.userTypeDescription);
        setUserTypeRates(userType.userTypeRates);
        setUserTypeOption(userType.userTypeOptions);
      } else if (userTypeById) {
        setUserTypeDescription(userTypeById.userTypeDescription);
        setUserTypeRates(userTypeById.userTypeRates);
        setUserTypeOption(userTypeById.userTypeOptions);
      }

    }, [
      isLoggedIn,
      userProfileServer,
      userType,
      match,
      userTypeById,
      setUserTypeById,
      isById,
    ]);

    const formUserType = async (e: React.FormEvent) => {
      e.preventDefault();

      if (userTypeDescription.trim() === '') {
        return toast('Description is required!', StatusColor.WARNING);
      }
      if (userTypeOption === undefined) {
        return toast('Type is required!', StatusColor.WARNING);
      }

      const newUserType: UserType = userType || userTypeById;
      newUserType.userTypeDescription = userTypeDescription;
      newUserType.userTypeOptions = userTypeOption;
      newUserType.userTypeRates = userTypeRates;

      updateUserType(newUserType);
    }

  return (
    <IonPage id="news-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.SETUP_USER_TYPE}></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            Update <span className="ion-text-underline"> {userTypeDescription}</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={formUserType}>
          <IonList>
            <IonItem lines="full" disabled={!userType && !userTypeById}>
              <IonLabel position="stacked" color={AppColor.PRIMARY}>Description</IonLabel>
              <IonInput name="userTypeDescription" type="text"
                        value={userTypeDescription} spellCheck={false} autocapitalize="off"
                        onIonChange={(e: any) => setUserTypeDescription(e.detail.value!)} required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Type</IonLabel>
              <IonSelect
                onIonChange={e => setUserTypeOptionsList(e.detail.value)}
                value={userTypeOption}
              >
                {userTypeOptionsList.map((option: any, index: number) => (
                  <IonSelectOption 
                    key={index}
                    value={option.value}
                  >
                    {option.description}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Rates</IonLabel>
              <IonInput
                type="number"
                step="0.01"
                name="userTypeRates"
                value={userTypeRates}
                onIonChange={(e: any) => setUserTypeRates(e.detail.value!)}
                min="0"
              />
            </IonItem>
            <IonItem lines="none" disabled={!userType && !userTypeById}>
              <div slot="end">
                <IonButton type="submit" fill="outline" >Update</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    userType: selectorsUserType.getUserTypeFromList(state, OwnProps),
    userTypeById: selectorsUserType.getUserType(state),
  }),
  mapDispatchToProps: ({
    setUserTypeById,
    updateUserType,
  }),
  component: withRouter(UserTypeDetailsPage)
});
