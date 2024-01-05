import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import ModeTracker from './components/trackerBox';
import IntputPayInfo from './components/inputPayInfo';
import SignUp  from './components/Pages/signUp';
<<<<<<< HEAD
import Login from './components/Pages/login';
=======
import SignIn  from './components/Pages/login';
>>>>>>> 9fc2de8a79392ee793bb2b532b83eb9331f57a0c
function App() {
  return (
    <>  
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* <Route path="/signup" element={<SignUp />}/> */}
        <Route path="/login" element={<Login />}/>
=======
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn/>}/>
>>>>>>> 9fc2de8a79392ee793bb2b532b83eb9331f57a0c
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
