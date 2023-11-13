import { useEffect, useState } from 'react'
import './App.css'
import Button from './Button'

function App() {
  const [count, setCount] = useState<number>(0);
  const [age, setAge] = useState<number>(0);


  useEffect(() =>{
    console.log('le compteur a changé '+ count);

  },[count]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);

    if (!isNaN(value)) {
      setAge(value);
    }
  };

  const onValidateClick = () => {
    if (age < 18) {
      console.log('mineur');
    } else {
      console.log('majeur');
    }
  };

  return (
    <>
      <div className="card">
        <div>Compteur : {count} </div>
        <Button label='+' onClick={() => setCount((count) => count + 1)}></Button>
        <Button label='-' onClick={() => setCount((count) => count - 1)}></Button>
        <Button label='reset' onClick={() => setCount(0)}></Button>
      </div>

      <div>
        <input type='text' placeholder='Age ?' value={age} onChange={onTextChange} />
        <Button label='Valider' onClick={onValidateClick}></Button>
      </div>
    </>
  )
}

export default App
