import { useState, useEffect } from "react";
import'../styles/search.css'

export default function Search ({setMovieDetails, setIntro, setMovieToPlay, search}) {
    const [movies, setMovies] = useState('')
     async function getSearch (){
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&query=${search}&page=1&with_genres=27`)
        const response = await data.json()
        setMovies(response.results)
     }
        useEffect(() =>{
            if(search){
                getSearch()
            }
        },[search])

        if(!movies){
            return(
                <div>

                </div>
            )
        }
    return(
        <div className="searchResult">
              {movies.map((movie) => 
            <div key={movie.id} className='searchContainer'  onClick={() => setMovieDetails(movie)}>
                <img src={`http://image.tmdb.org/t/p/w342//${movie.backdrop_path || movie.poster_path}`} alt={movie.title} className='caroselImage' />
                <div className="movieControls">
                <span className="material-symbols-outlined play" onClick={() => {setIntro(true); setMovieToPlay(movie.id)}}>
                    play_circle
                </span>
                <span className="material-symbols-outlined add">
                    add_circle
                </span>
                <span className="material-symbols-outlined" onClick={() => setMovieDetails(movie)}>
                    expand_circle_down
                </span>
                <h2>
                    {movie.title}
                </h2>
                </div>
            </div>
           )}
        </div>
    )
}