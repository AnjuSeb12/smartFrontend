
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Add from './components/Add/Add';
import ProtectedRoute from './utils/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getWatches } from './redux/smartWatches';
import instance from './axios';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import './bootstrap.min.css';
import Buynow from './components/Buy/Buynow';
import Admin from './components/Admin/Admin';
import Users from './components/UsersList/Users';













function App() {
  const dispatch=useDispatch();
  const isAuthenticated=useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated..............",isAuthenticated);
  useEffect(() => {
    //componentDidMount()
    // fetch('/restaurants.json')
    // .then((data) => data.json())
    // .then((res) => dispatch(getRestaurants(res.restaurants)))
    const fetchSmartWatches = async (req,res) => {
      try{
        const res=await instance.get('/api/v1/smartadds');
        if(res.data.success){
          dispatch(getWatches(res.data.smartwatches));
        }
        else{
          console.log(res.data.message);
        }
      }
      catch(error){
        console.log(error.message);
      }

     
    }
    fetchSmartWatches();
    
    //return("")//componentWillUnMount()
  },[dispatch])//dependency Array,componentDidUpdate()

  return (
   <Router>
    <Header/>
    <Routes>
    <Route path="/" element={ <Home/>}/>
    <Route path="/signup" element={ <Signup/>}/>
    <Route path="/login" element={ <Login/>}/>
    <Route path="/details/:id" element={ <Details/>}/>
    <Route path="/buynow/:id" element={ <Buynow/>}/>
    <Route path="/admin" element={ <Admin/>}/>
    <Route path="/users" element={ <Users/>}/>
   
 

    <Route path="/add" element={ <ProtectedRoute isAuthenticated={isAuthenticated}><Add/></ProtectedRoute>}/>
    {/* <Route path="/buynow" element={ <ProtectedRoute isAuthenticated={isAuthenticated}><Buynow/></ProtectedRoute>}/> */}
    </Routes>
   </Router>
  );
}

export default App;
