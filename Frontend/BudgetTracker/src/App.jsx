import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import ModeTracker from './components/trackerBox';
import IntputPayInfo from './components/inputPayInfo';
import signUp  from './components/Pages/signUp';
function App() {
  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<signUp />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
