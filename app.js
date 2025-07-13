import { Routes, Route } from 'react-router-dom';
import { Restaurants, Restaurant, Orders } from './pages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<Restaurant />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}