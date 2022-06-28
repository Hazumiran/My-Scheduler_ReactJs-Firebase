import './taskManager.css'
import Tsk from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
// import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
      <header>Diaz - Scheduler</header>
      {/* <div className='taskManager__container'> */}
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>
        {tasks.map((task) => (
          <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title} 
              description={task.data.description}
            />
          ))}
          {/* <Task
            id={1}
            title='READ A BOOK' 
            description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
            completed={false}
          />
          <Task
            id={2}
            title='COMPLETE A REACT BUILD' 
            description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
            completed={false}
          /> */}
        </div>
      </div>

      {openAddModal &&
        // <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
