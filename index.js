import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const apikey = "ADD YOUR API KEY FROM https://www.alphavantage.co";
const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/submit",async (req,res)=>{
    var symbol = req.body['stocks'];  //Dropdown Value
    try{
    const response = await axios.get(`${url}&symbol=${symbol}&apikey=${apikey}`);
    const stockData = response.data;
    console.log(stockData);
    const globalQuote = stockData['Global Quote'];
    var Stocksymbol = globalQuote['01. symbol'];
    var stockPrice = globalQuote['05. price'];
    var priceChange = globalQuote['09. change'];
    res.render("index.ejs",{symbol: Stocksymbol, price : stockPrice, change:priceChange}); 
    }
    catch{
        console.error("Failed to make request");
        res.render("index.ejs");    
    }
});

app.listen(port, (req,res)=>{
    console.log(`Running on port ${port}`);
});