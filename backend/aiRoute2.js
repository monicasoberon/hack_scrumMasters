const { Configuration, OpenAIApi } = require('openai');

// Set up the configuration with your API key
const configuration = new Configuration({
  apiKey: 'sk-proj-sk-proj-ZbThPEDxvDocer0kLYugT3BlbkFJ3Jcl1NkueunTL7ODHwAX',
});
const openai = new OpenAIApi(configuration);

async function getChatGPTResponse(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling the OpenAI API:", error);
  }
}

const prompt = "Hello, how can I receive a message from ChatGPT-4 and print it?";

getChatGPTResponse(prompt).then(responseMessage => {
  console.log(responseMessage);
});

// Optional: Handle errors and exceptions
