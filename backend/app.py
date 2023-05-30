import os
import psycopg2

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Creating the recipe table
CREATE_RECIPE_TABLE = (
    "CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY,title VARCHAR(255) NOT NULL, description TEXT, ingredients TEXT, instructions TEXT);"
)

# Inserting values to the recipes table
INSERT_RECIPE = "INSERT INTO recipes (title, description, ingredients, instructions) VALUES (%s, %s, %s, %s) RETURNING id;"

# To get all recipes
RECIPES = "SELECT title, description, ingredients, instructions FROM recipes"

# Update recipe
UPDATE_RECIPE = """
    UPDATE recipes
    SET title = %s, description = %s, ingredients = %s, instructions = %s
    WHERE title = %s
"""


load_dotenv()

app = Flask(__name__)
CORS(app)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

# API to add recipe
@app.route('/api/add_recipe', methods=["POST"])
def add_recipe():
    data = request.get_json()
    title = data['title']
    description = data['description']
    ingredients = data['ingredients']
    instructions = data['instructions']
    
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_RECIPE_TABLE)
            cursor.execute(INSERT_RECIPE, (title, description, ingredients, instructions))
            recipe_id = cursor.fetchone()[0]
    
    return {"Recipe ID": recipe_id, "message": f"{title} recipe added."}, 201

# API to get all recipes/ a particular recipe/ recipe with similar title
@app.route('/api/recipes', methods=["GET"])
def get_recipes():
    try:

        with connection:
            with connection.cursor() as cursor:
                # Get the 'title' query parameter from the request
                title = request.args.get('title')
                if title:
                    cursor.execute("SELECT title, description, ingredients, instructions FROM recipes WHERE title ILIKE %s", (f'%{title}%',))
                # If 'title' not provided get all recipes
                else:
                    cursor.execute(RECIPES)
                
                recipes = cursor.fetchall()
                
        items = {}
        for recipe in recipes:
            items[recipe[0]] = {
                                # "Recipe ID": recipe[0],
                                "Description": recipe[1],
                                "Ingredients": recipe[2],
                                "Instructions": recipe[3]
                                }
        return items, 200

    except(Exception, psycopg2.Error) as error:
        return f"Error fetching recipes from the database:{error}"

# API to edit a recipe
@app.route('/api/edit_recipe/<int:recipe_id>', methods=["PUT"])
def edit_recipe(recipe_id):
    data = request.get_json()
    title = data['title']
    description = data['description']
    ingredients = data['ingredients']
    instructions = data['instructions']

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(UPDATE_RECIPE, (title, description, ingredients, instructions, recipe_id))

    return {"Recipe ID":recipe_id, "message": f"{title} recipe updated."}, 200

    

if __name__ == "__main__":
    app.run(debug=True)