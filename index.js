const express = require('express');
const roblox = require('noblox.js');
const app = express();

app.use(express.json());

const COOKIE = process.env.COOKIE;
const GROUP_ID = 17304743;

roblox.setCookie(COOKIE);

app.post('/rank', async (req, res) => {
    try {
        const { target, rank } = req.body;
        await roblox.setRank(GROUP_ID, target, rank);
        res.status(200).send("Ranked successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed");
    }
});

app.listen(3000, () => {
    console.log("Ranking proxy is running");
});
