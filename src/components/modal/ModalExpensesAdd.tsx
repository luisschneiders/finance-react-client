import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
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
import * as MOMENT from '../../util/moment';
import { ExpenseTypeStatusActive } from '../../models/ExpenseType';
import * as ROUTES  from '../../constants/Routes';
import { BankStatusActive } from '../../models/Bank';
import { currencyMask } from '../../util/currencyMask';

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

  const [selectedDate, setSelectedDate] = useState<string>(MOMENT.currentDayDD);
  const [expenseOptions, setExpenseOptions] = useState<[]>([]);
  const [bankOptions, setBankOptions] = useState<number>();
  const [expenseComments, setExpenseComments] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number>();
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
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

  const handleOnChange = async (e: any) => {
    if (!bankOptions || !e.detail.value) {
      setExpenseAmount(undefined);
      setRemainingAmount(0);
      return;
    }

    const bankFiltered: any = bankStatusActive.banks.filter(bank => bank.bankId === bankOptions);

    setExpenseAmount(e.detail.value!);
    setRemainingAmount(parseFloat(bankFiltered[0].bankCurrentBalance) - parseFloat(e.detail.value))

  }

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
              <IonLabel position="stacked">Date</IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                placeholder="Select Date"
                value={selectedDate}
                onIonChange={e => setSelectedDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Bank</IonLabel>
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
                      {`${option.bankDescription} ${currencyMask('en-AU', option.bankCurrentBalance, 'AUD')}`}
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
              <IonLabel position="stacked">Expense</IonLabel>
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
            <IonItem>
              <IonLabel position="stacked">Comments</IonLabel>
              <IonTextarea
                value={expenseComments}
                onIonChange={e => setExpenseComments(e.detail.value!)}
                required={true}
              ></IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Amount</IonLabel>
              <IonInput
                type="number"
                step="0.01"
                name="expenseAmount"
                value={expenseAmount}
                onIonChange={handleOnChange}
                min="0.01"
                required
              />
            </IonItem>
            <IonItem lines="none">
              <h6>Remaining amount: {currencyMask('en-AU', remainingAmount, 'AUD')}</h6>
            </IonItem>
            <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton
                  size="default"
                  type="submit"
                  shape="round"
                  color={AppColor.PRIMARY}
                >
                  Save
                </IonButton>
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
