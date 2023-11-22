import { Link } from "react-router-dom"
const Navbar =()=>{
      return (
            <div>
                  <Link to="/">Home</Link>
                  <Link to="/task-1">Task 1</Link>
                  <Link to="/task-2">Task 2</Link>
                  <Link to="/task-3">Task 3</Link>
            </div>
      )
}
export default Navbar;