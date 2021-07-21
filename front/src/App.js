import './App.css';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import SSignIn from './components/Student/SSignIn';
import ASignIn from './components/Admin/ASignIn';
import Profile from './components/Admin/Profile';
import Result from './components/Admin/Result';
import AdminNavbar from './components/Admin/AdminNavbar';
import Logout from './components/Admin/Logout';
import StudentSignup from './components/Student/StudentSignup';
import StudentProfile from './components/Student/StudentProfile';
import Navbar from './components/Student/Navbar';
import SLogout from './components/Student/Logout';
import SResult from './components/Student/Result';
import AddMarks from './components/Admin/AddMarks';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <SSignIn/>
      </Route>
      <Route path="/SSignup">
        <AdminNavbar/>
            <StudentSignup/>
        </Route>
        <Route path="/Profile">
            <StudentProfile/>
        </Route>
        <Route path="/Result">
            <SResult/>
        </Route>
        <Route path="/Marks">
            <AdminNavbar/>
            <AddMarks/>
        </Route>
      <Route path="/ASignIn">
        <ASignIn/>
      </Route>
      <Route path="/AProfile">
          <AdminNavbar/>
          <Profile/>
        </Route>
        <Route path="/AResult">
           <AdminNavbar/>
            <Result/>
        </Route>

        <Route path="/ALogout">
           <AdminNavbar/>
            <Logout/>
        </Route>
        <Route path="/Logout">
           <Navbar/>
            <SLogout/>s
        </Route>
    </div>
  );
}

export default App;
