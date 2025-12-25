// Utility to reset all statistics to zero
export const resetAllStats = () => {
  // Clear localStorage data
  localStorage.removeItem('cardsStats');
  localStorage.removeItem('globalStats');
  localStorage.removeItem('cardsStats_update');
  
  // Reload the page to reinitialize everything
  window.location.reload();
};

// Reset stats for development/testing
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  window.resetStats = resetAllStats;
}
