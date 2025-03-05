import React from 'react';
import { useMealPlan } from '../context/MealPlanContext.js';

const UsersOnline = () => {
  const { peers } = useMealPlan();
  
  return (
    <div className="users-online">
      {Object.keys(peers).map(clientId => (
        <div key={clientId} className="user-indicator" title={peers[clientId].username}>
          <img 
            src={`https://images.websim.ai/avatar/${peers[clientId].username}`} 
            alt={peers[clientId].username} 
            className="avatar" 
          />
        </div>
      ))}
    </div>
  );
};

export default UsersOnline;

