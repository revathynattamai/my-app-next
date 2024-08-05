import React, { useContext } from 'react';
import { baseUrl } from '../utils';
import { MovieContext } from "../dataContext";
import styles from './styles.module.css';

function showNavBar() {
    const { movies, searchList, view, title, searchTerm, setSearchTerm, setView, setSearchList } = useContext(MovieContext);

    const handleSearchValueChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            setView("main");
        }
    }

    const handleSearch = () => {
        let searchedMovies = movies.filter((movie) => {
            if (movie.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return movie;
            }
        });
        setSearchList(searchedMovies);
        setView("search");
        if (searchTerm === "") {
            setView("main");
        }
    }

    const handleBack = () => {
        setView("main");
        setSearchTerm("");
    }

    return (<div className={styles.nav}>
        <div className={styles.leftNav}>
            <img className={styles.imageInNavLeft} src={`${baseUrl}images/Back.png`} onClick={handleBack} />
            <div className={styles.items}>{title} </div>
        </div>
        <div className={styles.rightNav}>
            <input type="text" className={styles.inputInNav} onChange={(event) => handleSearchValueChange(event)} onKeyDown={(e) => {
                if (e.key === "Enter")
                    handleSearch()
            }}></input>
            <img className={styles.imageInNavRight} src={`${baseUrl}images/search.png`} onClick={handleSearch} />
        </div>
    </div>)

}

export default showNavBar;