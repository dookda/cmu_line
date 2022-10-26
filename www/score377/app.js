var url = 'https://rti2dss.com/p3200';
// var url = 'http://localhost:3200';

let std_id = sessionStorage.getItem("std_id");


let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const ustoken = getCookie("s377_ustoken");

// console.log(ustoken);

let gotoLogin = () => {
    location.href = "./../sclogin377/index.html";
}

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

const getUser = async (stdid) => {
    axios.post(url + '/api/score377', { stdid }).then(async (r) => {
        // console.log(r.data);
        if (r.data.data.length) {
            document.getElementById('std_id').value = r.data.data[0].std_id;
            document.getElementById("name_th").value = r.data.data[0].name_th;
            document.getElementById("last_th").value = r.data.data[0].last_th;
            document.getElementById("sc_1").value = r.data.data[0].midt_20p.toFixed(2);
            document.getElementById("sc_2").value = r.data.data[0].lab_15p.toFixed(2);
            document.getElementById("sc_3").value = r.data.data[0].part_5p.toFixed(2);
            document.getElementById("sc_4").value = r.data.data[0].termpro_30p.toFixed(2);
            // await liff.closeWindow()
        }
    })
}

const updatePass = () => {
    let pass = document.getElementById("pass").value
    // let std_id = document.getElementById("std_id").value
    axios.post(`${url}/api/changepass104`, { pass, std_id }).then(r => {
        getUser(std_id);
        modal.show();
        setTimeout(async () => {
            modal.hide();
        }, 1000);
    })
}

const checkOut = () => {

    document.cookie = "s377_ustoken=; max-age=0; path=/;";
    gotoLogin()
}


// console.log(std_id);
if (ustoken) {
    getUser(ustoken)
} else {
    gotoLogin()
}



