import React from 'react'

const Movies = (props)=>{

    const movielist = props.movies.map(movie=><li key={movie._id}>{movie.title} - <small>{movie.description}</small> <button id={movie._id} onClick={props.lift}>X</button></li>)

    return(
        <div>
            <h3>Movies:</h3>
            <ul>
            {movielist}
            </ul>
        </div>
    )
}

export default Movies