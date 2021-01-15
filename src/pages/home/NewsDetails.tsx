import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import {
  withRouter,
  RouteComponentProps
} from 'react-router';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import * as newsSelectors from '../../data/news/news.selectors';
import { NewsCategory } from '../../models/News';
import { AppColor } from '../../enum/AppColor';

interface OwnProps extends RouteComponentProps {};

interface StateProps {
  news: NewsCategory | undefined,
};

interface DispatchProps {
};

interface NewsDetailsProps extends OwnProps, StateProps, DispatchProps {};

const Tab1Detail: React.FC<NewsDetailsProps> = ({
    news,
  }) => {

  return (
    <IonPage id="news-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_HOME}></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg src={news?.image}></IonImg>
          <IonCardHeader>
            <IonCardTitle
              color={AppColor.TERTIARY}
              className="ion-text-capitalize">{news?.category}</IonCardTitle>
            <IonCardSubtitle>{news?.headline}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{news?.summary}</p>
            <p> <a target="_blank" rel="noopener noreferrer" href={news?.url}>Read more...</a> </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    news: newsSelectors.getNewsById(state, OwnProps),
  }),
  mapDispatchToProps: {
  },
  component: withRouter(Tab1Detail)
});
