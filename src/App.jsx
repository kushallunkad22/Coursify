import Signup from './Signup'
import Appbar from './Appbar'
import Signin from './Signin'
import {BrowserRouter as Router,  Routes , Route} from 'react-router-dom'
import AddCourse from './AddCourse'
import Allcourse from './Allcourse'
import Course from './Course'
import Success from './Success'
import { ThemeProviderWrapper } from "./theme/theme-provider"
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
    <ThemeProviderWrapper>
    <RecoilRoot>
    <Router>
      <Routes>
         <Route path = "/login"  element = {<Signin />} />
         <Route path = "/"  element = {<Success />} />
         <Route path = "/signup"  element = {<Signup />} />
         <Route path = '/addcourse' element = {<AddCourse />}/>
         <Route path = "/courses"  element = {<Allcourse />} />
         <Route path = "/course/:courseId"  element = {<Course />} />
      </Routes>
    </Router>
    </RecoilRoot>
    </ThemeProviderWrapper>
        {/* </div> */}
    </>
  )
}

export default App
