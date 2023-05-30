import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/recipes');
        setRecipes(response.data);
    } catch (error) {
        setError('Error fetching recipes.')
        console.log('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/recipes?title=${searchQuery}`);
        setRecipes(response.data);
    } catch (error) {
        setError('Error searching recipes.');
        console.log('Error searching recipes:', error);
    }
    setLoading(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

//   const handleEditRecipe = async (recipeId) => {
//     console.log(recipes)
//     const newTitle = prompt('Enter new title:');
//     if (newTitle) {
//       const recipe = recipes['title'];
//       const updatedRecipe = { ...recipe, title: newTitle };

//       try {
//         await axios.put(`http://127.0.0.1:5000/api/edit_recipe/${recipe["Recipe ID"]}`, updatedRecipe);
//         // Refresh the recipes after successful edit
//         fetchRecipes();
//       } catch (error) {
//         console.log('Error editing recipe:', error);
//       }
//     }
//   };

  const handleHomeButtonClick = async () => {
    setSearchQuery('');
    fetchRecipes();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Recipe List</h1>
        <form onSubmit={handleSearch}>
            <div className="form-group">
            <input
                type="text"
                name="search"
                placeholder="Search recipes by title"
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <button type="submit" className='submit-button'>Search</button>
            <button className="home-button" onClick={handleHomeButtonClick}>
                    All Recipes
            </button>
        </div>
        </form>

      {Object.keys(recipes).length > 0 ? (
        <>
          {Object.entries(recipes).map(([title, recipe]) => (
            <div className="recipe" key={title}>
              <h2>{title}</h2>
              <p className="description">Description: {recipe.Description}</p>
              <p className="ingredients">Ingredients: {recipe.Ingredients}</p>
              <p className="instructions">Instructions: {recipe.Instructions}</p>
            </div>
          ))}
        </>
      ) : (
          <p>No recipes found.</p>
      )}
    </div>
  );
}

export default RecipeList;
