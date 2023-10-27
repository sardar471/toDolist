import React, { useState } from 'react';
import './TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
type Todo = {
  id: any;
  text: string;
};
const TodoApp = () => {
   const [inputData,setInputData] = useState('');
   const [items,setItems] = useState<Todo[]>([]);
   const [toggleEdit,setToggleEdit] = useState (true)
   const [editItems, setEditItems] = useState(null);
    
   const addItem=()=>{
    if(!inputData){
    }else if(inputData && ! toggleEdit){
      setItems(
        items.map((elem)=>{
          if(elem.id === editItems){
            return {...elem,text:inputData}
          }
          return elem;
        })
      )
      setToggleEdit(true);
    setInputData('')
    setEditItems(null)
    }
    else{
      const newTodo: Todo = {
        id: new Date().getTime().toString(), text: inputData };
    setItems([...items,newTodo])
    setInputData("")
  }
   }
   const deleteItem = (index:any)=>{
const updateItems= items.filter((elem)=>{
  return index !== elem.id;
})
setItems(updateItems);
   }
   const removeAll=()=>{
    setItems([])
   }
   const editItem=(id:any)=>{
    const newEditItems=items.find((elem)=>{
      return elem.id === id
    })
    console.log(newEditItems);
    setToggleEdit(false);
    setInputData(newEditItems!.text)
    setEditItems(id)
   }
  return (
    <div className='main'>
        <h1 className='heading'>ToDo App</h1>
        <div className="child-first">
        <div >

        <input className='input' type='text' placeholder='Type here...✍'
        value={inputData} onChange={(e)=>setInputData(e.target.value)}
        />
          </div>
          <div className="toggle-btn">
        {
          toggleEdit ?<button className='add-btn' onClick={addItem}>
          Add Items</button>:<button className='save-btn' onClick={addItem}>Save Item</button>  
        }
  </div>
  </div>
        <div>
          <ul>
            <div  className='all-items'>
            {items.map((elem) => {
              return(
                <div className='list' key={elem.id}>
                <h3 className='h3'>{elem.text}</h3>
                <div className='two-btn'>
                <FontAwesomeIcon icon={faTrash} className='delete' onClick={()=>{deleteItem(elem.id)}}/> 
                <FontAwesomeIcon icon={faEdit} className='edit' onClick={()=>{editItem(elem.id)}}/>
                </div>
                </div>
              )})} 
            </div>
          </ul>
         
        </div>
        <button className='clear-btn' onClick={removeAll}> Clear All </button>
    </div>
 
  )
}

export default TodoApp;