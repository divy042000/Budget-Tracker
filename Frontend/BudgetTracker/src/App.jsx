import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import ModeTracker from './components/trackerBox';
import IntputPayInfo from './components/inputPayInfo';
import signUp  from './components/Pages/signUp';
import Login from './components/Pages/login';
function App() {
  return (
    <>
    <IntputPayInfo></IntputPayInfo>
    {/* <ModeTracker></ModeTracker>      */}
    </>
  )
}

export default App;
