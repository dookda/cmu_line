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

    if (e.message.text === 'menu' || e.message.text === 'เมนู' || e.message.text === 'mn') {

        var msg = {
            "type": "text",
            "text": "menu",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "camera",
                            "label": "เช็คชื่อ",
                            // "label": "Camera"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://rti2dss.com/p3200/img/check.png",
                        "action": {
                            "type": "uri",
                            "label": "quiz",
                            "uri": "https://rti2dss.com/p3200/check/"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://rti2dss.com/p3200/img/list-check.png",
                        "action": {
                            "type": "uri",
                            "label": "การเข้าเรียน",
                            "uri": "https://rti2dss.com/p3200/checkday/"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://rti2dss.com/p3200/img/document.png",
                        "action": {
                            "type": "uri",
                            "label": "ลงทะเบียน",
                            "uri": "https://rti2dss.com/p3200/profile/"
                        }
                    },
                    {
                        "type": "action",
                        "imageUrl": "https://rti2dss.com/p3200/img/heart.png",
                        "action": {
                            "type": "uri",
                            "label": "dashboard",
                            "uri": "https://rti2dss.com/p3200/dashboard/"
                        }
                    },
                ]
            }
        }
        return client.replyMessage(e.replyToken, msg);
    }
}

module.exports = app;