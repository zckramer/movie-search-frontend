const MovieCard = (props) => {
    return (
        <div className="Movie-Card">
            <div className="Movie-Card__Header">
                <h3 className="Movie-Card__Header__Title">{props.title}</h3>
            </div>
            <div className="Movie-Card__Main">
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
                <img className="Movie-Card__Main__Poster" src={props.poster} alt="This movie's primary poster"/>
            </div>
        </div>
    )
}
export default MovieCard;