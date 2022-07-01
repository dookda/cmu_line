function initializeLiff() {
    liff.init({
        liffId: "1657043590-k8L2m41N"
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

// var url = 'https://rti2dss.com/p3200';
var url = 'https://e40b-202-28-250-93.ngrok.io';

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

const quiz = document.getElementById('quiz');
quiz.style.display = 'none';
quiz.style.display = 'block';

// form
const formId1 = '1FAIpQLSeIG5QqRYGdQ_MMYtfRjglSaj19uJw18MU3_X_ptoi0OmCzbg';
const formId2 = '1FAIpQLSe_poWTGoDL9T-ozU9e9KIdImgVHYGW0SQASgTWkYhxsPGiVw';
const formId3 = '1FAIpQLSdy3rVpSl66gQ6jevJXB35drQnfhIqcm88J4t0V0rILd9m4UQ';
const formId4 = '1FAIpQLScsgS4B0Ux0m8zFlHIrOKz9Xxcqk7ei7rIH8L-NNVFOeWT3NQ';
const formId5 = '1FAIpQLSeS5rGzvbTpV53MHFwiVovi0wLCxbmfcOKn_RWaD3fpKJrtwg';



const gotoQuiz = (formId) => {
    const usrid = document.getElementById('usrid').value;
    if (formId == 1) {
        location.href = `https://docs.google.com/forms/d/e/${formId1}/viewform?usp=pp_url&entry.28548348=${usrid}`
    } else if (formId == 2) {
        location.href = `https://docs.google.com/forms/d/e/${formId2}/viewform?usp=pp_url&entry.28548348=${usrid}`
    } else if (formId == 3) {
        location.href = `https://docs.google.com/forms/d/e/${formId3}/viewform?usp=pp_url&entry.28548348=${usrid}`
    } else if (formId == 4) {
        location.href = `https://docs.google.com/forms/d/e/${formId4}/viewform?usp=pp_url&entry.28548348=${usrid}`
    } else if (formId == 5) {
        location.href = `https://docs.google.com/forms/d/e/${formId5}/viewform?usp=pp_url&entry.28548348=${usrid}`
    }

}

const getUser = async (usrid) => {
    axios.post(url + '/api/getuser', { usrid }).then(async (r) => {
        document.getElementById('usernametxt').innerHTML = r.data.data[0].username;
        document.getElementById("username").value = r.data.data[0].username;
        document.getElementById("studentid").value = r.data.data[0].studentid;
        // await liff.closeWindow()
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

initializeLiff()

