const {
    API_KEY, ANALYSIS_API,
  } = process.env;
  
  /**
   * Call Analysis API
   */
  const analyse = async (req, res) => {
    try {
      const { body: { url } } = req;
  
      if (!url) {
        return res.status(400).send({ error: "URL is required in the request body" });
      }
  
      const apiUrl = `${ANALYSIS_API}?key=${API_KEY}&url=${url}&lang=en`;
      //console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl, { method: 'POST' });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      res.send(result);
    } catch (error) {
      console.error("Error during API call:", error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    analyse,
  };
  