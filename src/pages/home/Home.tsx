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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Home.scss';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import LsAppSummary from '../../components/summary/AppSummary';
import LsGroupThumbnail from '../../components/list/GroupThumbnail';
import { News } from '../../models/News';
import * as selectorsNews from '../../data/news/news.selectors';
import { setNews } from '../../data/news/news.actions';
import LsTransition from '../../components/time/Transition';
import * as MOMENT  from '../../util/moment';
import { Period } from '../../models/Period';
import { endPeriod, startPeriod } from '../../util/moment';
import { UserProfileServer } from '../../models/UserProfileServer';
import { setAppSummary } from '../../data/summary/summary.actions';
import LsMainChip from '../../components/chip/MainChip';
import { StatusColor } from '../../enum/StatusColor';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  news: News | null;
}
interface DispatchProps {
  setAppSummary: typeof setAppSummary;
  // setNews: typeof setNews;
}
interface HomeProps extends StateProps, DispatchProps {}

const HomePage: React.FC<HomeProps> = ({
    isLoggedIn,
    userProfileServer,
    news,
    setAppSummary,
    // setNews,
}) => {
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentYearYYYY, 'year'),
    endDate: endPeriod(MOMENT.currentYearYYYY, 'year'),
  });
  const [isError, setError] = useState<boolean>(false);
  const [isNewsError, setNewsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newsList, setNewsItems] = useState<any>();

  useEffect(() => {
    setIsLoaded(true);

    if (isLoggedIn && userProfileServer) {
      setAppSummary(userProfileServer.userId, parseInt(period.startDate));
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
    userProfileServer,
    news,
    period,
    setAppSummary,
    // setNews,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Home</IonTitle>}
          {width > MOBILE_VIEW &&
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol size="8" push="2" className="ion-no-padding">
              <LsTransition
                dayOrMonthOrYear="year"
                period={period}
                setPeriod={setPeriod}
              />
              </IonCol>
            </IonRow>
          </IonGrid>
          }
        </IonToolbar>
        {width <= MOBILE_VIEW && <IonToolbar>
          <LsTransition
            dayOrMonthOrYear="year"
            period={period}
            setPeriod={setPeriod}
          />
        </IonToolbar>}
      </IonHeader>
      <IonLoading message="Fetching data..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        {isError && <IonList className="ion-text-center">
          <LsMainChip text="Something went wrong! 😢" color={StatusColor.ERROR} />
        </IonList>}
        {!isError && <LsAppSummary />}
        {isNewsError && <IonList className="ion-text-center">
          <LsMainChip text="No news found!" color={StatusColor.ERROR} />
        </IonList>}
        {newsList && <LsGroupThumbnail data={newsList} groupBy="category"></LsGroupThumbnail>}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    news: selectorsNews.getNewsByGroup(state),
  }),
  mapDispatchToProps: ({
    setAppSummary,
    // setNews,
  }),
  component: React.memo(HomePage)
});
