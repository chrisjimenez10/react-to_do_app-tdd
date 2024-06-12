import {useState} from "react"

const App = () => {

 //State
 const [formData, setFormData] = useState({
  task: "",
  description: "",
});

//Testing Submission
const [formSubmitted, setFormSubmitted] = useState(false);

const [tasks, setTasks] = useState([])

//Functions
const handleInputChange = (e) => {
  const {value, name} = e.target;
  setFormData({...formData, [name]: value});
};

const handleSubmit = (e) =>{
  e.preventDefault();
  setFormData({
    task: "",
    description: "",
  })
  setFormSubmitted(true);
};

return (

  <>

    <h1 data-testid="title">Welcome to the To-Do App</h1>

    <form data-testid="form" onSubmit={handleSubmit}>
      <label htmlFor="task">Task: </label>
      <input id="task" data-testid="task-input" name="task" value={formData.task} onChange={handleInputChange}></input>

      <label htmlFor="description">Description: </label>
      <input id="description" data-testid="desc-input" name="description" value={formData.description} onChange={handleInputChange}></input>
      <button type="submit">+</button>
    </form>

    <div data-testid="task-list">
        <dt>Tasks To-Do</dt>
        {tasks.length === 0 ? <h2>-- No Tasks --</h2>
        :
        tasks.map((task, index)=>{
          return(
            <li key={index}>
              <dd>{task.task}</dd>
              <dd>{task.description}</dd>
            </li>
          )
        })}
    </div>

    {formSubmitted && (
      <p>Form submitted successfully</p>
    )}

  </>

)
}

export default App;