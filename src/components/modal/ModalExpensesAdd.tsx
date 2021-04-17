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
import * as selectorsBank from '../../data/bank/bank.selectors';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { setModalExpensesAddShow } from '../../data/modal/modal.actions';
import * as MOMENT  from '../../util/moment';
import {
  startPeriod
} from '../../util/moment';
import { ExpenseTypeStatusActive } from '../../models/ExpenseType';
import * as ROUTES  from '../../constants/Routes';
import { BankStatusActive } from '../../models/Bank';

interface ContainerProps {
  // setIsCustomSearch: (isCustomSearch: boolean) => void;
  // setCustomPeriod: (customPeriod: Period) => void;
  // setParams: (params: string) => void;
}

interface StateProps {
  isLoggedIn: boolean;
  userProfileServer: UserProfileServer;
  isShowModalExpensesAdd: boolean;
  bankStatusActive: BankStatusActive;
  expenseTypeStatusActive: ExpenseTypeStatusActive;
}

interface DispatchProps {
  setModalExpensesAddShow: typeof setModalExpensesAddShow;
}


interface ModalExpensesAddProps extends ContainerProps, StateProps, DispatchProps {}

const LsModalExpensesAdd: React.FC<ModalExpensesAddProps> = ({
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesAdd,
    bankStatusActive,
    expenseTypeStatusActive,
    // setCustomPeriod,
    setModalExpensesAddShow,
    // setIsCustomSearch,
    // setParams,
  }) => {

  const { showModal, isSubmitting, handleShow, handleClose } = useModal();

  const [selectedDate, setSelectedDate] = useState<string>(startPeriod(MOMENT.currentMonthYYYMMDD));
  const [expenseOptions, setExpenseOptions] = useState<[]>([]);
  const [bankOptions, setBankOptions] = useState<[]>([]);
  const selectInput = {
    cssClass: 'select-input-expense-type'
  };

  useEffect(() => {
    if (isShowModalExpensesAdd) {

      handleShow();
      setModalExpensesAddShow(false);
    }
  }, [
    isLoggedIn,
    userProfileServer,
    isShowModalExpensesAdd,
    expenseTypeStatusActive,
    expenseOptions,
    bankOptions,
    setModalExpensesAddShow,
    handleShow,
  ]);

  const expensesAddForm = async(e: React.FormEvent) => {
    e.preventDefault();

    if (isLoggedIn && userProfileServer) {
      // setIsCustomSearch(true);
      // setCustomPeriod(newPeriod);
      // setParams(expenseOptions.length ? expenseOptions.toString() : 'all');
    }

    handleClose();
  }

  return (
    <ModalProvider>
      <LsMainModal
        id="modal-expenses-add"
        show={showModal}
        title="Add new expense"
        isSubmitting={isSubmitting}
        closeModal={handleClose}
      >
        <form noValidate onSubmit={expensesAddForm}>
          <IonList lines="full">
            <IonItem>
              <IonLabel>Date</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedDate}
                onIonChange={e => setSelectedDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Bank</IonLabel>
              {bankStatusActive.banks.length ?
                <IonSelect
                  onIonChange={e => setBankOptions(e.detail.value)}
                  disabled={!bankStatusActive.banks.length}
                  interfaceOptions={selectInput}
                >
                  {bankStatusActive.banks.map((option: any, index: number) => (
                    <IonSelectOption
                      key={index}
                      value={option.bankId}
                    >
                      {option.bankDescription}
                    </IonSelectOption>
                  ))}
                </IonSelect> :
                <IonSelect
                  value={0}
                  disabled
                >
                  <IonSelectOption value={0}>No bank found!</IonSelectOption>
                </IonSelect>
              }
            </IonItem>
            {!bankStatusActive.banks.length &&
              <IonItem lines="none">
                  <IonButton slot="end"
                    onClick={() => handleClose()}
                    routerLink={ROUTES.TABS_BANK}
                    fill="clear"
                  >
                    Click here to add banks
                  </IonButton>
              </IonItem>
            }
            <IonItem>
              <IonLabel>Expense</IonLabel>
              {expenseTypeStatusActive.expensesType.length ?
                <IonSelect
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
                <IonButton size="default" type="submit" shape="round" color={AppColor.PRIMARY}>Save</IonButton>
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
    isShowModalExpensesAdd: selectorsModal.showModalExpensesAdd(state),
    bankStatusActive: selectorsBank.getBankStatusActive(state),
    expenseTypeStatusActive: selectorsExpenseType.getExpenseTypeStatusActive(state),
  }),
  mapDispatchToProps: ({
    setModalExpensesAddShow,
  }),
  component: React.memo(LsModalExpensesAdd)
});
