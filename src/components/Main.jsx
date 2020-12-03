import React, { useState } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';
import Sidebar from './Sidebar';
import model from './model';

const Main = () => {
    const [inputValue, setInputValue] = useState('');

    const [userVoteData, setUserVoteData] = useState(model);

    const [searchDataFilm, setSearchDataFilm] = useState({});
    const [filmDidLoad, setFilmDidLoad] = useState(false);

    const [searchDataSearch, setSearchDataSearch] = useState({});
    const [searchDidLoad, setSearchDidLoad] = useState(false);
    
    const [instructions, setInstructions] = useState(<div>Enter a movie title</div>);
    
    const baseURL = 'http://localhost:9000/';
    const filmURL = 'film/';
    const searchURL = 'search/';
    const searchString = inputValue;
    const searchQueryFilm = baseURL + filmURL + searchString;
    const searchQuerySearch = baseURL + searchURL + searchString;

    function handleChangeInput (event) {
        setInputValue(event.target.value);
        setFilmDidLoad(false);
        setSearchDidLoad(false);
        setInstructions(<div>Enter a movie title</div>);
    }

    async function handleSetVoteData (movieID) {
        const response = await axios.get(baseURL + "db/" + movieID) 
    
        if (response.status === 200){
            const voteData = response.data;
            voteData["id"] = movieID;
            setUserVoteData(voteData);

        } else {
            const voteData = model;
            model["id"] = movieID;
            setUserVoteData(voteData);
        }
            console.log(response.data)
    }

    function handleReceivePromise (responseData, destination) {
        if (destination === "film") {
            setSearchDataFilm(responseData);
            handleSetVoteData(responseData.id) // need to handle no data / 404s
            setFilmDidLoad(true);
            console.log(userVoteData)
        } else if (destination === "search") {
            setSearchDataSearch(responseData)
            setSearchDidLoad(true);
        }
    }

    function handleInputSubmit (event) {
        event.preventDefault();
        setInstructions(<div>Wait for it..!</div>)
        handleFilmSubmit();
        handleSearchSubmit();
    }  

    function handleFilmSubmit () {
        if (inputValue !== "") {
            axios.get(searchQueryFilm)
                .then(res => handleReceivePromise(res.data.data, "film"))
                .catch(err=>console.error(err))
        } else {
            setInstructions(<div>Invalid search</div>)
        }
    }

    function handleSearchSubmit () {
        if (inputValue !== "") {
            axios.get(searchQuerySearch)
                .then(res => handleReceivePromise(res.data.data.titles, "search"))
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
                <button 
                    className="Input-Form__Submit-Button"
                    type='submit'
                >
                    Submit
                </button>
            </form>
            {filmDidLoad ? <MovieCard 
                                title={searchDataFilm.title} 
                                cast={searchDataFilm.cast} 
                                poster={searchDataFilm.poster} 
                                releaseyear={searchDataFilm.year}
                                length={searchDataFilm.length}
                                plot={searchDataFilm.plot}
                                upvotes={userVoteData.voteData.upvote}
                                downvotes={userVoteData.voteData.downvote}
                                /> : <div>{instructions}</div>
            }
            {searchDidLoad ? <div className="Sidebar-Container">Not what you're looking for? Try...<Sidebar searchData={searchDataSearch} /></div>  : ""}
        </main>
    )
}
// ["voteData"]["downvotes"]
export default Main;