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
const container = document.getElementById("guideContainer");

guides.forEach(guide => {

    container.innerHTML += `
    <div class="col-md-4">
        <div class="card guide-card">

            <img src="${guide.photo}" class="card-img-top">

            <div class="card-body text-center">

                <h5>${guide.name}</h5>

                <p>📍 ${guide.location}</p>

                <p>🗣 ${guide.languages}</p>

                <p>💰 ${guide.price}</p>

                <p>⭐ ${guide.rating}</p>

                <button class="btn btn-success"
                onclick="bookGuide('${guide.name}')">
                    Book Now
                </button>

            </div>
        </div>
    </div>
    `;
});

async function confirmBooking() {

    const touristName =
    document.getElementById("userName").value;

    const guideName =
    selectedGuide;

    const date =
    document.getElementById("date").value;

    const time =
    document.getElementById("time").value;

    const response = await fetch(
        "http://localhost:5000/book-guide",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                touristName,
                guideName,
                date,
                time

            })

        }
    );

    const result = await response.json();

    alert(result.message);

}