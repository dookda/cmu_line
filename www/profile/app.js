function initializeLiff() {
    liff.init({
        liffId: "1657043590-ZbnN3v9J"
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
// var url = 'https://rti2dss.com/p3510';
var url = 'https://1c33-2405-9800-b500-992b-c8b5-ce82-64f8-bad2.ngrok.io'

let getData = (usrid) => {
    axios.post(url + "/api/getuser", { usrid }).then((r) => {
        // console.log(r);
        if (r.data.data.length > 0) {
            document.getElementById("username").value = r.data.data[0].username;
            document.getElementById("studentid").value = r.data.data[0].studentid;
        }
    })
}
let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})
let updateUser = () => {
    let obj = {
        usrid: document.getElementById("usrid").value,
        data: {
            username: document.getElementById("username").value,
            studentid: document.getElementById("studentid").value,
            displayname: document.getElementById("displayName").value
        }
    }
    console.log(obj);
    axios.post(url + "/api/updateuser", obj).then((r) => {
        // console.log(r);
        modal.show();
        getData(usrid)
        setTimeout(() => {
            modal.hide();
        }, 2000);
    })
}

let gotoOwnerPost = () => {
    location.href = "./../report_owner/index.html";
}

async function getUserid() {
    const profile = await liff.getProfile();
    document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    // document.getElementById("email").value = await liff.getDecodedIDToken().email;
    // console.log(profile);
    getData(await profile.userId)
}
initializeLiff()