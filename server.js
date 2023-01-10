// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run  Local Server and routes
const express=require('express');
//Run Express using instance app
const app=express();
//Require bodyParser
const bodyParser=require('body-parser');
//Require cors
const corsAllow=require('cors')



// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//body-parser is used to let the outing of server in JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//corsAllow require cors and used for connection between local server and browser 
app.use(corsAllow());

// Initialize the main project folder
//The Express app instance pointes to the project folder "website"
app.use(express.static('website'));


// Setup Server
const portNum=3000;


const myServer=app.listen(portNum, ()=>{
    console.log(`Server is running on localhost ${portNum}`)
}
);



//Posting data to server
app.post('/addData',(request,response)=>{
    projectData=request.body;
    response.send(projectData);
    console.log(projectData)
})

//Getting data from server
app.get('/getData',(request,response)=>{
    response.send(projectData)

})
