
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';



function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
