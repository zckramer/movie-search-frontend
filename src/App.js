import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [didSearch, setDidSearch] = useState(false);
  const [searchData, setSearchData] = useState({});

  function handleInputSubmit () {

  }

  return (
    <div className="App">
      <header className="Header">
        <div className="Header__Logo">Kramersoft</div>
        <div className="Header__Item">About Me</div>
        <div className="Header__Item">Tech Stack</div>
      </header>
      <main className="Main">
        <h2>xX Movie Search 3000 Xx</h2>
        <form className="Input-Form">
          <input 
            className="Input-Form__Input"
            type="text" 
            placeholder="Search for a movie title"
            onChange={(event)=>{setInputValue(event.target.value)}}
            onSubmit={()=>{}} 
            value={inputValue}
          />
          <button className="Input-Form__Submit-Button">Submit</button>
        </form>
        <hr />
        {didSearch ? searchData : "This is going to be sweet..!"}
      </main>
    </div>
  );
}

export default App;
