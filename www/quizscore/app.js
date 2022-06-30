function initializeLiff() {
    liff.init({
        liffId: "1657043590-BOEgp5Yl"
    }).then((e) => {
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            getUserid();
        }
    }).catch((err) => {
        console.log(err);
    });
}

var url = 'https://rti2dss.com/p3200';
// var url = 'https://c02a-202-28-250-87.ngrok.io';

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

const checkIn = () => {
    const usrid = document.getElementById("usrid").value
    const studentid = document.getElementById("studentid").value
    const username = document.getElementById("username").value
    // console.log(usrid, studentid, username);
    var id = '1Z0EskTZ7FtyQnOPyhyIfbx6VAh6uSjqIDRSKyan8ZPM';
    var gid = '0';
    var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;
    fetch(url)
        .then(response => response.text())
        .then(data => console.log(JSON.parse(data.slice(47, -2))));
}

checkIn()

const checkname = document.getElementById('checkname');
const register = document.getElementById('register');
register.style.display = 'none';
checkname.style.display = 'none';

const getUser = async (usrid) => {
    axios.post(url + '/api/getuser', { usrid }).then(async (r) => {
        if (r.data.data.length) {
            // console.log(r.data.data[0]);
            checkname.style.display = 'block';
            document.getElementById('usernametxt').innerHTML = r.data.data[0].username;
            document.getElementById("username").value = r.data.data[0].username;
            document.getElementById("studentid").value = r.data.data[0].studentid;
            // await liff.closeWindow()
        } else {
            register.style.display = 'block';
        }
    })
}

const getUserid = async () => {
    const profile = await liff.getProfile();
    document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    // document.getElementById("email").value = await liff.getDecodedIDToken().email;
    // console.log(profile);
    getUser(await profile.userId)
}
// initializeLiff()

