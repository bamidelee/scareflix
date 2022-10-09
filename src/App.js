import Intro from './components/intro';
import './App.css';
import {useEffect, useState} from 'react'
import NavBar from './components/navbar'
import Carousel from './components/carosel';


function App() {
  const [intro, setIntro] = useState(false)
  const [movies, setMovies] = useState(null)
  const [topRated, setTopRated] =  useState(null)
  const [popular, setPopuar] = useState(null)
  const [scroll, setScroll] = useState(0)
  const [randomMovie, setRandomMovie] = useState(0)
  const horrorMovies = async() =>{
    const data= fetch('https://api.themoviedb.org/3/discover/movie/?api_key=bbd1ce36128d0ca7ce2b72805abdd190&with_genres=27' )
    const topRatedData =  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27' )
    const popularData =  fetch('https://api.themoviedb.org/3/movie/popular?api_key=bbd1ce36128d0ca7ce2b72805abdd190&language=en-US&page=1&with_genres=27' )
    const response = await data.json()
    const response2 = await topRatedData.json()
    console.log(response2)
    setMovies(response.results)
  }

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
    { movies && <header style={{backgroundImage:`url(http://image.tmdb.org/t/p/original//${movies[randomMovie].backdrop_path})`}}>
        <NavBar scroll={scroll}/>
        <div className='headerDetails'>
          <h1>
            {movies[randomMovie].original_title}
          </h1>
          <div className='buttonsContainer'>
            <button className='playButton'>
              Play
            </button>
            <button className='infoButton'>
            <span className="material-symbols-outlined">
              info
            </span>
            More info
            </button>
          </div>
          <p>
            {movies[randomMovie].overview}
          </p>
        </div>
      </header>}
      <div>
        <Carousel movies={movies} title={'Trending'}/>
      </div>
    </div>
  );
}

export default App;
