import { StatusBar } from 'expo-status-bar';
import HomePage from './src/pages/HomePage';
import './global.css';

export default function App() {
  return (
    <>
      <HomePage />
      <StatusBar style="dark" backgroundColor="transparent" translucent />
    </>
  );
}