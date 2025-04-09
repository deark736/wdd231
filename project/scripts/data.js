// scripts/data.js
export async function getAttractions() {
  try {
    const response = await fetch('data/attractions.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData.items;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}