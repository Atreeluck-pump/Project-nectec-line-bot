const admin = require('firebase-admin')
//admin.initializeApp();

//const request = require("request-promise");
const axios = require('axios')
// const serviceAccount = require("./key-firestore.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://hba-project-db81d.firebaseio.com",
//     storageBucket: "gs://hba-project-db81d.appspot.com"
// });
/////////// firebase ////////////


const { WebhookClient, Payload } = require('dialogflow-fulfillment')
const { callBalance } = require('./api_data/call_balance')
const { flexRatio, flexMeal, flexMealDetail, flexFoodList, flexHistory, flexRecordHealth } = require('./flexmessage/flexmessage')
const { callMealDetail } = require('./api_data/call_mealDetail')
const { callWeightHistory } = require('./api_data/call_weightHistory')

const richMenuId1 = 'richmenu-65557a25a17de50eac053311118af165'
const richMenuId2 = 'richmenu-b93e70808ffd755f514a15e04cb51129'
module.exports = (req, res) => {
    const agent = new WebhookClient({ request: req, response: res })
    const userId = agent.originalRequest.payload.data.source.userId
    //console.log(agent.originalRequest.payload.data)

    function welcome() {
        agent.add(`line://app/1653604028-lEV0W3gA`)
        //console.log(date)
        //console.log(time)
    }
    function addInformation() {
        console.log(userId)
        agent.add(`line://nv/QRCodeReader`)
        agent.add(`line://app/1653604028-nplbLEz0`)
    }
    function breakfast(agent) {
        let payloadJson = flexMeal("breakfast", "morningsnack")
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    function lunch(agent) {
        let payloadJson = flexMeal("lunch", "afternoonsnack")
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    function dinner(agent) {
        let payloadJson = flexMeal("dinner", "beforebed")
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    async function checkBreakfast(agent) {
        try {
            const data = await callMealDetail(userId, "breakfast")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('breakfast', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function checkLunch(agent) {
        try {
            const data = await callMealDetail(userId, "lunch")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('lunch', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function checkDinner(agent) {
        try {
            const data = await callMealDetail(userId, "dinner")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('dinner', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function checkMorningsnack(agent) {
        try {
            const data = await callMealDetail(userId, "morningsnack")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('morningsnack', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    async function checkAfternoonsnack(agent) {
        try {
            const data = await callMealDetail(userId, "afternoonsnack")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('afternoonsnack', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function checkBeforebed(agent) {
        try {
            const data = await callMealDetail(userId, "beforebed")
            if (data.length != 0) {
                let payloadJson = flexMealDetail('beforebed', data)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function ratio(agent) {
        try {
            const data = await callBalance(userId)
            const ratio = data[0];
            const dataTotal = data[1];
            const balance = data[2];
            if (ratio != undefined) {
                let payloadJson = flexRatio(ratio, dataTotal, balance)
                let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
                agent.add(payload);
                //console.log(data)
            } else {
                agent.add(`ยังไม่ได้ทานไรเลยน้า`);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function history(agent) {
        const data = await callWeightHistory(userId)
        let payloadJson = flexHistory(data)
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
        
    }
    function informationCompress(agent) {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId1}`,
            headers: {
                Authorization: 'Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}'
            }
        });
        agent.add(`เริ่มต้นการใช้งานได้เลยครับ`);
    }
    function menu1(agent) {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId1}`,
            headers: {
                Authorization: 'Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}'
            }
        });
        agent.add(`เมนูหลักพร้อมใช้งาน`);
    }
    function menu2(agent) {
        axios({
            method: 'post',
            url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId2}`,
            headers: {
                Authorization: 'Bearer {RNBVQMom+5jCwGzd0hSlihhch+OsW9wiGlZLTW1UbRk2DgnFHJHo29qfRn1oiIzv/4/bnO6H8Xer+h93/n53c8PoxRB3hiSSMEE9NtyoZHjgzeZnLbZmJ3VNfU7+Wxk/3eoWXL6HmasPU7gOa0mn4gdB04t89/1O/w1cDnyilFU=}'
            }
        });
        agent.add(`เมนูเพิ่มเติมพร้อมใช้งาน`);
    }
    function foodList(agent) {
        let payloadJson = flexFoodList()
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    function healthRecord(agent) {
        //let payloadJson = flexRecordHealth()
        let payloadJson = flexTest()
        let payload = new Payload('LINE', payloadJson, { sendAsMessage: true });
        agent.add(payload);
    }
    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)

    intentMap.set('Ratio', ratio)
    intentMap.set('History', history)

    intentMap.set('Breakfast', breakfast)
    intentMap.set('Lunch', lunch)
    intentMap.set('Dinner', dinner)

    intentMap.set('Add information', addInformation)
    intentMap.set('Check breakfast', checkBreakfast)
    intentMap.set('Check morningsnack', checkMorningsnack)
    intentMap.set('Check lunch', checkLunch)
    intentMap.set('Check afternoonsnack', checkAfternoonsnack)
    intentMap.set('Check dinner', checkDinner)
    intentMap.set('Check beforebed', checkBeforebed)
    intentMap.set('Information compress', informationCompress)
    intentMap.set('Food list', foodList)
    intentMap.set('Health record', healthRecord)
    intentMap.set('Menu1', menu1)
    intentMap.set('Menu2', menu2)
    agent.handleRequest(intentMap)
}

function flexTest(){
    return {
        "type": "flex",
        "altText": `มื้ออาหาร`,
        "contents": {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://linecorp.com/"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "Brown Cafe",
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": [
                    {
                      "type": "icon",
                      "size": "sm",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                    },
                    {
                      "type": "icon",
                      "size": "sm",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                    },
                    {
                      "type": "icon",
                      "size": "sm",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                    },
                    {
                      "type": "icon",
                      "size": "sm",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                    },
                    {
                      "type": "icon",
                      "size": "sm",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                    },
                    {
                      "type": "text",
                      "text": "4.0",
                      "size": "sm",
                      "color": "#999999",
                      "margin": "md",
                      "flex": 0
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Place",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Time",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": "10:00 - 23:00",
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "CALL",
                    "uri": "https://linecorp.com"
                  }
                },
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "WEBSITE",
                    "uri": "https://linecorp.com"
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          }
      }
}