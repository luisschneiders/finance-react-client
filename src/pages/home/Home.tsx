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
// import { Transactions } from '../../models/Transactions';
// import * as selectors from '../../data/news/news.selectors';
// import * as selectorsTransactions from '../../data/transactions/transactions.selectors';
import * as selectorsSummary from '../../data/summary/summary.selectors';
import { Summary } from '../../models/Summary';

interface StateProps {
  // news: News | null;
  // transactions: Transactions | null,
  summary: Summary,
}
interface HomeProps extends StateProps {}

const Home: React.FC<HomeProps> = ({
    // news,
    // transactions,
    summary,
  }) => {
  const [isError, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Summary>();

  useEffect(() => {
    setIsLoaded(true);
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
    // if (transactions && Object.keys(transactions).length > 0) {
    //   setError(false);
    //   setTimeout(() => {
    //     setIsLoaded(false);
    //   }, 1000);
    //   setItems(transactions);
    // } else {
    //   setError(true);
    //   setIsLoaded(false);
    // }
    if (summary && Object.keys(summary).length > 0) {
      setError(false);
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
      console.log('LFS - summary: ', summary);
      setItems(summary);
    } else {
      setError(true);
      setIsLoaded(false);
    }
  },[
    // news,
    // transactions,
    summary,
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
      <IonLoading message="Fetching news..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        {isError && <IonList>
          <p className="ion-text-center">Home Page!</p>
        </IonList>}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    // news: selectors.getNewsByGroup(state),
    // transactions: selectorsTransactions.getTransactions(state),
    summary: selectorsSummary.getSummary(state),
  }),
  component: React.memo(Home)
});
