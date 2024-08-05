import React, { memo, useContext } from 'react';
import uuid from 'react-uuid';
import { baseUrl } from '../utils';
import { MovieContext } from '../dataContext';
import styles from './styles.module.css';

const handleImgeError = (event) => {
    return event.target.src = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";
}

const showMovieList = (movies) => {
    if (!movies?.length) { return <div>No movies</div> }
    return movies?.map((movie) => {
        return (<div className={styles.movie} key={uuid()}>
            <img className = {styles.imageProcessing} src={`${baseUrl}images/${movie["poster-image"]}`} onError={handleImgeError} />
            <span className = {styles.spanProcessing}>{movie?.name}</span>
        </div>)
    })
}

const MovieList = memo(function MovieList() {
    const { movies, searchList, view } = useContext(MovieContext);
    return (
        <div className={styles.movieContainer}>
            {view === "main" && showMovieList(movies)}
            {view === "search" && showMovieList(searchList)}
        </div>)
})


export default MovieList;