import React from 'react'
import './AddItem.scss'

export default function AddItem() {
  const [selectOne, setSelectOne] = useState();
  const itemId = useParams()

  //handleSubmit function 
  async function addItem() {
    try {
      const response = await axios.post(`http://localhost:8080/items/add`)

      console.log(response)
    } catch(error) {console,error('Cannot add the fuzzy buddy', error)}
  }

  // selectOneItem() is called in form submit 

  return (
    <div>
      
    </div>
  )
}
