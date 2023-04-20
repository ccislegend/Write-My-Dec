const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { textInput } = JSON.parse(event.body);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the following text into an Air Force Achievement Medal Citation: ${textInput}`,
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: response.data.choices[0].text }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
