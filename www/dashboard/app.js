function initializeLiff() {
    liff.init({
        liffId: "1657043590-r00JY5BE"
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
let showData = async () => {
    let table = $('#tab').DataTable({
        ajax: {
            type: 'POST',
            url: url + '/api/getalluser',
            data: { usrid: "data" },
            dataSrc: 'data',
            cache: true,
        },
        columns: [
            // { data: 'usrid' },
            { data: 'studentid' },
            { data: 'username' },
            {
                data: null,
                "render": function (data, type, row) {
                    let a = moment(data.ts).zone('-0700').format('YYYY-MM-DD HH:mm')
                    return a
                }
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        responsive: true,
        scrollX: true,
        // order: [[2, 'asc']],
    });
}


let showCheckin = async () => {
    let table = $('#checkin').DataTable({
        ajax: {
            type: 'POST',
            url: url + '/api/getcheckin',
            data: { usrid: "data" },
            dataSrc: 'data',
            cache: true,
        },
        columns: [
            // { data: 'usrid' },
            { data: 'studentid' },
            { data: 'username' },
            {
                data: null,
                "render": function (data, type, row) {
                    let a = moment(data.ts).zone('-0700').format('YYYY-MM-DD HH:mm')
                    return a
                }
            },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        responsive: true,
        scrollX: true,
        // order: [[2, 'asc']],
    });
}

const checkAdmin = (userId) => {
    if (userId == "U4ed9e8cc38198119ed772a6c9e13835e") {
        showData()
        showCheckin()
    }
}

async function getUserid() {
    const profile = await liff.getProfile();
    // document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    checkAdmin(await profile.userId)
}
initializeLiff()

