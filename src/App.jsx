import { Suspense, lazy, createContext, useContext, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { routes } from "./routes/routes";
import SuspenseLoader from './components/common/SuspenseLoader';
import Signup from './landingpage/Signup';
import Login from './landingpage/Login';
import ForgotPassword from './landingpage/ForgotPassword';
import ResetPassword from './landingpage/ResetPassword';
import UserProvider from './provider/UserProvider';

const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to={`${routes.emails.path}/inbox`} />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
    </Route>
  )
)

const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <UserProvider>
      <Suspense fallback={<SuspenseLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </UserProvider>
  )
}

export default App
