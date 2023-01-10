

/* Global Variables */
let generateBtn=document.getElementById("generate");

// '
const apiKey="661cc93a9f03b583725e408d9a89ec84&units=imperial"



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1) +'.'+ d.getFullYear();
console.log(newDate)


const gettingFromAPI=async(URL)=>{
    const apiLink=URL+apiKey;
    const responsedData=await fetch(apiLink);
    
    try{
        const dataResponse=await responsedData.json();
        return dataResponse;


    }catch(error){
        console.log(error)
    }

}

//Function for sending data to local Server
const sendDataToServer = async(urlPost,objectData)=>{
    const respo=await fetch(urlPost, {
     
        // Adding method type
        method: "POST",
        credentials:"same-origin",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(objectData)
    } );
    try{
        const WholeData= await respo.json();
        console.log( WholeData)


    }catch(error){
        console.log(error)

    }
}
//Function for getting data from local Server
const retrieveData = async () =>{
    const request = await fetch('/getData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temprature)+ ' degrees';
    document.getElementById('content').innerHTML = allData.feels;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }



//Clicking on generate button
generateBtn.addEventListener("click",()=>{
    let codeZip=document.querySelector("#zip").value;
    let feelingWHT=document.querySelector("#feelings").value;
    const baseURLApi=`https://api.openweathermap.org/data/2.5/weather?zip=${codeZip}&appid=`;
    const fetchApi=gettingFromAPI(baseURLApi);
    fetchApi.then(data=>{
        console.log(data);
        let tempt=data["main"]["temp"];
        console.log(tempt);
        let allData={
            date:newDate,
            temprature:tempt,
            feels:feelingWHT
        }
        sendDataToServer('/addData',allData);
    }).then(retrieveData);
    
   

})



