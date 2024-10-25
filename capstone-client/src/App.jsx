import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage.jsx"
import SelectedItem from "./pages/SelectedItem/SelectedItem.jsx"
import AddItem from "./pages/AddItem/AddItem.jsx"
import DeleteConfirmation from "./pages/DeleteConfirmation/DeleteConfirmation.jsx"
import EditItem from "./pages/EditItem/EditItem.jsx"
import RemovedItems from "./pages/RemovedItems/RemovedItems.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<SelectedItem />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/remove/:id" element={<DeleteConfirmation />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/inactive" element={<RemovedItems />} />
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
