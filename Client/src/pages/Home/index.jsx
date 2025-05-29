import React from "react";
import Category from "./Category";
import Hero from "./Hero";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Hero />
      <Link to="/products"></Link>
      <div className="mx-auto w-11/12 mb-6 md:mb-12">
        <Category />
      </div>
    </>
  );
}

export default Home;
