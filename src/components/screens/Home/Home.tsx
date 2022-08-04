import dynamic from "next/dynamic";
import React from "react";
import Hero from "./components/Hero/Hero";
import NewFilms from "./components/NewMovies/NewFilms";
import NewSeries from "./components/NewMovies/NewSeries";

const Home = () => {
  return (
    <>
      <Hero />
      <NewFilms />
      <NewSeries />
    </>
  );
};

export default Home;
