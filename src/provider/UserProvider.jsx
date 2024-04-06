import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext(null);
const UserDispatcherContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUser
  );

  return (
    <UserContext.Provider value={user}>
      <UserDispatcherContext.Provider value={dispatch}>
        {children}
      </UserDispatcherContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatcherContext);
}

function userReducer(user, action) {
  switch (action.type) {
    case 'set': {
      return {
        username: action.username,
        email: action.email
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialUser = [
  { username: "", email: '' }
];
