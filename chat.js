const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure you have set this in your environment variables
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const userMessage = req.body.message;

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userMessage,
        max_tokens: 150,
      });

      res.status(200).json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: "Error in API request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
