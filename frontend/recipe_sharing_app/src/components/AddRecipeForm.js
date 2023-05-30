import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

function AddRecipeForm() {
    const[formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
    });

    const[error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://127.0.0.1:5000/api/add_recipe', formData);
            console.log('Recipe added successfully!');
            setFormData({
                title: '',
                description: '',
                ingredients: '',
                instructions: '',
            });
            setError('');
        } catch(error) {
            console.log('Error adding recipe: ', error);
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className="container">
          <h1>Add Recipe</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Ingredients:</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows={4}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Instructions:</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={4}
                required
              ></textarea>
            <button type="submit">Add Recipe</button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      );
    }
    

export default AddRecipeForm;