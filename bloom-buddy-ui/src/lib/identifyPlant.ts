export async function identifyPlant(imageBase64: string) {
  const response = await fetch('https://api.plant.id/v2/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': 'BPYqcnpORYgjMBMZYVjP6gxNJRXuQbkKb2jYu4qSGfcdszlOlZ' // Replace with your Plant.id API key
    },
    body: JSON.stringify({
      images: [imageBase64],
      // Add other parameters as needed
    })
  });

  if (!response.ok) {
    throw new Error('Failed to identify plant');
  }

  return response.json();
} 