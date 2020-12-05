import { useState } from 'react';

const MovieCard = (props) => {

    return (
        <div className="Movie-Card">
            <div className="Movie-Card__Header">
                <img className="Movie-Card__Main__Poster" src={props.poster} alt="This movie's primary poster"/>
            </div>
            <div className="Movie-Card__Main">
                <h3 className="Movie-Card__Header__Title">{props.title}</h3>
                <ul className="Movie-Card__Main__Cast-List">
                    {props.cast.map((actor, index) => 
                        <li className="Movie-Card__Main__Cast-List-Item" key={("actorList" + index)}>{actor.actor}, as {actor.character}</li>
                    )}
                </ul>
                <div className="Movie-Card__Main__Info">
                    <p>Release year: {props.releaseyear}</p>
                    <p>Feature length: {props.length}</p>
                    <p>{props.plot}</p>
                </div>
            </div>
            {props.usercanvote ? 
                <div className="Movie-Card__Vote-Area">
                        <div className="upvote" onClick={()=>props.handlevote("upvote")}>^</div>
                        <div className="downvote" onClick={()=>props.handlevote("downvote")}>v</div>
                </div>
                : ""
            }
            {props.usercanvote ? "" : 
                <div className="Movie-Card__Vote-Area">
                        <div className="upvote" >{props.upvotes}</div>
                        <div className="downvote" >{props.downvotes}</div>
                </div>
            }
        </div>
    )
}
export default MovieCard;