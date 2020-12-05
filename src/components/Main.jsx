import React, { useState } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';
import Sidebar from './Sidebar';
import model from './model';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [userCanVote, setUserCanVote] = useState(true);

    const [userVoteData, setUserVoteData] = useState(model);
    const [filmData, setFilmData] = useState(); // will eventually hold the current movie in memory

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
    const insertRoute = baseURL + "db/insert"

    function handleChangeInput (event) {
        setInputValue(event.target.value);
        setFilmDidLoad(false);
        setSearchDidLoad(false);
        setInstructions(<div>Enter a movie title</div>);
        setUserCanVote(true);
    }

    async function handleCreateNewMovieInDB (body) {
        // console.log("create new movie in DB!")

        await axios.post(insertRoute, body)
        // .then(console.log("pushed new data to DB: ", body))
    }

    async function handleSetVoteData (movieID) {
        const response = await axios.get(baseURL + "db/" + movieID) 
    
        if (response.status === 200){
            const voteData = await response.data;
            // console.log(voteData)
            voteData["id"] = movieID;
            voteData["title"] = searchDataFilm.title;
            setUserVoteData(voteData);
        } else {
            const voteData = model;
            model["id"] = movieID;
            voteData["title"] = searchDataFilm.title;
            setUserVoteData(voteData);
        }
    }

    function handleReceivePromise (responseData, destination) {
        if (destination === "film") {
            setSearchDataFilm(responseData);
            handleSetVoteData(responseData.id) // need to handle no data / 404s
            setFilmDidLoad(true);
            
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

    async function handleFilmSubmit () {
        if (inputValue !== "") {
            await axios.get(searchQueryFilm)
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

    async function handleUpdateVote (vote) {
        // console.log("userVoteData before building body: ", userVoteData)
        const body = {                              // Build the body...
                "id": userVoteData["id"],
                "title": userVoteData["title"],
                "voteData": {
                        "upvote": userVoteData["voteData"]["upvote"],
                        "downvote": userVoteData["voteData"]["downvote"]
                }
            }
        // console.log("here's the body: ", body)      // console.log it for confirmation

        // const idCheck = await axios.get(baseURL + 'db/' + searchDataFilm.id)    // check if current movie is in DB
        // if (idCheck.data.id !== userVoteData.id) {          // if current movie is not in DB..
            handleCreateNewMovieInDB(body)              // hand body from above to create a new entry in DB
        // }

        if (vote === "upvote") {
            body["voteData"]["upvote"] = body["voteData"]["upvote"] + 1
            await axios.patch(baseURL + "db/patch/" + vote, body)
            setUserCanVote(false)
            // console.log("userVoteData.id = ", userVoteData.id)
            handleSetVoteData(userVoteData.id);
        } else if (vote === "downvote") {
            body["voteData"]["downvote"] = body["voteData"]["downvote"] + 1
            await axios.patch(baseURL + "db/patch/" + vote, body)
            setUserCanVote(false)
            handleSetVoteData(userVoteData.id);
        } else {
            // console.log("vote update failed: 'upvote' or 'downvote' are only valid URL params after db/patch/")

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
                                usercanvote={userCanVote}
                                upvotes={userVoteData.voteData.upvote}
                                downvotes={userVoteData.voteData.downvote}
                                handlevote={(vote)=>handleUpdateVote(vote)}
                                /> : <div>{instructions}</div>
            }
            {searchDidLoad ? <div className="Sidebar-Container">Not what you're looking for? Try...<Sidebar searchData={searchDataSearch} /></div>  : ""}
        </main>
    )
}
// ["voteData"]["downvotes"]
export default Main;