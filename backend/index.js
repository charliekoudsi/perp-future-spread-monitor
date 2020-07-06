const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/funding", async function(req, res) {
    
    try {
        const {asset} = req.query;
        const result = await axios.get(`https://ftx.com/api/futures/${asset}-PERP/stats`);
        const rate = result.data.result.nextFundingRate;
        res.json({
            success: true,
            rate
        })
    } catch(err) {
        res.json({
            success: false,
            error: "Invalid/no argument for 'asset'"
        })
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });