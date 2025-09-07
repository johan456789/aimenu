export const analyzeMenu = async (image: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key on the backend');
      }
      throw new Error('Failed to analyze menu');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing menu:', error);
    if (error instanceof Error && error.message.includes('401')) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to analyze menu');
  }
};
