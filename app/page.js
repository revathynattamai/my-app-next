'use client';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from "react-error-boundary";
import { baseUrl } from './utils';
import { MovieContext } from "./dataContext";

const MovieList = dynamic(() => import("./components/movieList"));
const NavBar = dynamic(() => import("./components/navBar"));

export default function App() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [isReachBottom, setIsReachBottom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("main");
  const [searchList, setSearchList] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}data/page${page}.json`);
    const result = await response.json();
    if (data) {
      setData(result.page);
      setTitle(result.page.title);
      setMovies([...movies, ...result.page['content-items'].content]);
    } else {
      setData(result.page);
      setMovies(result.page['content-items'].content);
      setTitle(result.page.title);
    }
  }

  const onscroll = () => {
    const scrolledTill = window.scrollY + window.innerHeight;
    const minVal = 300;
    setIsReachBottom(document.body.scrollHeight - minVal < scrolledTill);
    if (isReachBottom && movies?.length != data?.['total-content-items']) setPage(page + 1)
  };

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, [isReachBottom]);

  return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>  
        <Suspense fallback={<div>Loading</div>}>
        <MovieContext.Provider value={{ movies, searchList, view, title, searchTerm, setSearchTerm, setView, setSearchList }}>
          <NavBar />
          <MovieList />
          </MovieContext.Provider>
        </Suspense>
      </ErrorBoundary >
  )
}