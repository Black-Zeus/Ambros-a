import { StatusBar } from 'expo-status-bar';
import { Home } from './src/Home';

import './global.css';

export default function App() {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
}