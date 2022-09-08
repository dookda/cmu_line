var url = 'https://rti2dss.com/p3200';
// var url = 'http://localhost:3200';

let std_id = sessionStorage.getItem("std_id");

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

const getUser = async (stdid) => {
    axios.post(url + '/api/score330', { stdid }).then(async (r) => {
        if (r.data.data.length) {
            document.getElementById('std_id').value = r.data.data[0].std_id;
            document.getElementById("fname").value = r.data.data[0].fname;
            document.getElementById("lname").value = r.data.data[0].lname;
            document.getElementById("sc_raw").value = r.data.data[0].midt_raw;
            document.getElementById("sc_20").value = r.data.data[0].midt_20p;
            document.getElementById("pass").value = r.data.data[0].pass;
            // await liff.closeWindow()
        }
    })
}

const updatePass = () => {
    let pass = document.getElementById("pass").value
    // let std_id = document.getElementById("std_id").value

    axios.post(`${url}/api/changepass`, { pass, std_id }).then(r => {
        getUser(std_id);
        modal.show();
        setTimeout(async () => {
            modal.hide();
        }, 1000);
    })
}

const checkOut = () => {
    sessionStorage.clear();
    window.open('./../sclogin/index.html', '_self');
}


// console.log(std_id);
if (std_id) {
    getUser(std_id)
} else {
    sessionStorage.clear();
    window.open('./../sclogin/index.html', '_self');
}



