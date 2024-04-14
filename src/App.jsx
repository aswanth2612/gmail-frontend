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
      <Route path="/" element={<Navigate to={"/login"} />}></Route>
      <Route path="/login" element={<Login />} errorElement={<ErrorComponent />} fallback={<SuspenseLoader />}></Route>
      <Route path="/signup" element={<Signup />} errorElement={<ErrorComponent />} fallback={<SuspenseLoader />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />} errorElement={<ErrorComponent />} fallback={<SuspenseLoader />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />} errorElement={<ErrorComponent />} fallback={<SuspenseLoader />}></Route>
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={"/login"} />}
        errorElement={<ErrorComponent />}
        fallback={<SuspenseLoader />}
      />
    </Route>
  )
)

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<SuspenseLoader />}>
        <RouterProvider router={router} fallback={<SuspenseLoader />} />
      </Suspense>
    </UserProvider>
  )
}

export default App;
