const EventEmitter = require("events");

class Sales extends EventEmitter {
    constructor() {
        super(); // to inherite all the methods of super class
    }
} 

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There was a new sale!");
})

myEmitter.on("newSale", () => {
    console.log("Costomer name: Navani");
})

myEmitter.on("newSale", stock => {
    console.log(`There is ${stock} items left!` )
})

myEmitter.emit("newSale", 9)