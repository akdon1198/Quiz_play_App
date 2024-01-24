import Quizplay from "./Components/Quizplay/Quizplay";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/quizplay/:id" element={<Quizplay/>}/>
      </Routes>
    </Router>
  );
}

export default App;
