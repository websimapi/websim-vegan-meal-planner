import React from 'react';

const MealCard = ({ meal }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="meal-card">
      <img src={meal.imageUrl} alt={meal.title} className="meal-image" />
      <div className="meal-info">
        <div className="meal-title">{meal.title}</div>
        <div className="meal-description">{meal.description}</div>
        <div className="meal-meta">
          <span>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</span>
          <span>by {meal.username} • {formatDate(meal.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

