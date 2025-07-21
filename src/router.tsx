import {createBrowserRouter} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import CreatePage from './components/pages/CreatePage';
import EditPage from './components/pages/EditPage';

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/edit/:id?", element: <EditPage /> },
]);
