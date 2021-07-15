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
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { setModalExpensesSearchShow } from '../../data/modal/modal.actions';
import * as MOMENT  from '../../util/moment';
import {
  dateFormatYYYYMMDD,
  endPeriod,
  startPeriod
} from '../../util/moment';
import { Period } from '../../models/Period';
import { ExpenseTypeStatusActive } from '../../models/ExpenseType';
import * as ROUTES  from '../../constants/Routes';

interface ContainerProps {
  setIsCustomSearch: (isCustomSearch: boolean) => void;
  setCustomPeriod: (customPeriod: Period) => void;
  setParams: (params: string) => void;
}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalExpensesSearch: boolean;
  expenseTypeStatusActive: ExpenseTypeStatusActive;
}

interface DispatchProps {
  setModalExpensesSearchShow: typeof setModalExpensesSearchShow;
}


interface ModalExpensesSearchProps extends ContainerProps, StateProps, DispatchProps {}

const LsModalExpensesSearch: React.FC<ModalExpensesSearchProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesSearch,
    expenseTypeStatusActive,
    setCustomPeriod,
    setModalExpensesSearchShow,
    setIsCustomSearch,
    setParams,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [selectedStartDate, setSelectedStartDate] = useState<string>(startPeriod(MOMENT.currentMonthYYYMMDD));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(endPeriod(MOMENT.currentMonthYYYMMDD));
  const [expenseOptions, setExpenseOptions] = useState<[]>([]);
  const selectInput = {
    cssClass: 'select-input-expense-type'
  };

  useEffect(() => {
    if (isShowModalExpensesSearch) {

      handleShow();
      setModalExpensesSearchShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesSearch,
    expenseTypeStatusActive,
    expenseOptions,
    setModalExpensesSearchShow,
    handleShow,
  ]);

  const expensesSearchForm = async(e: React.FormEvent) => {
    e.preventDefault();

    const newPeriod: Period = {
      startDate: dateFormatYYYYMMDD(selectedStartDate),
      endDate: dateFormatYYYYMMDD(selectedEndDate),
    };

    if (isLoggedIn && userProfileServer) {
      setIsCustomSearch(true);
      setCustomPeriod(newPeriod);
      setParams(expenseOptions.length ? expenseOptions.toString() : 'all');
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
              <IonLabel position="stacked">From</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedStartDate}
                onIonChange={e => setSelectedStartDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">To</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedEndDate}
                onIonChange={e => setSelectedEndDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Expense</IonLabel>
              {expenseTypeStatusActive.expensesType.length ?
                <IonSelect
                  multiple={true}
                  onIonChange={e => setExpenseOptions(e.detail.value)}
                  disabled={!expenseTypeStatusActive.expensesType.length}
                  interfaceOptions={selectInput}
                >
                  {expenseTypeStatusActive.expensesType.map((option: any, index: number) => (
                    <IonSelectOption
                      key={index}
                      value={option.expenseTypeId}
                    >
                      {option.expenseTypeDescription}
                    </IonSelectOption>
                  ))}
                </IonSelect> :
                <IonSelect
                  value={0}
                  disabled
                >
                  <IonSelectOption value={0}>No expenses found!</IonSelectOption>
                </IonSelect>
              }
            </IonItem>
            {!expenseTypeStatusActive.expensesType.length &&
              <IonItem lines="none">
                  <IonButton slot="end"
                    onClick={() => handleClose()}
                    routerLink={ROUTES.TABS_EXPENSE_TYPE}
                    fill="clear"
                  >
                    Click here to add expenses
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
    isShowModalExpensesSearch: selectorsModal.showModalExpensesSearch(state),
    expenseTypeStatusActive: selectorsExpenseType.getExpenseTypeStatusActive(state),
  }),
  mapDispatchToProps: ({
    setModalExpensesSearchShow,
  }),
  component: React.memo(LsModalExpensesSearch)
});
