// in single thread 
// first initialize the program
// execute the toplevel code
// require module
// callback function 
// event loop

// event loop start -------------------
//expired timer callback              yes/no ---- exit
//I/O pooling and callback              |
//setImmediate callback                 |
//close callback -- isthere any pending--
const fs = require('fs');
const crypto = require('crypto');

const start =Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(()=>{console.log("Timer 1 finished")},0)
setImmediate(()=>{console.log("immediate 1 fineshed ")})

fs.readFile('test-file.txt',()=>{
    console.log("I/O fineshed")

    console.log("----------------")

    setTimeout(()=>{console.log('timer 2 function')},0)
    setTimeout(()=>{console.log('timer 3 function')},3000)
    setImmediate(()=>{console.log("immediate 2 funtion")})

    process.nextTick(()=>{console.log("Process.nextTick")});

    crypto.pbkdf2("password", "salt" , 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start,"Password encrypted")
    })
    crypto.pbkdf2("password", "salt" , 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start,"Password encrypted")
    })
    crypto.pbkdf2("password", "salt" , 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start,"Password encrypted")
    })
    crypto.pbkdf2("password", "salt" , 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start,"Password encrypted")
    })
})

console.log("Hello from top level code");