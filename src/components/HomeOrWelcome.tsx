import React from 'react';
import { Redirect } from 'react-router';
import * as ROUTES  from '../constants/Routes';
import { connect } from '../data/connect';

interface StateProps {
  hasSeenWelcome: boolean;
}

const HomeOrWelcome: React.FC<StateProps> = ({ hasSeenWelcome }) => {
  return hasSeenWelcome ? <Redirect to={ROUTES.LOGIN} /> : <Redirect to={ROUTES.WELCOME} />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenWelcome: state.userReducer.hasSeenWelcome
  }),
  component: HomeOrWelcome
});