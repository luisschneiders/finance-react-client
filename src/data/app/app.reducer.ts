export interface State {
  isAuth: boolean;
  user: null;
}

interface Logout {
  type: 'LOGOUT'
}

interface Login {
  type: 'LOGIN'
}

export type Actions = Logout | Login;

export const initialState: State = {
  isAuth: false,
  user: null
}

export function reducer (state: State, action: any) {
  switch (action.type) {
    case 'LOGOUT':
      return { ...state, isAuth: false, user: null };
    case 'LOGIN':
      return { ...state, isAuth: true, user: state.user };
  }
  return state;
}
