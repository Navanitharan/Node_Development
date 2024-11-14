const fs = require('fs')
const http = require('http');
const path = require('path');
const url = require('url')

// const hello = "Hello World";
// console.log(hello);

// //Reading File
// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
// console.log(textIn);

// //Writing File
// const textOut = `This is what we know about avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

const replaceTemplete = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PLACE%}/g,product.productName)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{
    console.log(req.url)
    

    const {query, pathname} = url.parse(req.url, true);

    //Overview
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {"Content-type" : 'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplete(tempCard,el)).join('');
        const output = tempOverview.replace(/{%Product_cards%}/g,cardHtml);

        res.end(output);
    }

    //Product
    else if(pathname === "/product"){
        res.writeHead(200, {"Content-type" : 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplete(tempProduct,product)
        res.end(output);

    }

    //Not found
    else{
        res.writeHead(404, {
            'Content-type' :"text/html",
            'my-own-header': 'hello world'
        });
        res.end("<h1>Page not found</h1>");
    }
    
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to request on port 8000')
})