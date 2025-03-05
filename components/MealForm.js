import React, { useState } from 'react';
import { useMealPlan } from '../context/MealPlanContext.js';

const MealForm = () => {
  const { generateMeal, isGenerating } = useMealPlan();
  const [mealType, setMealType] = useState('breakfast');
  const [preferences, setPreferences] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!preferences.trim()) {
      setError('Please enter your meal preferences');
      return;
    }

    try {
      await generateMeal({
        mealType,
        preferences,
        ingredients: ingredients.trim() ? ingredients : 'any ingredients'
      });
      
      // Reset form after successful submission
      setPreferences('');
      setIngredients('');
    } catch (error) {
      setError('Failed to generate meal. Please try again.');
      console.error('Error generating meal:', error);
    }
  };

  return (
    <div className="generator-form">
      <h2>Generate Vegan Meal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mealType">Meal Type</label>
          <select 
            id="mealType" 
            value={mealType} 
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="preferences">Preferences (e.g., spicy, gluten-free, quick to make)</label>
          <textarea 
            id="preferences" 
            value={preferences} 
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Enter your meal preferences..."
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Specific Ingredients (optional)</label>
          <textarea 
            id="ingredients" 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients you'd like to include..."
            rows="3"
          ></textarea>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Meal'}
        </button>
      </form>
    </div>
  );
};

export default MealForm;

