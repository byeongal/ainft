const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express()
console.log('Read Data');
const data = fs.readFileSync(process.env.DATA || './data.txt', 'utf-8');
console.log('Read Data Done');

const endpoint = process.env.ENDPOINT;

app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send({
        data
    })
})

const processingResponse = (responseText) => {
    let retText = "";
    for(let i = 0;i<responseText.length;i++){
        if(responseText[i] === "\n" || responseText.substr(i,i + 7) === "Human: " || responseText.substr(i, i + 4) === "AI: ")
            break
        retText += responseText[i]
    }
    return retText.trim();
}

app.post('/chat', async (req, res) => {
    const {text_inputs} = req.body;
    const prompt = `${data}\nHuman: ${text_inputs}\nAI:`
    const t = await axios.post(endpoint, {
        text_inputs: prompt,
        temperature: 0.9,
        top_p: 0.95,
        repetition_penalty: 0.8,
        do_sample: true,
        top_k: 50,
        length: 50
    });
    const answer = processingResponse(t.data[0].substr(prompt.length));
    console.log(answer);
    res.send({text:answer});
});

app.listen(app.get('port'), () => {
    console.log(`app listening on port ${app.get('port')}`);
});