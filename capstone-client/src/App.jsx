import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage.jsx"
import SelectedItem from "./pages/SelectedItem/SelectedItem.jsx"
import AddItemPage from "./pages/AddItemPage/AddItemPage.jsx"
import InactivePage from "./pages/InactivePage/InactivePage.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<SelectedItem />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/inactive" element={<InactivePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
