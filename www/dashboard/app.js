
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
// var url = 'https://rti2dss.com/p3200';
var url = 'https://e40b-202-28-250-93.ngrok.io';
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

let modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})

const closeModal = () => {
    modal.hide();
}

const confirmDelete = () => {
    const gid = document.getElementById("gid").value;
    const usrid = document.getElementById("usrid").value;
    axios.post(url + '/api/deletecheckin', { gid, usrid }).then((r) => {
        $('#checkin').DataTable().ajax.reload();
        modal.hide();
    })
}

const deleteModal = (gid, usrid, username, studentid) => {
    modal.show();
    document.getElementById("studentid").innerText = studentid;
    document.getElementById("username").innerText = username;
    document.getElementById("gid").value = gid;
    document.getElementById("usrid").value = usrid;
}


let showCheckinTable = async () => {
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
            }, {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button class="btn btn-margin btn-danger" onclick="deleteModal('${row.gid}','${row.usrid}','${row.username}','${row.studentid}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                }
            }
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

var dom = document.getElementById('chart');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

const showCheckinChart = () => {
    axios.post(url + '/api/getcheckinall').then((r) => {
        // console.log(r.data.data);
        let a = r.data.data.map(i => [i.ts, Number(i.cnt)])
        // console.log(a);
        const option = {
            title: {
                top: 20,
                left: 'center',
                text: 'Daily Count (คน)'
            },
            tooltip: {},
            visualMap: {
                min: 0,
                max: 34,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65
            },
            calendar: {
                top: 100,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: ['2022-06', '2022-11'],
                itemStyle: {
                    borderWidth: 0.5
                },
                yearLabel: { show: false }
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: a
            }
        };

        myChart.setOption(option);
        window.addEventListener('resize', myChart.resize);
    })
}


const checkAdmin = (userId) => {
    if (userId == "U4ed9e8cc38198119ed772a6c9e13835e") {
        showData()
        showCheckinTable()
        showCheckinChart()
        loadQuiz()
    }
}

const loadQuiz = () => {
    axios.post(url + "/api/loadquiz/", { usrid: "usrid" }).then(async (r) => {
        r.data.data.map(i => {
            document.getElementById(`title${i.gid}`).value = i.title;
            document.getElementById(`formId${i.gid}`).value = i.formid;
            document.getElementById(`sheetId${i.gid}`).value = i.sheetid;
            i.status == true ? document.querySelector(`#status${i.gid}`).checked = true : document.querySelector(`#status${i.gid}`).checked = false;
        })
    })
}

const updateQuiz = (gid) => {
    const title = document.getElementById(`title${gid}`).value;
    const formid = document.getElementById(`formId${gid}`).value;
    const sheetid = document.getElementById(`sheetId${gid}`).value;
    const status = document.querySelector(`#status${gid}`).checked;
    console.log(formid, sheetid, title, status);
    axios.post(url + "/api/updatequiz/", { formid, sheetid, gid, title, status }).then(async (r) => {
        console.log(r.data);
    })
}

const checkQuiz = async (gid) => {
    const quizId = `q${gid}`;
    const sheetId = document.getElementById(`sheetId${gid}`).value;
    await axios.post(url + '/api/checkquiz', { quizId, sheetId }).then(r => {
        console.log(r);
    })
}

async function getUserid() {
    const profile = await liff.getProfile();
    // document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    checkAdmin(await profile.userId)
}
initializeLiff()

