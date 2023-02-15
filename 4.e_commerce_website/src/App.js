import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppContent from "./Components/AppContent/AppContent";
import AppFooter from "./Components/Footer/AppFooter";
import AppHeader from "./Components/Header/AppHeader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
