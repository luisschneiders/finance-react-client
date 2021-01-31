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
import LsAppSummary from '../../components/summary/AppSummary';
import LsGroupThumbnail from '../../components/list/GroupThumbnail';
import { News } from '../../models/News';
import * as selectorsNews from '../../data/news/news.selectors';
import { setNews } from '../../data/news/news.actions';

interface StateProps {
  isLoggedIn: boolean;
  news: News | null;
}
interface DispatchProps {
  setNews: typeof setNews;
}
interface HomeProps extends StateProps, DispatchProps {}

const HomePage: React.FC<HomeProps> = ({
    isLoggedIn,
    news,
    setNews
  }) => {

  const [isError, setError] = useState<boolean>(false);
  const [isNewsError, setNewsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newsList, setNewsItems] = useState<any>();

  useEffect(() => {
    setIsLoaded(true);

    if (isLoggedIn) {
      setNews();
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
    setNews,
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
        {!isError && <LsAppSummary />}
        {isNewsError && <IonList>
          <p className="ion-text-center">No news found! <span role="img" aria-label="sad-face">😢</span></p>
        </IonList>}
        {newsList && <LsGroupThumbnail data={newsList} groupBy="category"></LsGroupThumbnail>}
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
    setNews,
  }),
  component: React.memo(HomePage)
});
