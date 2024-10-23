import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage.jsx"
import SelectedItem from "./pages/SelectedItem/SelectedItem.jsx"
import AddItem from "./pages/AddItem/AddItem.jsx"
import DeleteConfirmation from "./pages/DeleteConfirmation/DeleteConfirmation.jsx"
import EditItem from "./pages/EditItem/EditItem.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/:id" element={<SelectedItem />} />
          <Route path="/home/add" element={<AddItem />} />
          <Route path="/home/remove/:id" element={<DeleteConfirmation />} />
          <Route path="/home/edit/:id" element={<EditItem />} />
          <Route path="/inactive" element={<RemovedItems />} />
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
