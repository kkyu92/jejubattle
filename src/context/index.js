import React from 'react';

export const AppContext = React.createContext();

export const useAppReducer = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            me: action.data.me,
          };
        case 'GET_ME':
          return {
            ...prevState,
            isLoading: false,
            me: action.data.me,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            me: action.data.me,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            me: {},
          };
        case 'UPDATE_USER':
          const prevMe = prevState.me;
          return {
            ...prevState,
            me: {...prevMe, ...action.data},
          };
        case 'SET_FILTER_ITEMS':
          return {
            ...prevState,
            filterItems: action.data,
          };
        case 'UPDATE_NOTI':
          return {
            ...prevState,
            noti: action.data,
          };
      }
    },
    {
      isLoading: true,
      me: {},
      noti: [],
    },
  );
  return {state, dispatch};
};

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AppContext.Consumer>
        {(state) => <Component {...props} context={state} />}
      </AppContext.Consumer>
    );
  };
}
