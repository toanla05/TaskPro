import Board from './pages/Boards/_id';
import NotFound from '~/components/404/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '~/pages/Auth/Auth';

function App() {

  return (
    <Routes>

      <Route path='/' element={
        <Navigate to='/boards/675681d53d32c24d9305bd48' replace={true} />
      } />
      <Route path='/boards/:boardId' element={<Board />} />

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      <Route path='*' element={<NotFound />} />

    </Routes>
  );
}


export default App;
