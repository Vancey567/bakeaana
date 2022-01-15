async function getWorkshopData() {
    const api_url = `http://localhost:3000/workshop`;
    const response = await fetch(api_url);
    const workshops = await response.json();
    display(workshops);
    console.log(workshops);
}

window.onload = getWorkshopData;

display = (workshops) => {
    let workshopString = "";
    workshops.workshops.map((workshop, index) => {      
        workshopString += `
                <div class="col-md">
                    <div class="card" style="width: 18rem;">
                        <img src="./img/${index}.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${workshop.title}</h5>
                            <p class="card-text">${workshop.description}</p>
                            <span>
                                <button onclick="knowMore()" href="#" class="btn btn-sm me-2">Know More</button>
                                <button onclick="applyNow('${workshop._id}')" class="btn btn-sm">Apply now</button>
                            </span> 
                        </div>
                    </div>
                </div>
        `;
    })
    document.getElementById("cards-area").innerHTML = workshopString;
}

const registerUser = async () => {
    console.log('register');
    
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
        console.log(err);
    })
    console.log('register called');
}

const loginUser = () => {
    console.log('login ');

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
        // document.getElementById('registerForm').reset();
        console.log(user);
        
        localStorage.setItem('token', user.token);
        localStorage.setItem('user_id', user.user._id);
        window.location.href = '/Bakery%20workshop/index.html?';
        // window.location.href = `/Bakery%20workshop/index.html?token="${user.token}"`;
        toast("Your are registered");
    }).catch((err) => {
        console.log(err);
    })
    console.log('login called');
}

const getAttendese = async (req, res) => {
    console.log('hey');
    
    const api_url = 'http://localhost:3000/attendees';
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const attendeesResponse = await fetch(api_url, options);
    const attendees = await attendeesResponse.json();
    
    let attendeeString = "";

    attendees.attendees.map((attendee) => {
        attendeeString += `
            <tr>
                <th scope="row">${attendee.user._id}</th>
                <td>${attendee.workshop._id}</td>
                <td>${attendee.user.name}</td>
                <td>${attendee.workshop.name}</td>
                <td>${attendee.user.gender}</td>
                <td>${attendee.user.phone}</td>
                <td>${attendee.user.address}</td>
            </tr>
        `;
    })
    
    document.getElementById('attendee-area').innerHTML = attendeeString;
}

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
    });
    
}

toast = (message) => {
    document.getElementById('toast').style.display = "block";
    document.getElementById('message').innerText = message;

    // Hide toast after 5 seconds
    setTimeout(() => {
        document.getElementById('toast').style.display = "none";
    }, 5000)
}