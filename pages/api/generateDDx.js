import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  //   const basePromptPrefix = `Generate a list of five differential diagnoses with the most likely first and the least likely last from the following history of present illness.

  // history of present illness:
  // ${req.body.userInput}

  // differential diagnoses:
  // '`;

  //   // Run first prompt
  //   console.log(`API: ${basePromptPrefix}`);

  //   const baseCompletion = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: `${basePromptPrefix}\n`,
  //     temperature: 0.7,
  //     max_tokens: 250,
  //   });

  //   const basePromptOutput = baseCompletion.data.choices.pop();

  const GPT35TurboMessage = [
    {
      role: 'system',
      content: `You are a health care practitioner. Generate a list of three differential diagnoses with the most likely first and the least likely last from the following history of present illness. State why you think it is likely or unlikely.`,
    },
    {
      role: 'user',
      content: req.body.userInput,
    },
  ];

  let GPT35Turbo = async (message) => {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
    });

    return response.data.choices[0].message.content;
  };

  const output = await GPT35Turbo(GPT35TurboMessage);
  console.log(output);

  res.status(200).json({ output });
};

export default generateAction;
