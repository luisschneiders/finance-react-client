import {
  IonButton,
  IonDatetime,
  // IonInput,
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
// import { toast } from '../toast/Toast';
// import { StatusColor } from '../../enum/StatusColor';
import { useModal } from '../../hooks/useModal';
import { UserProfileServer } from '../../models/UserProfileServer';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsModal from '../../data/modal/modal.selectors';
import { setModalExpensesSearchShow } from '../../data/modal/modal.actions';
// import { addExpenseType } from '../../data/expenseType/expenseType.actions';
import * as MOMENT  from '../../util/moment';
import { dateFormatYYYYMMDD, endPeriod, startPeriod } from '../../util/moment';
import { Period } from '../../models/Period';
import { setExpensesTimeTransition } from '../../data/sessions/sessions.actions';
import { setExpenses } from '../../data/expenses/expenses.actions';

interface ContainerProps {
  setHasPeriodChanged: (hasPeriodChanged: boolean) => void;
  setCustomPeriod: (customPeriod: Period) => void;
}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalExpensesSearch: boolean;
}

interface DispatchProps {
  setModalExpensesSearchShow: typeof setModalExpensesSearchShow;
  setExpensesTimeTransition: typeof setExpensesTimeTransition;
  setExpenses: typeof setExpenses;
  // addExpenseType: typeof addExpenseType;
}


interface ModalExpensesSearchProps extends ContainerProps, StateProps, DispatchProps {}

const LsModalExpensesSearch: React.FC<ModalExpensesSearchProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesSearch,
    setCustomPeriod,
    setExpensesTimeTransition,
    setModalExpensesSearchShow,
    setExpenses,
    setHasPeriodChanged,
    // addExpenseType,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [selectedStartDate, setSelectedStartDate] = useState<string>(startPeriod(MOMENT.currentMonthYYYMMDD));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(endPeriod(MOMENT.currentMonthYYYMMDD));
  const [params, setParams] = useState<string>('all');

  useEffect(() => {
    if (isShowModalExpensesSearch) {
      handleShow();
      setModalExpensesSearchShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesSearch,
    setModalExpensesSearchShow,
    handleShow,
  ]);

  const expensesSearchForm = async(e: React.FormEvent) => {
    e.preventDefault();

    const newPeriod: Period = Object.assign({}, {
      startDate: dateFormatYYYYMMDD(selectedStartDate),
      endDate: dateFormatYYYYMMDD(selectedEndDate),
    });
    
    if (isLoggedIn && userProfileServer) {
      setExpensesTimeTransition(newPeriod);
      // setExpenses(userProfileServer.userId, newPeriod, params);
      setHasPeriodChanged(true);
      setCustomPeriod(newPeriod);
    }

    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="modal-expenses-search"
        show={showModal}
        title="Search expenses"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={expensesSearchForm}>
          <IonList lines="full">
            <IonItem>
              <IonLabel>From</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>Expense</IonLabel>
              <IonSelect multiple={true}>
                <IonSelectOption value="brown">Diesel/Petrol</IonSelectOption>
                <IonSelectOption value="blonde">Rent</IonSelectOption>
                <IonSelectOption value="black">Food/Drinks</IonSelectOption>
                <IonSelectOption value="red">Others</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton type="submit" shape="round" color={AppColor.TERTIARY}>Search</IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
          {/* <form noValidate onSubmit={expenseTypeForm}>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                name="expenseTypeDescription"
                type="text"
                value={expenseTypeDescription} spellCheck={false} autocapitalize="off"
                onIonChange={(e: any) => setExpenseTypeDescription(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton
                  type="submit"
                  fill="outline"
                  color={AppColor.SUCCESS}
                >
                  Save
                </IonButton>
              </div>
            </IonItem>
          </form> */}
      </LsMainModal>
    </ModalProvider>
  );
}

export default connect<ContainerProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    userProfileServer: selectorsSessions.getUserProfileServer(state),
    isShowModalExpensesSearch: selectorsModal.showModalExpensesSearch(state),
  }),
  mapDispatchToProps: ({
    setModalExpensesSearchShow,
    setExpensesTimeTransition,
    setExpenses,
    // addExpenseType,
  }),
  component: LsModalExpensesSearch
});
