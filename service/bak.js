if (e.message.text === 'ขอบคุณที่เป็นสามาชิกกับเรา') {
    await client.linkRichMenuToUser(userId, 'richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24')

    var msg = {
        type: 'text',
        text: 'yy'
    };
    return client.replyMessage(e.replyToken, msg);
} else if (e.message.text === 'menu' || e.message.text === 'เมนู' || e.message.text === 'mn') {

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
        type: 'sticker',
        packageId: '6136',
        stickerId: "10551378"
    };
    return client.replyMessage(e.replyToken, msg);
}