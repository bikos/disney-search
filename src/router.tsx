import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import CharacterDetails from './pages/CharacterDetails';
import UserProfile from './pages/UserProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'character/:id',
        element: <CharacterDetails />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
    ],
  },
]);