
var url = 'https://rti2dss/p3200';

let std_id = sessionStorage.getItem("std_id");
console.log(std_id);
const getUser = async (stdid) => {
    axios.post(url + '/api/score330', { stdid }).then(async (r) => {
        if (r.data.data.length) {
            document.getElementById('std_id').value = r.data.data[0].std_id;
            document.getElementById("fname").value = r.data.data[0].fname;
            document.getElementById("lname").value = r.data.data[0].lname;
            document.getElementById("sc_raw").value = r.data.data[0].midt_raw;
            document.getElementById("sc_20").value = r.data.data[0].midt_20p;
            // await liff.closeWindow()
        }
    })
}

const checkOut = () => {
    sessionStorage.clear();
    window.open('./../sc330login/index.html', '_self');
}

getUser(std_id)

