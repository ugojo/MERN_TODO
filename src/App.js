import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './Flickly.css';
import Home from './pages/Home';
import List from './pages/List';
import AddTodo from './component/AddTodo'
import Footer from './pages/footer';
import TodoDetails from './component/TodoDetails';
import Signup from './pages/Signup'
import Login from './pages/Login'
import useAuthContext from './hook/useAuthContext';




function App() {

   const {user} = useAuthContext()
  return (
    <div className="App">
        <div className="container">
                <BrowserRouter >
                  <Routes>
                     <Route 
                      path='/'
                      element={user ? <Home />: <Navigate to={'/login'} />} >
                     </Route>
                  </Routes>
                  <Routes>
                     <Route 
                      path='/list'
                      element={user ? <List />: <Navigate to={'/login'} />} >
                     </Route>
                  </Routes>
                  <Routes>
                     <Route 
                      path='/form'
                      element={user ? <AddTodo />: <Navigate to={'/login'} />} >
                     </Route>
                  </Routes>
                  <Routes>
                     <Route 
                      path='/tododetails/:id'
                      element={user ? <TodoDetails /> : <Navigate to={'/login'} /> } > 
                     </Route>
                  </Routes>
                  <Routes>
                     <Route 
                      path='/signup/'
                      element={!user ? <Signup /> : <Navigate to={'/'}/>} > 
                     </Route>
                  </Routes>
                  <Routes>
                     <Route 
                      path='/login/'
                      element={!user? <Login /> : <Navigate to={'/'} /> } > 
                     </Route>
                  </Routes>
                  <Footer />
                </BrowserRouter>
            </div>
    </div>
  );
}

export default App;
