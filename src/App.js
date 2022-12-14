import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const YOUR_APP_ID = "5adcb7c1";
  const YOUR_APP_KEY = "644d7591cff9bc4473f9d25352c51b93";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch
          (`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY }`);
    const data = await response.json();
    setRecipes(data.hits);
  };
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <div className="App">
    <form className="search-form" onSubmit={getSearch}  >
      <input className="search-bar" type="text" value={search}
           onChange={updateSearch} />
      <button className="search-button" type="submit" >
           Search
      </button>
    </form>
    <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />

      ))}
    </div>
  </div>
  );
}

export default App;
