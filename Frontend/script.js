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

const container = document.getElementById("guideContainer");

guides.forEach(guide => {
    container.innerHTML += `
    <div class="col-md-4">
        <div class="card guide-card">
            <img src="${guide.image}" class="card-img-top">
            <div class="card-body text-center">
                <h5>${guide.name}</h5>
                <p>📍 ${guide.location}</p>
                <p>🗣 ${guide.language}</p>
                <p>💰 ${guide.price}</p>
                <p>⭐ ${guide.rating}</p>
                <a href="profile.html?id=${guide.id}" class="btn btn-view">View Profile</a>
            </div>
        </div>
    </div>
    `;
});