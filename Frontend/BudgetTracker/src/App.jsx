import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import ModeTracker from './components/trackerBox';
import IntputPayInfo from './components/inputPayInfo';
import SignUp  from './components/Pages/signUp';
import Login from './components/Pages/login';
import Transaction from './components/Transactions/newTrans';

function App() {
  return (
    <>  
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signup" element={<SignUp />}/> */}
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/transaction" element={<Transaction />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
