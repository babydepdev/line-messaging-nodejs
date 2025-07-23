const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const LINE_ACCESS_TOKEN = "CVKfNir++2vEqpSV6HZ3WWD43ynwLZnXoNCViP+PaF9CZLQuIFAc6zKJ/9WsQdBbE3FpVfnfbdz5eaC4fcMT19l2K0pQILmNZDncuplq3iymKatZEtfY4L+BspQKii1vjVFUtfZrLXG+fYmf38Wo7gdB04t89/1O/w1cDnyilFU=";
const LINE_API_URL = "https://api.line.me/v2/bot/";
const LINE_USER_ID = "U8690a52de0b605781c0fe412f6258f36";
const LINE_GROUP_ID = "C6a5cc05870c1759d42b0ac553054c224";

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    try {
        const msg = req.body.msg;

        if (!msg) {
            res.status(400).send('msg is required');
            return;
        }

        const data = await fetch(`${LINE_API_URL}/message/push`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: LINE_GROUP_ID, // LINE Group ID or LINE User ID
                messages: [{
                    type: 'text',
                    text: msg
                }]
            })
        })
        console.log(data);
        res.status(200).send({
            status: 200,
            message: 'success'
        });
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }

});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});