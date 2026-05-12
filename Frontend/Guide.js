const guides = [

{
id:1,
name:"Rahul Sharma",
location:"Kolkata",
languages:"Hindi, English",
price:"$40 / tour",
rating:"4.8",
description:"Experienced city guide helping tourists explore Kolkata.",
photo:"https://randomuser.me/api/portraits/men/32.jpg"
},

{
id:2,
name:"Anita Roy",
location:"Delhi",
languages:"English, Bengali",
price:"$35 / tour",
rating:"4.7",
description:"Friendly guide specializing in historical tours.",
photo:"https://randomuser.me/api/portraits/women/45.jpg"
},

{
id:3,
name:"Arjun Patel",
location:"Mumbai",
languages:"Hindi, Gujarati",
price:"$50 / tour",
rating:"4.9",
description:"Food and culture expert guide.",
photo:"https://randomuser.me/api/portraits/men/11.jpg"
}

];

// CHECK LOGIN BEFORE BOOKING
function checkLogin(){

    const user =
    localStorage.getItem("loggedInUser");

    if(!user){

        alert(
          "Please Login First"
        );

        window.location.href =
        "index.html";

        return false;
    }

    return true;
}


// BOOKING FUNCTION
async function confirmBooking(){

    // LOGIN CHECK
    if(!checkLogin()){
        return;
    }

    const touristName =
    document.getElementById("touristName").value;

    const guideName =
    document.getElementById("guideName").value;

    const date =
    document.getElementById("bookingDate").value;

    const time =
    document.getElementById("bookingTime").value;

    if(
        !touristName ||
        !guideName ||
        !date ||
        !time
    ){
        alert("Please fill all fields");
        return;
    }

    try{

        const response =
        await fetch(
        "http://localhost:5000/book-guide",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                touristName,
                guideName,
                date,
                time

            })

        });

        const result =
        await response.json();

        alert(result.message);

        if(result.success){

            document.getElementById(
            "bookingForm"
            ).style.display = "none";
        }

    }

    catch(error){

        console.log(error);
        alert("Server Error");
    }
}