let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let address= document.getElementById('address');
let country = document.getElementById('country');
let date = document.getElementById('date');
mongodb();
try{
    document.getElementById('submit').addEventListener('click', async ()=>{
        const data = {
            'first_name': firstname.value,
            'last_name': lastname.value,
            'address': address.value,
            'country': country.value,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongodb', options);
        const json = await response.json();
        console.log(json);
    });
}
catch(error){
    console.log(error);
}

async function mongodb(){
    const response = await fetch('/mongodb');
    const data = await response.json();
    console.log(data);
}