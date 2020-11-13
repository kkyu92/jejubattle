import React from 'react';

export const AppContext = React.createContext();

export const useAppReducer = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'AUTHORIZED':
          return {
            ...prevState,
            me: action.data,
          };
        case 'UNAUTHORIZED':
          return {
            ...prevState,
            me: {},
          };
        case 'UPDATEME':
          const prevMe = prevState.me;
          return {
            ...prevState,
            me: {...prevMe, ...action.data},
          };
        case 'UPDATENOTI':
          return {
            ...prevState,
            noti: action.data,
          };
        case 'CLEARNOTI':
          return {
            noti: action.data,
          };
      }
    },
    {
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
