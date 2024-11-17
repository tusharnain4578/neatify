import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
