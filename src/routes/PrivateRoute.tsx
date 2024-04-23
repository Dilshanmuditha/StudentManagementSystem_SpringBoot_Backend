import MainComponent from '../components/main';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';

const PrivateRoute = ({children}:{children:any}) => {
    // const isAuthenticate = {state:true,authorizedRoute:[1, 2, 3, 4, 5, 6]};

    return isAuthenticated() ? (
        <MainComponent>
          {children}
        </MainComponent>
      ) : (
        <Navigate to='/login' />
      );
}

export default PrivateRoute