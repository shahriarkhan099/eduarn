
import {useContext} from 'react';
import {Context} from '../../context';
import UserRouter from '../../components/routes/UserRoute';

const UserIndex = () => {
const {
    state: { user }, 
} = useContext(Context);

    return (
        <UserRouter>
      <h1 className="jumbotron text-center square">
          User dashboard
        {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
    </h1>
    </UserRouter>
    );
};

export default UserIndex;

