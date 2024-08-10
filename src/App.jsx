import Signup from './Signup'
import Appbar from './Appbar'
import Signin from './Signin'
import {BrowserRouter as Router,  Routes , Route} from 'react-router-dom'
import Courses from './Courses'
import Discourse from './Discourse'
import Course from './Course'
import Success from './Success'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {

  return (
    <>
    {/* <div style = {{
       height : "100vh",
       width : "100vm",
      backgroundColor : "#eeeeee"
    }}> */}
    <RecoilRoot>
    <Router>
      <Appbar />
      <Routes>
         <Route path = "/login"  element = {<Signin />} />
         <Route path = "/"  element = {<Success />} />
         <Route path = "/signup"  element = {<Signup />} />
         <Route path = '/addcourse' element = {<Courses />}/>
         <Route path = "/courses"  element = {<Discourse />} />
         <Route path = "/course/:courseId"  element = {<Course />} />
      </Routes>
    </Router>
    </RecoilRoot>
    {/* </div> */}
    </>
  )
}

export default App
