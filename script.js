const form = document.getElementById('url-form');
const longUrlInput = document.getElementById('long-url');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const longUrl = longUrlInput.value;

  try {
    const response = await fetch('http://localhost:4000/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ long_url: longUrl }), // Convert longUrl to JSON string
    });

    const data = await response.json();
    console.log(data); // For debugging

    if (data.success) {
      resultDiv.textContent = `Short URL: ${data.longUrl}`;
    } else {
      // Handle server-side error message (if provided)
      resultDiv.textContent = `Error: ${data.message || 'Server error'}`;
    }
  } catch (error) {
    // Handle other errors (network, parsing, etc.)
    resultDiv.textContent = `Error: ${error.message || 'Network or processing error'}`;
  }

  longUrlInput.value = ''; // Clear the input field
});
