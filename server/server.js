const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: "./server/.env" });

const app = express();
const port = process.env.PORT || 3001;

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("Organization ID:", process.env.OPENAI_ORGANIZATION_ID);
console.log("API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(config);

const whitelist = ["http://localhost:3001", "https://writemydec.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { textInput } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Convert the following text into an Air Force Achievement Medal Citation: ${textInput}`,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
  });

  res.json({
    response: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
