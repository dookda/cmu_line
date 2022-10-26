var url = 'https://rti2dss.com/p3200';
// var url = 'http://localhost:3200';

sessionStorage.clear();
let logIn = () => {
    const std_id = document.getElementById('std_id').value;
    const pass = document.getElementById('pass').value;
    axios.post(url + '/api/score104login', { std_id, pass }).then(async (r) => {
        console.log(r.data.data.length);
        if (r.data.data.length) {
            console.log(r.data.data[0].std_id);
            window.open('./../score104/index.html', '_self');
            sessionStorage.setItem("std_id", r.data.data[0].std_id);
        }
    })
}



