import { createContext, useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Header from './components/Header';
import Container from './components/Container';

export const StepContext = createContext(null);
export const DataContext = createContext(null);


export default function App() {

  const [ data, setData ] = useState('');
  const [ step, setStep ] = useState('home');
  

  useEffect(() => {
    async function getData() {
      const newData = await fetch('/data/data.json').then(r => r.json());
      setData(JSON.parse(localStorage.getItem('data')) || newData);
    }
    getData();
  }, []);

  return (
    <div className='container'>
      <DataContext.Provider value={{ data, setData }}>
        <StepContext.Provider value={{ step, setStep }}>
          <Header />
          <div className="container-fluid">
            <Container />
          </div>
        </StepContext.Provider>
      </DataContext.Provider>
    </div>
  )
}

