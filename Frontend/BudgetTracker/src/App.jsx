import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import ModeTracker from './components/trackerBox';
import IntputPayInfo from './components/inputPayInfo';
import SignUp  from './components/Pages/signUp';
import SignIn  from './components/Pages/login';
function App() {
  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
