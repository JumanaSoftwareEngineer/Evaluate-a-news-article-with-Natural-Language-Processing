import { isValidUrl } from "./checkURL";

// DOM elements
const errorDiv = document.getElementById("error");
const resultsDiv = document.getElementById("results");

// Event listener for form submission
const handleSubmit = async (event) => {
    event.preventDefault();

    const urlInput = document.getElementById("URL");
    const urlID = urlInput.value;

    if (isValidUrl(urlID)) {
        try {
            // Fetch data, handle success, and update UI
            const data = await fetchData('http://localhost:3001/analyse', { url: urlID });
            updateUI(data);
        } catch (error) {
            console.error("Error:", error);
            handleUIUpdateError("An error occurred while fetching data.");
        }
    } else {
        // Display error on the HTML page
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Please enter a valid article URL';
        resultsDiv.style.display = 'none';
    }
};

const handleFetchError = (code, msg) => {
    errorDiv.style.display = 'block';
    errorDiv.innerText = `Error: ${msg}`;
    resultsDiv.style.display = 'none';
};

// Function to post data to the server
const fetchData = async (url = "", data = {}) => {
    try {
        const result = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const { code } = result.status;

        if (code !== '0') {
            handleFetchError(code, result.status.msg);
        }

        if (!result.ok) {
            // Handle non-successful HTTP status codes
            const errorMessage = await result.text();
            console.error(`Error ${result.status}: ${errorMessage}`);
            handleUIUpdateError(`Server Error: ${errorMessage}`);
            throw new Error(`Server Error: ${errorMessage}`);
        }

        if (!result) {
            handleUIUpdateError("Error: No data received");
            return null;
        }

        const newData = await result.json();
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
        handleUIUpdateError("An error occurred while posting data to the server.");
        throw error; // Rethrow the error
    }
};


// Function to handle UI update errors
const handleUIUpdateError = (errorMessage) => {
    errorDiv.style.display = 'block';
    errorDiv.textContent = errorMessage;
    resultsDiv.style.display = 'none';
};

// Function to update the UI with data
const updateUI = (data) => {
    try {
        // Check if data is undefined, null, or empty
        if (!data || Object.keys(data).length === 0) {
            handleUIUpdateError("No data available.");
            return;
        }
        
        // Update UI elements with data
        document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement || 'N/A'}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity || 'N/A'}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence || 'N/A'}`;
        document.getElementById("irony").innerHTML = `Irony: ${data.irony || 'N/A'}`;
        document.getElementById("score_tag").innerHTML = `Score Tag: ${data.score_tag || 'N/A'}`;

        // Show results and hide errors
        showResults();
    } catch (error) {
        console.error('Error updating UI:', error);
        handleUIUpdateError("An error occurred while updating the UI.");
    }
};

// Function to show results and hide errors
const showResults = () => {
    errorDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
};

export {
    handleSubmit,
};