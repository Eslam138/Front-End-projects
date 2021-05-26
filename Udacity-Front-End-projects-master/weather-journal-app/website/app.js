/* Global Variables */
const url='https://api.openweathermap.org/data/2.5/weather?zip=';
const key="843f217c16cf295a5ca373c6b1dfaf28";
//helper functions
const temperature=async (URL,code,key)=>{
    
    try {
        const response=await fetch(URL+code+'&APPID='+key);
        console.log('response',response);
        const data= (response!=null)?response.json():{
            "main":[
                {
                    temp:null,
                }
            ]
        };
        console.log(data,"data");
        return data;
    }
    catch(error){
        console.log('temperature error',error);
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', ()=>{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log("date",newDate);
    temperature(url, zip, key)
    .then((data)=>{
        const temp=(data.main!=null)?data.main.temp:'no temp';
        postData('/add', {temperature: temp, date: newDate, user_response: feelings })
        .then(()=>{
            update();
        });
    });
});
//Post
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest;
        console.log('postDaata',newData);
        return newData;
    }
    catch (error) {
        console.log('Post Data Error', error);
    }
}

const update = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.user_response;
    }
    catch (error) {
        console.log('update Errors',error);
    }
}