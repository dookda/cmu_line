
function initializeLiff() {
    liff.init({
        liffId: "1657043590-yRALeNnp"
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
var myChart = echarts.init(document.getElementById('chart'));

const getCheckin = (usrid) => {
    axios.post('/api/getcheckinperson', { usrid }).then((r) => {
        console.log(r.data.data);
        let a = r.data.data.map(i => [i.ts7, 1])
        console.log(a);
        const option = {
            visualMap: {
                show: false,
                min: 0,
                max: 10000
            },
            visualMap: {
                min: 0,
                max: 1,
                calculable: true,
                orient: 'vertical',
                left: '260',
                top: 'center'
            },
            calendar: {
                orient: 'vertical',
                yearLabel: {
                    margin: 40
                },
                monthLabel: {
                    margin: 20
                },
                cellSize: 20,
                range: ['2022-06', '2022-11']
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: a
            }
        };

        myChart.setOption(option);
    })
}



async function getUserid() {
    const profile = await liff.getProfile();
    // document.getElementById("usrid").value = await profile.userId;
    document.getElementById("profile").src = await profile.pictureUrl;
    document.getElementById("displayName").innerText = await profile.displayName;
    getCheckin(await profile.userId)
}
initializeLiff()

