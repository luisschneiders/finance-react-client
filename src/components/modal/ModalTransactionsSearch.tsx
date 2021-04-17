import {
  IonButton,
  IonDatetime,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { AppColor } from '../../enum/AppColor';
import { ModalProvider } from './ModalProvider';
import LsMainModal from './MainModal';
import { useModal } from '../../hooks/useModal';
import { UserProfileServer } from '../../models/UserProfileServer';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { setModalTransactionsSearchShow } from '../../data/modal/modal.actions';
import * as MOMENT  from '../../util/moment';
import { dateFormatYYYYMMDD, endPeriod, startPeriod } from '../../util/moment';
import { Period } from '../../models/Period';
import * as ROUTES  from '../../constants/Routes';
import { TransactionTypeStatusActive } from '../../models/TransactionType';

interface ContainerProps {
  setIsCustomSearch: (isCustomSearch: boolean) => void;
  setCustomPeriod: (customPeriod: Period) => void;
  setParams: (params: string) => void;
}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalTransactionsSearch: boolean;
  transactionTypeStatusActive: TransactionTypeStatusActive;
}

interface DispatchProps {
  setModalTransactionsSearchShow: typeof setModalTransactionsSearchShow;
}


interface ModalTransactionsSearchProps extends ContainerProps, StateProps, DispatchProps {}

const LsModalTransactionsSearch: React.FC<ModalTransactionsSearchProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalTransactionsSearch,
    transactionTypeStatusActive,
    setCustomPeriod,
    setModalTransactionsSearchShow,
    setIsCustomSearch,
    setParams,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [selectedStartDate, setSelectedStartDate] = useState<string>(startPeriod(MOMENT.currentMonthYYYMMDD));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(endPeriod(MOMENT.currentMonthYYYMMDD));
  const [transactionOptions, setTransactionOptions] = useState<[]>([]);
  const selectInput = {
    cssClass: 'select-input-transaction-type'
  };

  useEffect(() => {
    if (isShowModalTransactionsSearch) {

      handleShow();
      setModalTransactionsSearchShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalTransactionsSearch,
    transactionTypeStatusActive,
    transactionOptions,
    setModalTransactionsSearchShow,
    handleShow,
  ]);

  const transactionsSearchForm = async(e: React.FormEvent) => {
    e.preventDefault();

    const newPeriod: Period = {
      startDate: dateFormatYYYYMMDD(selectedStartDate),
      endDate: dateFormatYYYYMMDD(selectedEndDate),
    };

    if (isLoggedIn && userProfileServer) {
      setIsCustomSearch(true);
      setCustomPeriod(newPeriod);
      setParams(transactionOptions.length ? transactionOptions.toString() : 'all');
    }

    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="modal-transactions-search"
        show={showModal}
        title="Search transactions"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={transactionsSearchForm}>
          <IonList lines="full">
            <IonItem>
              <IonLabel>From</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedStartDate}
                onIonChange={e => setSelectedStartDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedEndDate}
                onIonChange={e => setSelectedEndDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Transaction</IonLabel>
              {transactionTypeStatusActive.transactionsType.length ?
                <IonSelect
                  multiple={true}
                  onIonChange={e => setTransactionOptions(e.detail.value)}
                  disabled={!transactionTypeStatusActive.transactionsType.length}
                  interfaceOptions={selectInput}
                >
                  {transactionTypeStatusActive.transactionsType.map((option: any, index: number) => (
                    <IonSelectOption
                      key={index}
                      value={option.transactionTypeId}
                    >
                      {option.transactionTypeDescription}
                    </IonSelectOption>
                  ))}
                </IonSelect> :
                <IonSelect
                  value={0}
                  disabled
                >
                  <IonSelectOption value={0}>No transactions found!</IonSelectOption>
                </IonSelect>
              }
            </IonItem>
            {!transactionTypeStatusActive.transactionsType.length &&
              <IonItem lines="none">
                  <IonButton slot="end"
                    onClick={() => handleClose()}
                    routerLink={ROUTES.TABS_TRANSACTION_TYPE}
                    fill="clear"
                  >
                    Click here to add transactions
                  </IonButton>
              </IonItem>
            }
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton type="submit" shape="round" color={AppColor.TERTIARY}>Search</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </LsMainModal>
    </ModalProvider>
  );
}

export default connect<ContainerProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    isShowModalTransactionsSearch: selectorsModal.showModalTransactionsSearch(state),
    transactionTypeStatusActive: selectorsTransactionType.getTransactionTypeStatusActive(state),
  }),
  mapDispatchToProps: ({
    setModalTransactionsSearchShow,
  }),
  component: React.memo(LsModalTransactionsSearch)
});
