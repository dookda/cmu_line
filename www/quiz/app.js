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

// const quiz = document.getElementById('quiz');
// quiz.style.display = 'none';
// quiz.style.display = 'block';

const loadQuiz = () => {
    const usrid = document.getElementById('usrid').value;
    axios.post(url + "/api/loadquiz/").then(r => {
        r.data.data.map(i => {
            if (i.status == true) {
                document.getElementById('quiz').innerHTML += `<a class="btn btn-success" id="q5" 
                href="https://docs.google.com/forms/d/e/${i.formid}/viewform?usp=pp_url&entry.28548348=${usrid}"><i
                class="bi bi-person-circle"></i>&nbsp;&nbsp;คำถามท้ายชั่วโมง ${i.title}</a><p></p>`
            }
        })
    })
}

const getUser = async (usrid) => {
    axios.post(url + '/api/getuser', { usrid }).then(async (r) => {
        document.getElementById('usernametxt').innerHTML = r.data.data[0].username;
        document.getElementById("username").value = r.data.data[0].username;
        document.getElementById("studentid").value = r.data.data[0].studentid;
        // await liff.closeWindow()
        loadQuiz()
    })
}

const getUserid = async () => {
    const profile = await liff.getProfile();
    document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    getUser(await profile.userId)
}

initializeLiff()

