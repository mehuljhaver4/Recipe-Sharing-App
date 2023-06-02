# Recipe Sharing App

Welcome to the Recipe Sharing App! This web application allows users to view, add, and edit recipes. Users can explore a collection of delicious recipes, contribute their own recipes, and update existing recipes as needed.

## Features

- View a List of Recipes: Browse through a collection of mouth-watering recipes with titles, descriptions and more.
- Add a Recipe: Share your favorite recipes with the community by adding new recipes.
- Edit a Recipe: Update the details of any recipe, including the title, description, ingredients, and instructions.

## Technologies Used

- Frontend: React.js
- Backend: Flask (Python)
- Database: PostgreSQL

## Setup

1. Clone the repository:
   
   git clone https://github.com/mehuljhaver4/recipe-sharing-app.git

2. Install dependencies:
    - Frontend:
      - cd recipe-sharing-app/frontend
      - npm install

    - Backend:
      - cd recipe-sharing-app/backend
      - pip install -r requirements.txt
 
3. Set up the database:

  - Create a PostgreSQL database.
  - Update the database connection details in the backend Flask app (app.py) by modifying the DATABASE_URL variable.

4. Start the development servers:

    - Frontend:
      - cd recipe-sharing-app/frontend
      - npm start

   - Backend:
     - cd recipe-sharing-app/backend
     - flask run

5. Open your web browser and navigate to http://localhost:3000 to access the Recipe Sharing App.

## API Endpoints
- GET /api/recipes: Get the list of all recipes.
- POST /api/add_recipe: Add a new recipe.
- PUT /api/edit_recipe/<recipe_id>: Edit an existing recipe.
