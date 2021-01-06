import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonLoading,
} from '@ionic/react';
import './Home.scss';
import { connect } from '../../data/connect';
// import { News } from '../../models/News';
// import * as selectors from '../../data/news/news.selectors';
import * as selectorsUser from '../../data/user/user.selectors';
import LsTimeTransition from '../../components/time/TimeTransition';
import LsAppSummary from '../../components/summary/AppSummary';
import { getUserProfileServer } from '../../data/user/user.actions';

interface StateProps {
  // news: News | null;
  isLoggedIn: boolean;
}
interface DispatchProps {
  getUserProfileServer: typeof getUserProfileServer;
}
interface HomeProps extends StateProps, DispatchProps {}

const Home: React.FC<HomeProps> = ({
    // news,
    isLoggedIn,
    getUserProfileServer
  }) => {

  const [isError, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);

    if (isLoggedIn) {
      getUserProfileServer();
      setError(false);
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);

    } else {
      setError(true);
      setIsLoaded(false);
    }

    // if (news && Object.keys(news).length > 0) {
    //   setError(false);
    //   setTimeout(() => {
    //     setIsLoaded(false);
    //   }, 1000);
    //   setItems(news);
    // } else {
    //   setError(true);
    //   setIsLoaded(false);
    // }

  },[
    // news,
    isLoggedIn,
    getUserProfileServer
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Fetching data..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        {isError && <IonList>
          <p className="ion-text-center">Something went wrong! <span role="img" aria-label="sad-face">😢</span></p>
          <p className="ion-text-center">Please try again!</p>
        </IonList>}
        {!isError && <LsTimeTransition />}
        {!isError && <LsAppSummary />}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    // news: selectors.getNewsByGroup(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: ({
    getUserProfileServer,
  }),
  component: React.memo(Home)
});
