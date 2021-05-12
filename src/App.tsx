import Chanel from "./Components/Chanel";
import { useUser } from "./context/user"

const App = () => {
  const {user,login} = useUser();
  return (
    <div>
     {user ? <Chanel/> : <button onClick={login}>Login with google</button>} 
    </div>
  )
}

export default App

