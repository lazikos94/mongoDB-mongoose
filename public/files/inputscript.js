let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let age= document.getElementById('age');
let ufirstname = document.getElementById('ufirstname');
let ulastname = document.getElementById('ulastname');
let uage= document.getElementById('uage');
let id= document.getElementById('id');
let d_id= document.getElementById('delete_id');
try{
    document.getElementById('submit').addEventListener('click', async ()=>{
        const data = {
            'first_name': firstname.value,
            'last_name': lastname.value,
            'age': age.value,
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

try{
    document.getElementById('empty').addEventListener('click', async ()=>{
        const response = await fetch('/mongoempty');
        const json = await response.json();
        console.log(json);
    });
}
catch(error){
    console.log(error);
}

async function mongodb(){
    try{
        const response = await fetch('/mongodb');
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log("failed to fetch cause empty db",error)
    }
}

try{
    document.getElementById('show').addEventListener('click', async ()=>{
        const response = await fetch('/mongoget');
        const json = await response.json();
        json.forEach((item)=>{
            $("div.database").append(
                `<div class='db_content'>
                    <p id='data'> _id: ${item._id}</p>
                    <p id='data'> First Name: ${item.first_name}</p>
                    <p id='data'> Last Name: ${item.last_name}</p>
                    <p id='data'> Age: ${item.age}</p>
                </div>`
            );
        })       
        console.log(json);
    });
}
catch(error){
    console.log(error);
}
try{
    document.getElementById('update_info').addEventListener('click', async ()=>{
        const data = {
            'first_name': ufirstname.value,
            'last_name': ulastname.value,
            'age': uage.value,
            '_id': id.value,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongoupdate', options);
        const json = await response.json();
        console.log(json);
    });
}
catch(error){
    console.log(error);
}
try{
    document.getElementById('delete_entry').addEventListener('click', async ()=>{
        const data = {
            '_id': d_id.value,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongodelete', options);
        const json = await response.json();
        console.log(json);
    });
}
catch(error){
    console.log(error);
}