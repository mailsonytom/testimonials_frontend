import React, { createContext } from "react";

type State = {
  accessToken: string;
  user_id: string;
  user_name: string;
  username: string;
};
type Action = { type: "setUser"; payload: State };
type SetTokenAction = { type: "setToken"; payload: Pick<State, "accessToken"> };
type Dispatch = (action: Action | SetTokenAction) => void;
type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action | SetTokenAction) {
  switch (action.type) {
    case "setUser": {
      return { ...action.payload };
    }
    case "setToken": {
      return { ...state, token: action.payload.accessToken };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    // token: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaW5saXYiLCJzdWIiOiI2MjQ4ODY3ODI2MzViMTllMjhjZGVlYTAiLCJpYXQiOjE2NDg5MjA0NjcsImV4cCI6MTY1MTUxMjQ2N30.WYLo9LHw_nzZIGAZLo5VSxqbu5Yjb12Ci2vbOoYRc6k",
    accessToken: "",
    user_id: "",
    user_name: "",
    username: "",
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
