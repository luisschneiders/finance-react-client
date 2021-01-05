import React from 'react';
import { Redirect } from 'react-router';
import * as ROUTES  from '../constants/Routes';
import { connect } from '../data/connect';
import { getHasSeenWelcome } from '../data/user/user.actions';
import * as selectorsUser from '../data/user/user.selectors';

interface StateProps {
  hasSeenWelcome: boolean;
}

interface DispatchProps {
  getHasSeenWelcome: typeof getHasSeenWelcome;
}

interface HomeOrWelcomeProps extends StateProps, DispatchProps {}

const HomeOrWelcome: React.FC<HomeOrWelcomeProps> = ({ hasSeenWelcome, getHasSeenWelcome }) => {

  getHasSeenWelcome();

  return hasSeenWelcome ? <Redirect to={ROUTES.LOGIN} /> : <Redirect to={ROUTES.WELCOME} />

};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    hasSeenWelcome: selectorsUser.getHasSeenWelcome(state),
  }),
  mapDispatchToProps: {
    getHasSeenWelcome
  },
  component: React.memo(HomeOrWelcome)
});
