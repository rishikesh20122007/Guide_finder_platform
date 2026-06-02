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
        "index.html#login-section";

        return false;
    }

    return true;
}


// BOOKING FUNCTION
async function confirmBooking(){
    console.log("Booking Function Running");

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

    // API URL
    const API_URL =
    window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://guide-finder-platform.onrender.com";

    // Get logged in user
    const loggedUser =
    JSON.parse(
    localStorage.getItem(
    "loggedInUser"
    ));

    // Send booking request
    const response =
    await fetch(
    `${API_URL}/book-guide`,{

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            touristName,

            touristMobile:
            loggedUser.mobile,

            guideName,

            date,

            time
        })

    });


        const result =
        await response.json();
        console.log(response.status);
        console.log(response.ok);
        console.log(result);

        console.log(result);

        alert(result.message);

        if(true){

            // Create booking object
            const bookingData = {

                touristName:
                touristName,

                touristMobile:
                loggedUser.mobile,

                guideName:
                guideName,

                date:
                date,

                time:
                time
            };

            // Get old bookings
            let bookings =
            JSON.parse(
            localStorage.getItem("myBookings")
            ) || [];

            // Add new booking
            bookings.push(bookingData);

            // Save to localStorage
            localStorage.setItem(
                "myBookings",
                JSON.stringify(bookings)
            );

            console.log("Saved Successfully");
            console.log(
            localStorage.getItem("myBookings")
            );

            alert("Booking Successful");
        }

    }

    catch(error){

        console.log(error);
        alert("Server Error");
    }
}