async function guideLogin(){

    const loginInput =
    document.getElementById(
    "guideEmail"
    ).value.trim();

    const password =
    document.getElementById(
    "guidePassword"
    ).value.trim();

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
            JSON.stringify({

                loginInput,
                password
            })
        });

        const result =
        await res.json();

        console.log(result);

        if(result.success){

            // Check role
            if(
            result.user.role !==
            "Guide"
            ){

                alert(
                "This account is not Guide"
                );

                return;
            }

            localStorage.setItem(
            "loggedInGuide",

            JSON.stringify(
            result.user
            ));

            alert(
            "Guide Login Success"
            );

            window.location.href =
            "guideDashboard.html";

        }else{

            alert(
            result.message
            );
        }

    }catch(error){

        console.log(error);

        alert(
        "Server Error"
        );
    }
}

async function registerGuide(){

const name =
document.getElementById(
"guideName"
).value.trim();

const email =
document.getElementById(
"guideEmail"
).value.trim();

const mobile =
document.getElementById(
"guideMobile"
).value.trim();

const password =
document.getElementById(
"guidePassword"
).value.trim();

const location =
document.getElementById(
"guideLocation"
).value.trim();

const languages =
document.getElementById(
"guideLanguages"
).value.split(",");

const price =
document.getElementById(
"price"
).value;

const experience =
document.getElementById(
"experience"
).value;

const bio =
document.getElementById(
"bio"
).value;

const photo =
document.getElementById(
"photo"
).value;

try{

const res =
await fetch(
"https://guide-finder-platform.onrender.com/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
email,
mobile,
password,

location,
languages,

price,
experience,
bio,
photo,

role:"Guide"

})

});

const result =
await res.json();

alert(result.message);

}
catch(error){

console.log(error);

alert("Server Error");

}
}