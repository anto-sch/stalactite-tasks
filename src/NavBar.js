import { Link } from "react-router-dom"

const toggleFullSceen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


const Navbar = () =>{
      return (
            <div>
                  <button onClick={() => toggleFullSceen()}>Toggle full screen mode</button>
                  <Link to="/">Home</Link>
                  <Link to="/task-1-a-lines">Task 1</Link>
                  <Link to="/task-2-a-lines">Task 2</Link>
                  <Link to="/task-3-a-lines">Task 3</Link>
                  <Link to="/ttask-0">Training</Link>
            </div>
      )
}
export default Navbar;