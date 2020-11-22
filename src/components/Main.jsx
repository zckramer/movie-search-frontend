import React, { useState } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [didLoadData, setDidLoadData] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [instructions, setInstructions] = useState(<div>Enter a movie title</div>)
    
    const baseURL = 'http://localhost:9000/film/'
    const searchString = inputValue;
    const searchQuery = baseURL + searchString;

    function handleChangeInput (event) {
        setInputValue(event.target.value)
        // console.log(inputValue)
    }

    function handleReceivePromise (responseData) {
        setSearchData(responseData);
        setDidLoadData(true);
    }

    function handleInputSubmit (event) {
        event.preventDefault();
        console.log("get request at : " + searchQuery)
        setInstructions(<div>Wait for it..!</div>)
        if (inputValue !== "") {
            axios.get(searchQuery)
                .then(res => handleReceivePromise(res.data.data))
                .catch(err=>console.error(err))
        } else {
            setInstructions(<div>Invalid search</div>)
        }
    }  

    return (
        <main className="Main">
            <h2>xX Movie Search 3000 Xx</h2>
            <form className="Input-Form" onSubmit={event => handleInputSubmit(event, inputValue)}>
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
                    type='submit'
                >
                    Submit
                </button>
            </form>
            {didLoadData ? console.log("searchData state = ", searchData) : ""}
            {didLoadData ? <MovieCard 
                                title={searchData.title} 
                                cast={searchData.cast} 
                                poster={searchData.poster} 
                                releaseyear={searchData.year}
                                length={searchData.length}
                                plot={searchData.plot}
                            /> : <div>{instructions}</div>
            }
        </main>
    )
}

export default Main;