import React, { useState } from 'react';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [didSearch, setDidSearch] = useState(false);
    const [searchData, setSearchData] = useState({});
    
    function handleChangeInput (event) {
        setInputValue(event.target.value)
        console.log(inputValue)
    }

    function handleInputSubmit () {
        console.log(inputValue)
        
    }  

    return (
        <main className="Main">
            <h2>xX Movie Search 3000 Xx</h2>
            <form className="Input-Form" onSubmit={(event)=>event.preventDefault()}>
                <input 
                    id="inputField"
                    className="Input-Form__Input"
                    type="text" 
                    placeholder="Search for a movie title"
                    onChange={(event)=>{handleChangeInput(event)}}
                    value={inputValue}
                />
                <button // this submission form isn't working yet...
                    className="Input-Form__Submit-Button"
                    onClick={()=>handleInputSubmit}
                    ref={document.getElementById("inputField")}>
                    Submit
                </button>
            </form>
            <hr />
            {didSearch ? searchData : "This is going to be sweet..!"}
        </main>
    )
}

export default Main;