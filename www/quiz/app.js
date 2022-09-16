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

var url = 'https://rti2dss.com/p3200';
// var url = 'https://e40b-202-28-250-93.ngrok.io';

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

// const quiz = document.getElementById('quiz');
// quiz.style.display = 'none';
// quiz.style.display = 'block';

const loadQuiz = (usrid) => {
    // const usrid = document.getElementById('usrid').value;
    axios.post(url + "/api/loadquiz/", { usrid }).then(r => {
        let a = 0
        r.data.data.map(i => {
            if (i.status == true) {
                document.getElementById('quiz').innerHTML += `<a class="btn btn-success" id="q5" 
                href="https://docs.google.com/forms/d/e/${i.formid}/viewform?usp=pp_url&entry.28548348=${usrid}"><i
                class="bi bi-person-circle"></i>&nbsp;&nbsp;คำถามท้ายชั่วโมง ${i.title}</a><p></p>`
            } else {
                a++
            }
        })
        a == 5 ? document.getElementById('quiz').innerHTML += `<label>ยังไม่มี quiz</label>` : null;
    })
}

const getScore = (usrid, quizId) => {
    // const usrid = document.getElementById('usrid').value;
    axios.post(url + "/api/getscore", { usrid, quizId }).then(r => {
        console.log(r.data.data);
        r.data.data.map(i => {
            document.getElementById("score").innerHTML += `<div class="shadow-none p-3 mb-2 bg-light rounded">แบบทดสอบหลังเรียน ${i.quizid} วันที่ ${i.dt} <br>คะแนน ${i.soretxt}</div>`
        })
    });
}

const getScoreMid = (usrid, quizId) => {
    // const usrid = document.getElementById('usrid').value;
    axios.post(url + "/api/getscore", { usrid, quizId }).then(r => {
        console.log(r.data.data);
        r.data.data.map(i => {
            document.getElementById("score").innerHTML += `<div class="shadow-none p-3 mb-2 bg-light rounded">เก็บคะแนนกลางภาค (20%) วันที่ ${i.dt} <br>คะแนน ${i.midscore}</div>`
        })
    });
}

const getUser = async (usrid) => {
    axios.post(url + '/api/getuser', { usrid }).then(async (r) => {
        document.getElementById('usernametxt').innerHTML = r.data.data[0].username;
        document.getElementById("username").value = r.data.data[0].username;
        document.getElementById("studentid").value = r.data.data[0].studentid;
        // await liff.closeWindow()
        await loadQuiz(usrid);
        await getScore(usrid);
        await getScoreMid(usrid);
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

