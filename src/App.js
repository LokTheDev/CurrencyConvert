import Form from './container/form';
import Header from './components/header'
import { useState } from 'react';

function App() {
  const [result, setResult] = useState("")
  return (
    <div className='App'>
      <Header />
      <Form handler={setResult} />
      <h1>{result}</h1>
    </div>
  );
}

export default App;
