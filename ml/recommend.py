import json
import numpy as np
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load recipes from JSON file
with open("recipes.json", "r", encoding="utf-8") as f:
    recipes = json.load(f)

# Build the corpus: name + ingredients + description + (optional) tags
corpus = [
    r["name"] + " " + " ".join(r["ingredients"]) + " " + r["description"] + " " + r.get("tags", "")
    for r in recipes
]

# Vectorize the corpus using TF-IDF
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)

@app.route('/')
def home():
    return "✅ ML Recommendation Server is running!"

@app.route('/recommend', methods=['GET'])
def recommend():
    try:
        recipe_id = int(request.args.get('id'))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid recipe ID"}), 400

    user_taste = request.args.get('taste', "").lower()

    idx = next((i for i, r in enumerate(recipes) if r["id"] == recipe_id), None)
    if idx is None:
        return jsonify({"error": "Recipe not found"}), 404

    # Compute cosine similarity
    similarity_scores = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()

    # Sort scores descending and skip the same recipe
    sorted_indices = similarity_scores.argsort()[::-1][1:]

    filtered_recommendations = []
    for i in sorted_indices:
        r = recipes[i]
        # Match taste if given
        if user_taste:
            if "tags" in r and user_taste in r["tags"].lower():
                filtered_recommendations.append(r)
        else:
            filtered_recommendations.append(r)

        if len(filtered_recommendations) == 5:
            break

    return jsonify(filtered_recommendations)

if __name__ == '__main__':
    app.run(port=5001)



