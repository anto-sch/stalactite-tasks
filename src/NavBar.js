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
                  <Link to="/task-1">Task 1</Link>
                  <Link to="/task-2">Task 2</Link>
                  <Link to="/task-3">Task 3</Link>
                  <Link to="/ttask-0">Training</Link>
            </div>
      )
}
export default Navbar;