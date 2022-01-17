async function getWorkshopData() {
    const api_url = `http://localhost:3000/workshop`;
    const response = await fetch(api_url);
    const workshops = await response.json();
    display(workshops);
}

window.onload = () => {
    getWorkshopData();

    const logoutBtn = document.getElementById('logoutBtn');
    const registerLog = document.getElementById('registerLog');
    const token = localStorage.getItem('token');
    if (token) {
        logoutBtn.style.display = "block";
        registerLog.style.display = "none";
    } else {
        logoutBtn.style.display = "none";
        registerLog.style.display = "inline-flex";
    }
};

const getworkshopDate = (date) => { 
    const splitDate = date.split("T");
    const dateString = splitDate[0];

    var newString = "";
    for (var i = dateString.length - 1; i >= 0; i--) { 
        newString += dateString[i];
    }
    return newString;
}


display = (workshops) => {
    let workshopString = "";
    workshops.workshops.map((workshop, index) => {    
        const splitDate = workshop.date.split("T");
        const workshopDate = splitDate[0];
        const workshopId = workshop._id;
        
        workshopString += `
            <div class="col-md">
                <div class="card" style="width: 18rem;">
                    <img src="./img/${index}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title font-baloo fs-5">${workshop.title}</h5>
                        <h5 class="marginRight">${workshop.duration} Days</h5>
                        <span class="marginRight largertext">${workshopDate}</span>
                        <span class="mode lightertext largertext ">${workshop.mode}</span>
                        <p class="card-text smalltext">${workshop.description}</p>

                        <span>
                            <button class="btn btn-sm me-2">Know More</button>
                            <button onclick="registerAttendese('${workshopId}')" class="btn btn-sm">Apply now</button>
                        </span>
                    </div>
                </div>
            </div>
        `;
    })
    document.getElementById("cards-area").innerHTML = workshopString;
}

const registerAttendese = (workshopId) => {   
    const loggedInUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const api_url = 'http://localhost:3000/attendees';
    const bodyData = {
        user: loggedInUser,
        workshop: workshopId
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(bodyData)
    }
    fetch(api_url, options)
    .then((response) => {
        response.json();
    }).then((responseData) => {
        toast("You are registered for workshop");
    }).catch((error) => {
        toast("Something went wrong");
        console.log(error);
    })
}

const registerUser = async () => {    
    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    const bodyData = {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        dob: dob,
        address: address,
        password: password,
    }

    const api_url = `http://localhost:3000/register`;
    await fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    }).then((res) => {
        return res.json();
    }).then ((data) => {
        document.getElementById('registerForm').reset();
        toast("Your are registered");
    }).catch((err) => {
        toast("Your are registered");
        console.log(err);
    })
}

const loginUser = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const bodyData = {
        email: email,
        password: password,
    }
    const api_url = `http://localhost:3000/login`;
    fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    }).then((res) => {
        return res.json();
    }).then ((user) => {
        document.getElementById('loginForm').reset();

        localStorage.setItem('token', user.token);
        localStorage.setItem('user_id', user.user._id); // should be _id

        if(user.user.role === 'admin') {
            window.location.href = './attendees.html' || '/Bakery%20workshop/createWorkshop.html?';
        } else {
            window.location.href = './index.html' || '/Bakery%20workshop/index.html?';
        }
        toast("Your are LoggedIn");
    }).catch((err) => {
        toast("Something went wrong while logging");
        console.log(err);
    })
}

// const getAttendese = async () => {    
//     const api_url = 'http://localhost:3000/attendees';
//     const token = localStorage.getItem('token');
//     const options = {
//         method: 'GET',
//         headers: {
//             "Authorization": 'Bearer ' + token
//         }
//     }

//     const attendeesResponse = await fetch(api_url, options);
//     const attendees = await attendeesResponse.json();
//     console.log(attendees);
    
//     let attendeeString = "";

//     attendees.attendees.map((attendee) => {
//         attendeeString += `
//             <tr>
//                 <th scope="row">${attendee.user._id}</th>
//                 <td>${attendee.workshop._id}</td>
//                 <td>${attendee.user.name}</td>
//                 <td>${attendee.workshop.name}</td>
//                 <td>${attendee.user.gender}</td>
//                 <td>${attendee.user.phone}</td>
//                 <td>${attendee.user.address}</td>
//             </tr>
//         `;
//     })
//     document.getElementById('attendee-area').innerHTML = attendeeString;
// }

const knowMore = async (req, res) => {
    console.log("knowmore");
}

const applyNow = async (workshop_id) => {
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    
    const bodyData = {
        user: user_id,
        workshop: workshop_id,
    };

    await fetch("http://localhost:3000/attendees", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        }, 
        body: JSON.stringify(bodyData)
    }).then((response) => {
        res.json();
    }).then((data) => {
        toast("You are registered for workshop");
    }).catch((error) => {
        console.log(error);
        toast("Something went wrong while registering for workshop");
    })
    
}

const createWorkshop = async () => {
    const token = localStorage.getItem('token');

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const mode = document.getElementById("mode").value;
    const date = document.getElementById("date").value;
    const address = document.getElementById("address").value;
    const duration = document.getElementById("duration").value;
    const learnings = document.getElementById("learnings").value;

    const bodyData = {
        title: title,
        description: description,
        mode: mode,
        date: date,
        duration: duration,
        address: address,
        learnings: learnings,
    }

    const api_url = `http://localhost:3000/workshop`;
    await fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token,
        },
        body: JSON.stringify(bodyData)
    }).then((res) => {
        return res.json();
    }).then ((data) => {
        document.getElementById('workshopForm').reset();
        toast("New Workshop Added");
    }).catch((err) => {
        toast("Error Creating Workshop");
        console.log(err);
    })
}

const logout = () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const log = document.getElementsByClassName('log');

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    log.style.display = 'block';
    logoutBtn.style.display = 'none';
}

toast = (message) => {   
    document.getElementById('toast').style.display = "block";
    document.getElementById('message').innerText = message;

    // Hide toast after 5 seconds
    setTimeout(() => {
        document.getElementById('toast').style.display = "none";
    }, 5000)
}