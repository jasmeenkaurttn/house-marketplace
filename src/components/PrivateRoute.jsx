import {Navigate, Outlet} from 'react-router-dom'
// Outlet -> allows us to render child routes or child elements
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const {loggedIn, checkingStatus} = useAuthStatus()

  if(checkingStatus) { // if checkingStatus true, then i will be returning a spinner
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
