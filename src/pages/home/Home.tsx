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
import * as selectorsUser from '../../data/user/user.selectors';
import LsTimeTransition from '../../components/time/TimeTransition';
import LsAppSummary from '../../components/summary/AppSummary';
import { getUserProfileServer } from '../../data/user/user.actions';
import LsGroupList from '../../components/list/GroupList';
import { News } from '../../models/News';
import * as selectorsNews from '../../data/news/news.selectors';

interface StateProps {
  isLoggedIn: boolean;
  news: News | null;
}
interface DispatchProps {
  getUserProfileServer: typeof getUserProfileServer;
}
interface HomeProps extends StateProps, DispatchProps {}

const Home: React.FC<HomeProps> = ({
    isLoggedIn,
    news,
    getUserProfileServer
  }) => {

  const [isError, setError] = useState<boolean>(false);
  const [isNewsError, setNewsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newsList, setNewsItems] = useState<any>();

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

    if (news && Object.keys(news).length > 0) {
      setNewsError(false);
      setNewsItems(news);
    } else {
      setNewsError(true);
    }

  },[
    isLoggedIn,
    news,
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
        {/* {!isError && <LsTimeTransition />} */}
        {!isError && <LsAppSummary />}
        {isNewsError && <IonList>
          <p className="ion-text-center">No news found! <span role="img" aria-label="sad-face">😢</span></p>
        </IonList>}
        {newsList && <LsGroupList data={newsList}></LsGroupList>}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    news: selectorsNews.getNewsByGroup(state),
  }),
  mapDispatchToProps: ({
    getUserProfileServer,
  }),
  component: React.memo(Home)
});
