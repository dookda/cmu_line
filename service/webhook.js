const express = require('express');
const app = express.Router();

const con = require("./db");
const db = con.db;

const line = require("@line/bot-sdk");
const middleware = require('@line/bot-sdk').middleware
const config = require("./config.json")
const client = new line.Client(config);

app.post('/webhook', middleware(config), async (req, res) => {
    res.sendStatus(200)
    const e = req.body.events[0];
    console.log(e)
    if (e.type === 'message' && e.message.type === 'text') {
        handleMessageEvent(e);
    } else {
        return Promise.resolve(null);
    }
})

const handleMessageEvent = async (e) => {

    let profile = {
        "thumbnailImageUrl": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
        "title": "ปริมาณน้ำ",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-9WRXkGJG"
            }
        ]
    }
    let userId = e.source.userId

    if (e.message.text === 'ขอบคุณที่เป็นสามาชิกกับเรา') {
        await client.linkRichMenuToUser(userId, 'richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24')

        var msg = {
            type: 'text',
            text: 'yy'
        };
        return client.replyMessage(e.replyToken, msg);
    } else if (e.message.text === 'a') {

        var msg = {
            "type": "text",
            "text": "Hello Quick Reply!",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "uri",
                            "label": "URI",
                            "uri": "https://developers.line.biz"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "cameraRoll",
                            "label": "Camera Roll"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "camera",
                            "label": "Camera"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "location",
                            "label": "Location"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
                        "action": {
                            "type": "message",
                            "label": "Message",
                            "text": "Hello World!"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "postback",
                            "label": "Postback",
                            "data": "action=buy&itemid=123",
                            "displayText": "Buy"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
                        "action": {
                            "type": "datetimepicker",
                            "label": "Datetime Picker",
                            "data": "storeId=12345",
                            "mode": "datetime",
                            "initial": "2018-08-10t00:00",
                            "max": "2018-12-31t23:59",
                            "min": "2018-08-01t00:00"
                        }
                    }
                ]
            }
        }
        return client.replyMessage(e.replyToken, msg);
    } else {
        var msg = {
            type: 'text',
            text: 'สวัสดีครัช'
        };
        return client.replyMessage(e.replyToken, msg);
    }
}

module.exports = app;