import Intro from './components/intro';
import './App.css';
import {useEffect, useState} from 'react'
import NavBar from './components/navbar'
import Carousel from './components/carosel';
import Info from './components/info';
import Search from './components/search';


function App() {
  const [intro, setIntro] = useState(false)
  const [movies, setMovies] = useState(null)
  const [scroll, setScroll] = useState(0)
  const [randomMovie, setRandomMovie] = useState(0)
  const [movieToPlay, setMovieToPlay] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)
  const [video, setVideo] = useState(null)
  const [search, setSearch] = useState('')
  const horrorMovies = async() =>{
    const data= fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27&append_to_response=videos' )
    const topRatedData =  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27' )
    const popularData =  fetch('https://api.themoviedb.org/3/movie/popular?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27' )
    const upcomingData =  fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27' )
    Promise.all([data, topRatedData, popularData, upcomingData])
    .then(results => Promise.all(results.map(r => r.json())) )
    .then(results =>{
        setMovies({trending: results[0].results, topRated:results[1].results, popular:results[2].results, upcoming: results[3].results })
    })
   
  }

  async function PlayVideo (){
      setTimeout(() => setIntro(false), 5000)
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieToPlay}/videos?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US`)
      const response = await data.json()
      setVideo(`https://www.youtube.com/embed/${response.results[0].key}`)
  }

useEffect(() => {
  if(intro){
    PlayVideo()
  }
}, [intro])

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  }
  useEffect(() => {
      horrorMovies()
    setRandomMovie(Math.floor(Math.random() * 20))
  },[])
useEffect(() =>{
  window.addEventListener('scroll', handleScroll )
  return ()=> window.removeEventListener('scroll', handleScroll )
},[])


  if(intro){
    return(
      <>
            <Intro intro={intro}/>
      </>
    )
  }
  return (
    <div className="App"> 
     <NavBar scroll={scroll} Search = {search} setSearch = {setSearch}/>
      { movieDetails && <Info movie={movieDetails} setMovieDetails ={setMovieDetails} />}
      {video && <div className='iframeContainer'>
     <iframe src={video} title='doom' frameBorder="0"  autoPlay= '1'>
      </iframe>
      <span className="material-symbols-outlined" onClick={() => setVideo(null)}>
          arrow_back
      </span>
   </div>}
   
      {search? <Search setMovieDetails ={setMovieDetails} setIntro={setIntro} setMovieToPlay={setMovieToPlay} search={search}/>: 
      <div style={movieDetails? {WebkitFilter: 'brightness(50%)'}: {WebkitFilter:'brightness(100%)'}}>
      { movies && <header style={{backgroundImage:`url(http://image.tmdb.org/t/p/original//${movies.trending[randomMovie].backdrop_path})`}}>
      
          <div className='headerDetails'>
            <h1>
              {movies.trending[randomMovie].original_title}
            </h1>
            <div className='buttonsContainer'>
              <button className='playButton' onClick={()=> {setIntro(true); setMovieToPlay(movies.trending[randomMovie].id)}}>
                Play
              </button>
              <button className='infoButton' onClick={() => setMovieDetails(movies.trending[randomMovie])}>
              <span className="material-symbols-outlined" >
                info
              </span>
              More info
              </button>
            </div>
            <p>
              {movies.trending[randomMovie].overview}
            </p>
          </div>
        </header>}
      {movies &&  <div>
          <Carousel movies={movies.trending} title={'Trending'} setMovieDetails={setMovieDetails} setIntro = {setIntro} setMovieToPlay={setMovieToPlay}/>
          <Carousel movies={movies.topRated} title={'Top rated'}  setMovieDetails={setMovieDetails} setIntro = {setIntro} setMovieToPlay={setMovieToPlay}/>
          <Carousel movies={movies.popular} title={'Popular'} setMovieDetails={setMovieDetails} setIntro = {setIntro} setMovieToPlay={setMovieToPlay}/>
          <Carousel movies={movies.upcoming} title={'Upcoming'} setMovieDetails={setMovieDetails} setIntro = {setIntro} setMovieToPlay={setMovieToPlay}/>
        </div>}
    </div>}
    </div>
  );
}

export default App;
