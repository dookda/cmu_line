var url = 'https://rti2dss.com/p3200';
// var url = 'http://localhost:3200';

let setCookie = (sid) => {
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = "s104_ustoken=" + sid + "; expires=" + now.toUTCString() + "; path=/";
}

sessionStorage.clear();
let logIn = () => {
    const name_th = document.getElementById('name_th').value;
    const pass = document.getElementById('pass').value;
    // console.log(std_id, pass);
    axios.post(url + '/api/score104login', { name_th, pass }).then(async (r) => {
        // console.log(r.data.std_id);
        if (r.data.data) {
            setCookie(r.data.std_id)
            location.href = "./../score104/index.html";
        }
    })
}



