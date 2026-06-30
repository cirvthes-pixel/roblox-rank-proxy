const express = require('express');
const noblox = require('noblox.js');
const app = express();

app.use(express.json());

const COOKIE = process.env.COOKIE;
const GROUP_ID = 17304743;

async function startup() {
    try {
        await noblox.setCookie(COOKIE);
        const currentUser = await noblox.getCurrentUser();
        console.log(`Logged in as ${currentUser.UserName} (${currentUser.UserID})`);
    } catch (err) {
        console.log("Login failed:", err.message);
    }
}

startup();

app.get('/', (req, res) => {
    res.send("Proxy alive");
});

app.post('/rank', async (req, res) => {
    try {
        const { target, rank } = req.body;
        await noblox.setRank(GROUP_ID, target, rank);
        res.status(200).send("Ranked successfully");
    } catch (err) {
        console.log("Rank error:", err.message);
        res.status(500).send("Failed: " + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Ranking proxy is running on port " + PORT);
});
