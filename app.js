const express = require('express');
const axios = require('axios');

const app = express()
const gpt_j_endpoint = 'https://eleuther-ai-gpt-j-6b-float16-text-generation-api-ainize-team.endpoint.ainize.ai/predictions/text-generation'

app.use(express.json());

app.set('port', process.env.PORT || 3000)
;
app.get('/', (req, res) => {
    res.send('Hello, Express');
})

app.post('/chat', async (req, res) => {
    const {text_inputs} = req.body;
    const t = await axios.post(gpt_j_endpoint, {
        text_inputs,
        temperature: 0.9,
        top_p: 0.95,
        repetition_penalty: 0.8,
        do_sample: true,
        top_k: 50,
        length: 50
    });
    console.log(t);
    res.send(t);
});