import '../styles/info.css'


function Info({movie, setMovieDetails}) {


    return(
        <div className="info">
            <div className='infoImage'>
                <img src={`http://image.tmdb.org/t/p/original//${movie.backdrop_path || movie.poster_path}`} alt={movie.title} />
                <span className="material-symbols-outlined infoClose" onClick={() => setMovieDetails(null)}>
                    cancel
                </span>
            </div>
            <div className='movieDetails'>
                <h2 className='movieTitle'>
                    {movie.title}
                </h2>
                <p>
                    {movie.overview}
                </p>
                <div className='splitter'></div>
                <h2>
                    Info on {movie.title}
                </h2>
                <p><span>Genre:</span> Horror</p>
                <p><span>Release date:</span> {movie.release_date}</p>
                <p><span>Average vote:</span> {movie.vote_average}</p>
                <p><span>Original language:</span> {movie.original_language}</p>
                <p><span>Age classification:</span> {movie.adult?'Suitable for all ages': 'Not suitable for kids'}</p>
            </div>
        </div>
    )
}

export default Info