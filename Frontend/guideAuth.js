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