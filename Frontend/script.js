const guides = [
{
    id: 1,
    name: "Rahul Sharma",
    location: "Kolkata",
    language: "Hindi, English, Bengali",
    price: "₹4000",
    rating: "4.5",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
},
{
    id: 2,
    name: "Nilesh Kumar",
    location: "Mumbai",
    language: "Hindi, English, Maithili",
    price: "₹3200",
    rating: "4.5",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
},
{
    id: 3,
    name: "Suman Das",
    location: "Mumbai",
    language: "Hindi, English, Marathi",
    price: "₹2500",
    rating: "4.5",
    image: "https://randomuser.me/api/portraits/men/55.jpg"
},

{
    id: 4,
    name: "Nilesh Kumar",
    location: "Mumbai",
    language: "Hindi, English, Maithili",
    price: "₹3300",
    rating: "4.1",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
},

{
    id: 5,
    name: "Adrishya Sharma",
    location: "Gaya",
    language: "Hindi, English, maithali , Bhaojpuri",
    price: "₹1500",
    rating: "4.2",
    image: "https://randomuser.me/api/portraits/women/11.jpg"
},

{
    id: 6,
    name: "Abhishek kumar ",
    location: "Bhubhneshwar",
    language: "Hindi, English, oriya",
    price: "₹2400",
    rating: "4.4",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
},

{
    id: 7,
    name: "Swarna Roy",
    location: "Kashi",
    language: "Hindi, English, bhaojpuri",
    price: "₹1500",
    rating: "3.5",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
},


{
    id: 8,
    name: "Shudhanshu Gupta",
    location: "Kashmir",
    language: "Hindi, English, urdu",
    price: "₹3600",
    rating: "4.5",
    image: "https://randomuser.me/api/portraits/men/85.jpg"

},

{
    id: 9,
    name: "Swarnima Roy",
    location: "Kanpur",
    language: "Hindi, English, bhojpuri",
    price: "₹2500",
    rating: "3.5",
    image: "https://randomuser.me/api/portraits/women/26.jpg"
},

{
    id: 10,
    name: "Shalini Swarna Roy",
    location: "Kathmandu",
    language: "Hindi, English,maithali",
    price: "₹1500",
    rating: "3.5",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
},

{
    id: 11,
    name: "Prasonjit Roy",
    location: "Patna",
    language: "Hindi, English,maithali",
    price: "₹3500",
    rating: "4.5",
    image: "https://randomuser.me/api/portraits/men/01.jpg"
},

{
    id: 12,
    name: "Chandan karmakar",
    location: "Vishakahpatnam",
    language: "Hindi, English,Bengali",
    price: "₹5000",
    rating: "3.9",
    image: "https://randomuser.me/api/portraits/women/02.jpg"
},


];

const container =
document.getElementById("guideContainer");

// Only run on guides.html
if(container){

    guides.forEach(guide => {

        container.innerHTML += `
        <div class="col-md-4">
            <div class="card guide-card">
                <img src="${guide.image}" class="card-img-top">

                <div class="card-body text-center">
                    <h5>
                    ${guide.name}

                    ${guide.id <= 5 ?
                    '<span style="color:green;font-size:14px;"> ✔ Verified</span>'
                    : ''}

                    </h5>
                    <p>📍 ${guide.location}</p>
                    <p>🗣 ${guide.language}</p>
                    <p>💰 ${guide.price}</p>
                    <p>⭐ ${guide.rating}</p>

                    <a href="profile.html?id=${guide.id}"
                    class="btn btn-view mb-2">
                        View Profile
                    </a>

                    <button class="btn btn-success"
                    onclick="checkLoginAndBook('${guide.name}')">
                      Book Now
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

// REGISTER


async function registerUser(){

    const name =
    document.getElementById(
    "name"
    ).value.trim();

    const email =
    document.getElementById(
    "email"
    ).value.trim();

    const mobile =
    document.getElementById(
    "mobile"
    ).value.trim();

    const password =
    document.getElementById(
    "password"
    ).value.trim();

    const aadhaar =
    document.getElementById(
    "aadhaar"
    ).value.trim();
    const role =
        document.getElementById(
        "role"
        ).value;


    // email validation
    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){

        alert(
        "Please enter valid email"
        );

        return;
    }


    // mobile validation
    const mobileRegex =
    /^[0-9]{10}$/;

    if(!mobileRegex.test(mobile)){

        alert(
        "Mobile number must be 10 digits"
        );

        return;
    }


    // aadhaar validation
    const aadhaarRegex =
    /^[0-9]{12}$/;

    if(!aadhaarRegex.test(aadhaar)){

        alert(
        "Aadhaar must be 12 digits"
        );

        return;
    }


            const data = {
                name,
                email,
                mobile: mobile.trim(),
                password,
                aadhaar,   // add this line
                role,
                location: "India"
            };

try{

    const res =
    await fetch(
    "https://guide-finder-platform.onrender.com/register",{

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(data)
    });

    const result =
    await res.json();

    alert(result.message);

}catch(error){

    console.log(error);

    alert("Server Error");
}
}


async function loginUser(){

    const loginInput =
    document.getElementById(
    "loginInput"
    ).value.trim();

    const password =
    document.getElementById(
    "loginPassword"
    ).value.trim();

    const data = {
        loginInput,
        password
    };

    try{

        const res =
            await fetch(
            "https://guide-finder-platform.onrender.com/login",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(data)
        });

        const result =
        await res.json();

        if(result.success){

                localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    name: result.user.name,
                    email: result.user.email,
                    mobile: result.user.mobile,
                    aadhaar: result.user.aadhaar
                })
                );

            alert(
            "Login Successful"
            );

            const redirectPage =
            localStorage.getItem(
            "redirectAfterLogin"
            );

            if(redirectPage){

                localStorage.removeItem(
                "redirectAfterLogin"
                );

                window.location.href =
                redirectPage;

                }else{

                    window.location.href =
                    "index.html";
                }

        }else{

            alert(result.message);
        }

    }catch(error){

        alert(
        "Server Error"
        );
    }
}
/*function checkLoginAndBook(guideName){

    const loggedInUser =
    localStorage.getItem("loggedInUser");

    if(!loggedInUser){

        alert("⚠ Please login first");
        return;
    }

    bookGuide(guideName);
}*/

function openBooking(){

    if(!checkLogin()){
        return;
    }

    window.location.href =
    "guides.html";
}
/*function showRegister(){

    document.getElementById(
    "loginBox"
    ).style.display = "none";

    document.getElementById(
    "registerBox"
    ).style.display = "block";

    // scroll to login/register section
    window.location.href =
    "index.html#login-section";
}


function showLogin(){

    document.getElementById(
    "registerBox"
    ).style.display = "none";

    document.getElementById(
    "loginBox"
    ).style.display = "block";

    // scroll to login section
    window.location.href =
    "index.html#login-section";
}*/
function checkLoginAndBook(guideName){

    const loggedInUser =
    localStorage.getItem("loggedInUser");

    // If user not logged in
    if(!loggedInUser){

        alert("Please Login First");

        // Save current page
         localStorage.setItem(
            "redirectAfterLogin",
             "guides.html"
        );

                // Go to home page
                window.location.href =
                "index.html#login-section";

        return;
    }

    // If logged in
    bookGuide(guideName);
}
function showRegister(){

    document.getElementById(
    "loginBox"
    ).style.display = "none";

    document.getElementById(
    "registerBox"
    ).style.display = "block";

    document.getElementById(
    "login-section"
    ).scrollIntoView({
        behavior:"smooth"
    });
}

function showLogin(){

    document.getElementById(
    "registerBox"
    ).style.display = "none";

    document.getElementById(
    "loginBox"
    ).style.display = "block";

    document.getElementById(
    "login-section"
    ).scrollIntoView({
        behavior:"smooth"
    });
}

function openProfile(){

    const loggedInUser =
    localStorage.getItem("loggedInUser");

    // if not logged in
    if(!loggedInUser){

        alert("Please Login First");

        // save action
        localStorage.setItem(
            "openLoginSection",
            "true"
        );

        // go homepage
        window.location.href =
        "index.html";

        return;
    }

    // if logged in
    window.location.href =
    "userProfile.html";
}

window.onload = function(){

    const shouldOpenLogin =
    localStorage.getItem(
    "openLoginSection"
    );

    if(shouldOpenLogin === "true"){

        localStorage.removeItem(
        "openLoginSection"
        );

        document.getElementById(
        "login-section"
        ).scrollIntoView({
            behavior:"smooth"
        });
    }
}
let visibleReviews = 3;


async function submitFeedback(){

function submitFeedback(){

    const name =
    document.getElementById(
    "feedbackName"
    ).value.trim();

    const feedback =
    document.getElementById(
    "feedbackText"
    ).value.trim();

    const rating =
    parseInt(
    document.getElementById(
    "feedbackRating"
    ).value
    );

    if(!name || !feedback){

        alert(
        "Please fill all fields"
        );
        return;
    }


    try{

        const res =
        await fetch(

        "https://guide-finder-platform.onrender.com/feedback",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify({

                name,
                feedback,
                rating

            })

        });

        const data =
        await res.json();

        alert(
        data.message
        );

        loadReviews();

    }

    catch(error){

        console.log(error);

        alert(
        "Server Error"
        );

    }
}

async function loadReviews(){

    try{

        const res =
        await fetch(

        "https://guide-finder-platform.onrender.com/feedback"

        );

        const reviews =
        await res.json();

        const container =
        document.getElementById(
        "reviewContainer"
        );

        container.innerHTML = "";

        reviews.forEach(review=>{

            container.innerHTML += `

            <div class="col-md-4">

                <div class="review-card">

                <p>
                "${review.feedback}"
                </p>

                <h6>

                ⭐ ${review.rating}
                - ${review.name}

                </h6>

                </div>

            </div>

            `;
        });

    }

    catch(error){

        console.log(error);

    }
}

function loadReviews(){

    const container =
    document.getElementById(
    "reviewContainer"
    );

=======
    const reviews =
    JSON.parse(
    localStorage.getItem(
    "reviews"
    )) || [];

    reviews.push({
        name,
        feedback,
        rating:
        parseInt(rating)
    });

    // highest rating first
    reviews.sort(
    (a,b)=>
    b.rating-a.rating
    );

    localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
    );

    loadReviews();

    alert(
    "Thank you for your feedback ❤️"
    );

    document.getElementById(
    "feedbackName"
    ).value = "";

    document.getElementById(
    "feedbackText"
    ).value = "";

    document.getElementById(
    "feedbackRating"
    ).selectedIndex = 0;
}

function loadReviews(){

    const container =
    document.getElementById(
    "reviewContainer"
    );

>>>>>>> backup-guidefinder
    if(!container) return;

    const reviews =
    JSON.parse(
    localStorage.getItem(
    "reviews"
    )) || [];

    container.innerHTML = "";

    reviews
    .slice(0, visibleReviews)
    .forEach(review => {

        container.innerHTML += `
        <div class="col-md-4">
            <div class="review-card">
                <p>"${review.feedback}"</p>
                <h6>
                ⭐ ${review.rating}
                - ${review.name}
                </h6>
            </div>
        </div>
        `;
    });
}

function showMoreReviews(){

    visibleReviews += 3;

    loadReviews();
}

window.addEventListener(
"load",
loadReviews
);

window.onload = function(){

    loadReviews();

async function guideLogin(){

    const loginInput =
    document.getElementById(
    "loginInput"
    ).value.trim();

    const password =
    document.getElementById(
    "loginPassword"
    ).value.trim();

    if(!loginInput || !password){

        alert(
        "Enter Email & Password"
        );

        return;
    }

    const data = {
        loginInput,
        password
    };

    try{

        const res =
        await fetch(
        "https://guide-finder-platform.onrender.com/login",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(data)
        });

        const result =
        await res.json();

        console.log(result);

        if(result.success){

            // Check guide account
            if(
            result.user.role !==
            "Guide"
            ){

                alert(
                "This is not a Guide account"
                );

                return;
            }

            // Save guide
            localStorage.setItem(

                "loggedInGuide",

                JSON.stringify(
                result.user
                )
            );

            alert(
            "Guide Login Successful"
            );

            window.location.href =
            "guideDashboard.html";

        }else{

            alert(result.message);
        }

    }catch(error){

        console.log(error);

        alert(
        "Server Error"
        );
    }
}

// LANGUAGE FILTER

const languageFilter =
document.getElementById(
"languageFilter"
);

if(languageFilter){

languageFilter.addEventListener(
"change",
function(){

const selectedLanguage =
this.value;

const container =
document.getElementById(
"guideContainer"
);

container.innerHTML = "";

let filteredGuides =
guides;

if(selectedLanguage){

filteredGuides =
guides.filter(guide =>

guide.language
.toLowerCase()
.includes(
selectedLanguage.toLowerCase()
)

);

}

filteredGuides.forEach(guide => {

container.innerHTML += `
<div class="col-md-4">
<div class="card guide-card">

<img src="${guide.image}"
class="card-img-top">

<div class="card-body text-center">

    <h5>
        ${guide.name}

        ${guide.id <= 5 ?
        '<span style="color:green;font-size:14px;"> ✔ Verified</span>'
        : ''}

        </h5>

<p>📍 ${guide.location}</p>

<p>🗣 ${guide.language}</p>

<p>💰 ${guide.price}</p>

<p>⭐ ${guide.rating}</p>

<a href="profile.html?id=${guide.id}"
class="btn btn-view mb-2">
View Profile
</a>

<button
class="btn btn-success"
onclick="checkLoginAndBook('${guide.name}')">
Book Now
</button>

</div>
</div>
</div>
`;

});

});
}

const searchGuide =
document.getElementById(
"searchGuide"
);

if(searchGuide){

searchGuide.addEventListener(
"keyup",
function(){

const searchText =
this.value.toLowerCase();

const container =
document.getElementById(
"guideContainer"
);

container.innerHTML = "";

const filteredGuides =
guides.filter(guide =>

guide.name
.toLowerCase()
.includes(searchText)

||

guide.location
.toLowerCase()
.includes(searchText)

||

guide.language
.toLowerCase()
.includes(searchText)

);

filteredGuides.forEach(guide => {

container.innerHTML += `
<div class="col-md-4">
<div class="card guide-card">

<img src="${guide.image}"
class="card-img-top">

<div class="card-body text-center">

<h5>${guide.name}</h5>

<p>📍 ${guide.location}</p>
<p>🗣 ${guide.language}</p>
<p>💰 ${guide.price}</p>
<p>⭐ ${guide.rating}</p>

<a href="profile.html?id=${guide.id}"
class="btn btn-view mb-2">
View Profile
</a>

<button
class="btn btn-success"
onclick="checkLoginAndBook('${guide.name}')">
Book Now
</button>

</div>
</div>
</div>
`;

});

});
>>>>>>> backup-guidefinder
}