const moment = require('moment')
const date = moment().locale("th").add(543, 'years').format('Do MMMM YYYY')

//เมนูตั้งต้น
function flexRatio(ratio, sum, balance) {
  //console.log(sum.rice)
  var color = "#ff0000" //แดง
  var color = "#444444" //ดำ

  const ratioRice = ratio.rice
  const ratioMeat = ratio.meat
  const ratioFruits = ratio.fruits
  const ratioVegetable = ratio.vegetable
  const ratioMilk = ratio.milk
  const ratioSugar = ratio.sugar
  const ratioFat = ratio.fat
  const ratioSodium = ratio.sodium

  const sumRice = sum.rice
  const sumMeat = sum.meat
  const sumFruits = sum.fruits
  const sumVegetable = sum.vegetable
  const sumMilk = sum.milk
  const sumSugar = sum.sugar
  const sumFat = sum.fat
  const sumSodium = sum.sodium

  const balanceRice = balance.rice
  const balanceMeat = balance.meat
  const balanceFruits = balance.fruits
  const balanceVegetable = balance.vegetable
  const balanceMilk = balance.milk
  const balanceSugar = balance.sugar
  const balanceFat = balance.fat
  const balanceSodium = balance.sodium

  var colorRice = "#444444"
  var commentRice
  if (ratioRice - sumRice > 0) { commentRice = `เพิ่ม ${balanceRice}` }
  else if (ratioRice - sumRice == 0) { commentRice = `เหมาะสม` }
  else if (ratioRice - sumRice < 0) {
    commentRice = `ลด ${balanceRice * -1}`
    colorRice = "#ff0000"
  }

  var commentMeat
  var colorMeat = "#444444"
  if (ratioMeat - sumMeat > 0) { commentMeat = `เพิ่ม ${balanceMeat}` }
  else if (ratioMeat - sumMeat == 0) { commentMeat = `เหมาะสม` }
  else if (ratioMeat - sumMeat < 0) {
    commentMeat = `ลด ${balanceMeat * -1}`
    colorMeat = "#ff0000"
  }

  var commentVegetable
  var colorVegetable = "#444444"
  if (ratioVegetable - sumVegetable > 0) { commentVegetable = `เพิ่ม ${balanceVegetable}` }
  else if (ratioVegetable - sumVegetable == 0) { commentVegetable = `เหมาะสม` }
  else if (ratioVegetable - sumVegetable < 0) {
    commentVegetable = `ลด ${balanceVegetable * -1}`
    colorVegetable = "#ff0000"
  }

  var commentFruits
  var colorFruits = "#444444"
  if (ratioFruits - sumFruits > 0) { commentFruits = `เพิ่ม ${balanceFruits}` }
  else if (ratioFruits - sumFruits == 0) { commentFruits = `เหมาะสม` }
  else if (ratioFruits - sumFruits < 0) {
    commentFruits = `ลด ${balanceFruits * -1}`
    colorFruits = "#ff0000"
  }

  var commentMilk
  var colorMilk = "#444444"
  if (ratioMilk - sumMilk > 0) { commentMilk = `เพิ่ม ${balanceMilk}` }
  else if (ratioMilk - sumMilk == 0) { commentMilk = `เหมาะสม` }
  else if (ratioMilk - sumMilk < 0) {
    commentMilk = `ลด ${balanceMilk * -1}`
    colorMilk = "#ff0000"
  }

  var commentSugar = ' '
  var colorSugar = "#444444"
  if (ratioSugar - sumSugar < 0) {
    commentSugar = `ลด ${balanceSugar * -1}`
    colorSugar = "#ff0000"
  }

  var commentFat
  var colorFat = "#444444"
  if (ratioFat - sumFat > 0) { commentFat = `เพิ่ม ${balanceFat}` }
  else if (ratioFat - sumFat == 0) { commentFat = `เหมาะสม` }
  else if (ratioFat - sumFat < 0) {
    commentFat = `ลด ${balanceFat * -1}`
    colorFat = "#ff0000"
  }

  var commentSodium = ' '
  var colorSodium = "#444444"
  if (ratioSodium - sumSodium < 0) {
    commentSodium = `ลด ${balanceSodium * -1}`
    colorSodium = "#ff0000"
  }

  return {
    "type": "flex",
    "altText": "สัดส่วนอาหารของท่าน",
    "contents": {
      "type": "bubble",
      "size": "giga",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "สัดส่วนอาหารของท่าน",
                    "size": "md",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": `${date}`,
                    "size": "xxs",
                    "gravity": "center",
                    "align": "end",
                    "flex": 2
                  }
                ]
              },
              {
                "type": "spacer"
              }
            ],
            "borderColor": "#FFFFFF"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "backgroundColor": "#000000",
            "height": "1px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ประเภท",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 3
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ตั้งต้น",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "กิน",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "คำแนะนำ",
                        "align": "center",
                        "gravity": "center",
                        "weight": "bold",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 2,
                    "width": "70px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ],
                "height": "25px"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F4.png?alt=media&token=92d9ae81-fd07-4e2e-a6d7-ad619cc3b274"
                          },
                          {
                            "type": "text",
                            "text": "ข้าว-แป้ง (ทัพพี)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F8.png?alt=media&token=e103423b-7840-4889-a18b-d27693aa512d"
                          },
                          {
                            "type": "text",
                            "text": "เนื้อสัตว์ (ส่วน)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F5.png?alt=media&token=af5412a6-55a1-42f1-b74c-8cd43a6a531e"
                          },
                          {
                            "type": "text",
                            "text": "ผัก (ทัพพี)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F6.png?alt=media&token=9e38b99c-e070-4547-b2ad-43d7053db750"
                          },
                          {
                            "type": "text",
                            "text": "ผลไม้ (ส่วน)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F7.png?alt=media&token=ff6de9ca-19ee-461b-92ff-ed550d1597a9"
                          },
                          {
                            "type": "text",
                            "text": "นม (แก้ว)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F9.png?alt=media&token=d5140c50-1c68-43ca-8d43-3ce43afd4043"
                          },
                          {
                            "type": "text",
                            "text": "ไขมัน/ถั่ว (ช้อนชา)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F10.png?alt=media&token=10f8ec82-372d-4c07-969c-b795f94ac3cc"
                          },
                          {
                            "type": "text",
                            "text": "น้ำตาล (ช้อนชา)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      },

                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "spacer"
                          },
                          {
                            "type": "icon",
                            "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F11.png?alt=media&token=66c0cbee-19c8-489d-ae5c-1e733b0bcad5"
                          },
                          {
                            "type": "text",
                            "text": "โซเดียม (ช้อนชา)",
                            "offsetStart": "5px",
                            "gravity": "center",
                            "size": "sm"
                          }
                        ],
                        "spacing": "xs"
                      }
                    ],
                    "flex": 3
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": `${ratio.rice}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.meat}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.vegetable}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.fruits}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.milk}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.fat}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${ratio.sugar}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },

                      {
                        "type": "text",
                        "text": `${ratio.sodium}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "text": `${sum.rice}`,
                      },
                      {
                        "type": "text",
                        "text": `${sum.meat}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.vegetable}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.fruits}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.milk}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.fat}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.sugar}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": `${sum.sodium}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": commentRice,
                        "color": colorRice,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": commentMeat,
                        "color": colorMeat,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "text": commentVegetable,
                        "color": colorVegetable,
                      },
                      {
                        "type": "text",
                        "text": commentFruits,
                        "color": colorFruits,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": commentMilk,
                        "color": colorMilk,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": commentFat,
                        "color": colorFat,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },
                      {
                        "type": "text",
                        "text": commentSugar,
                        "color": colorSugar,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      },

                      {
                        "type": "text",
                        "text": commentSodium,
                        "color": colorSodium,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      }
                    ],
                    "flex": 2,
                    "width": "70px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          }
        ]
      }
    },
    "quickReply": {
      "items": [
        {
          "type": "action",
          "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
          "action": {
            "type": "message",
            "label": "ข้อมูลสรุปและคำแนะนำ",
            "text": "ข้อมูลสรุป"
          },
        },
        {
          "type": "action",
          "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F4.png?alt=media&token=92d9ae81-fd07-4e2e-a6d7-ad619cc3b274",
          "action": {
            "type": "message",
            "label": "ประวัติการกิน",
            "text": "ประวัติการกิน"
          }
        }
      ]
    }
  }
}
function flexResultRatio(ratio, sum, balance, comment) {
  var textRecommend = "แนะนำให้"
  if (ratio.rice > sum.rice || ratio.fruits > sum.fruits || ratio.vegetable > sum.vegetable || ratio.meat > sum.meat
    || ratio.milk > sum.milk || ratio.sugar > sum.sugar || ratio.fat > sum.fat || ratio.sodium > sum.sodium) {
    textRecommend += "เพิ่ม"
    if (ratio.rice > sum.rice) { textRecommend += "ข้าว" }
    if (ratio.fruits > sum.fruits) { textRecommend += " ผลไม้" }
    if (ratio.vegetable > sum.vegetable) { textRecommend += " ผัก" }
    if (ratio.meat > sum.meat) { textRecommend += " เนื้อสัตว์" }
    if (ratio.milk > sum.milk) { textRecommend += " นม" }
    if (ratio.fat > sum.fat) { textRecommend += " ไขมัน" }
    textRecommend += "ให้ครบตามปริมาณที่กำหนด"
  }
  if (ratio.rice < sum.rice || ratio.fruits < sum.fruits || ratio.vegetable < sum.vegetable || ratio.meat < sum.meat
    || ratio.milk < sum.milk || ratio.sugar < sum.sugar || ratio.fat < sum.fat || ratio.sodium < sum.sodium) {
    textRecommend += "\nลด"
    if (ratio.rice < sum.rice) { textRecommend += "ข้าว" }
    if (ratio.fruits < sum.fruits) { textRecommend += " ผลไม้" }
    if (ratio.vegetable < sum.vegetable) { textRecommend += " ผัก" }
    if (ratio.meat < sum.meat) { textRecommend += " เนื้อสัตว์" }
    if (ratio.milk < sum.milk) { textRecommend += " นม" }
    if (ratio.sugar < sum.sugar) { textRecommend += " น้ำตาล" }
    if (ratio.fat < sum.fat) { textRecommend += " ไขมัน" }
    if (ratio.sodium < sum.sodium) { textRecommend += " โซเดียม" }
    textRecommend += "ลงตามปริมาณที่กำหนด"
  }


  if (ratio.bmr > sum.kcal) {
    textResult = "พลังงานคงเหลือ"
    textResultKcal = `${(balance.kcal).toFixed(2)} kcal`
  } else if (ratio.bmr = sum.kcal) {
    textResult = "เหมาะสม"
    textResultKcal = `${(balance.kcal).toFixed(2)} kcal`
  } else {
    textResult = "พลังงานเกิน"
    textResultKcal = `${(balance.kcal * -1).toFixed(2)} kcal`
  }
  var commentTrainer = {
    "type": "spacer"
  }
  if (comment != ' ') {
    commentTrainer = {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": "คำแนะนำจากผู้ดูแล",
          "size": "md",
          "weight": "bold",
          "flex": 1,
          "wrap": true
        },
        {
          "type": "text",
          "text": `${comment}`,
          "size": "sm",
          "flex": 2,
          "wrap": true
        }
      ],
      "margin": "sm"
    }
  }
  return {
    "type": "flex",
    "altText": "ข้อมูลสรุป",
    "contents": {
      "type": "bubble",
      "size": "giga",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "ข้อมูลสรุป",
                    "size": "lg",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center"
                  },
                  {
                    "type": "text",
                    "text": `${date}`,
                    "size": "xxs",
                    "gravity": "center",
                    "align": "end"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "พลังงานที่ควรได้รับต่อวัน",
                    "size": "md",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": `${(ratio.bmr).toFixed(2)} Kcal`,
                    "flex": 1,
                    "size": "sm"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF",
            "margin": "md"
          },

          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "พลังงานที่ได้รับวันนี้",
                    "size": "md",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": `${sum.kcal} Kcal`,
                    "flex": 1,
                    "size": "sm"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": textResult,
                "size": "md",
                "weight": "bold",
                "flex": 2
              },
              {
                "type": "text",
                "text": textResultKcal,
                "size": "sm",
                "flex": 1
              }
            ],
            "margin": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "หน่วย: Kcal",
                    "size": "xxs",
                    "weight": "regular",
                    "align": "start",
                    "gravity": "center"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "backgroundColor": "#000000",
            "height": "1px",
            "margin": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "คาร์โบไฮเดรต",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "โปรตีน",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ไขมัน",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ],
                "height": "25px"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": `${sum.kcalCarbo}`,
                        "size": "sm",
                        "align": "center"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": `${sum.kcalProtein}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": `${sum.kcalFat}`,
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "คำแนะนำ",
                "size": "md",
                "weight": "bold",
                "flex": 1
              },
              {
                "type": "text",
                "text": textRecommend,
                "size": "sm",
                "flex": 2,
                "wrap": true
              }
            ],
            "margin": "sm"
          },
          commentTrainer
          // {
          //   "type": "box",
          //   "layout": "horizontal",
          //   "contents": [
          //     {
          //       "type": "text",
          //       "text": "คำแนะนำ",
          //       "size": "md",
          //       "weight": "bold",
          //       "flex": 1
          //     },
          //     {
          //       "type": "text",
          //       "text": "จากผู้ดูแล",
          //       "size": "sm",
          //       "flex": 2,
          //       "wrap": true
          //     }
          //   ],
          //   "margin": "sm"
          // }
        ]
      }
    },
    "quickReply": {
      "items": [
        {
          "type": "action",
          "imageUrl": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fflex%20icon%2F4.png?alt=media&token=92d9ae81-fd07-4e2e-a6d7-ad619cc3b274",
          "action": {
            "type": "message",
            "label": "ประวัติการกิน",
            "text": "ประวัติการกิน"
          }
        }
      ]
    }
  }
}
//เมนูมื้อเช้า ว่างเช้า ...
function flexMeal(data1, data2) {
  var image1, image2, link1, link2, menu1, menu2
  if (data1 == 'breakfast' && data2 == 'morningsnack') {
    image1 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Fmorning.jpeg?alt=media&token=f6f64ea5-a3c2-4c3d-b991-993adb1de6d9"
    image2 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Fmorningsnack.jpeg?alt=media&token=0d2265fa-d1c5-4de1-8f49-f98567b4513f"
    link1 = `line://app/1653872646-1qwnbVX8?meal=${data1}`
    link2 = `line://app/1653872646-1qwnbVX8?meal=${data2}`
    menu1 = `อาหารเช้า`
    menu2 = `อาหารว่างเช้า`
    see1 = `ดูอาหารมื้อเช้า`
    see2 = `ดูอาหารว่างเช้า`
    color = "#A7303Acc"
    colorbtn = "#E17F96"
  }
  if (data1 == 'lunch' && data2 == 'afternoonsnack') {
    image1 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Flunch.jpeg?alt=media&token=27bff55e-d4f4-45a5-ba77-7d3ee5155438"
    image2 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Fafternoonsnack.jpeg?alt=media&token=48cda39b-cf62-4449-96ba-df6314b87ee0"
    link1 = `line://app/1653872646-1qwnbVX8?meal=${data1}`
    link2 = `line://app/1653872646-1qwnbVX8?meal=${data2}`
    menu1 = `อาหารกลางวัน`
    menu2 = `อาหารว่างบ่าย`
    see1 = `ดูอาหารมื้อกลางวัน`
    see2 = `ดูอาหารว่างบ่าย`
    color = "#896A4Ccc"
    colorbtn = "#D5A988"
  }
  if (data1 == 'dinner' && data2 == 'beforebed') {
    image1 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Fdinner.jpeg?alt=media&token=ef988db4-27b0-47a6-ab0d-d64aee224e54"
    image2 = "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Fheadmeal%2Fbeforebed.jpeg?alt=media&token=138aedd3-ee90-4089-b051-248362e4347a"
    link1 = `line://app/1653872646-1qwnbVX8?meal=${data1}`
    link2 = `line://app/1653872646-1qwnbVX8?meal=${data2}`
    menu1 = `อาหารเย็น`
    menu2 = `อาหารก่อนนอน`
    see1 = `ดูอาหารมื้อเย็น`
    see2 = `ดูอาหารก่อนนอน`
    color = "#496D9Dcc"
    colorbtn = "#8A9FB7"
  }

  return {
    "type": "flex",
    "altText": `มื้ออาหาร`,
    "contents": {
      "type": "carousel",
      "contents": [
        {
          "type": "bubble",
          "size": "micro",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": image1,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:2.5",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": menu1,
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "filler"
                          }
                        ],
                        "height": "5px"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "uri",
                              "label": "เพิ่ม",
                              "uri": link1
                            },
                            "style": "primary",
                            "position": "relative",
                            "height": "sm",
                            "color": "#F8BA00",
                            //"flex": 2
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "filler"
                          }
                        ],
                        "width": "5px"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "message",
                              "label": "ดู",
                              "text": see1
                            },
                            "style": "primary",
                            "position": "relative",
                            "height": "sm",
                            "color": colorbtn,
                            //"flex": 2
                          }
                        ]
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": color,
                "paddingAll": "10px",
                "paddingTop": "10px"
              }
            ],
            "paddingAll": "0px"
          }
        },
        {
          "type": "bubble",
          "size": "micro",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": image2,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:2.5",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": menu2,
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "filler"
                          }
                        ],
                        "height": "5px"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "uri",
                              "label": "เพิ่ม",
                              "uri": link2
                            },
                            "style": "primary",
                            "position": "relative",
                            "height": "sm",
                            "color": "#F8BA00",
                            //"flex": 2
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "filler"
                          }
                        ],
                        "width": "5px"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "message",
                              "label": "ดู",
                              "text": see2
                            },
                            "style": "primary",
                            "position": "relative",
                            "height": "sm",
                            "color": colorbtn,
                            //"flex": 2
                          }
                        ]
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": color,
                "paddingAll": "10px",
                "paddingTop": "10px"
              }
            ],
            "paddingAll": "0px"
          }
        }
      ]
    }
  }
}
//flex อาหารของแต่ละมื้อ
function flexMealDetail(meal, data) {

  //console.log(data)
  var mealname;
  if (meal == "breakfast") { mealname = 'อาหารมื้อเช้า' }
  if (meal == "morningsnack") { mealname = 'อาหารว่างเช้า' }
  if (meal == "lunch") { mealname = 'อาหารมื้อกลางวัน' }
  if (meal == "afternoonsnack") { mealname = 'อาหารว่างบ่าย' }
  if (meal == "dinner") { mealname = 'อาหารมื้อเย็น' }
  if (meal == "beforebed") { mealname = 'อาหารก่อนนอน' }
  var allMeal = []
  for (let i = 0; i < data.length; i++) {
    if (i < 10) {
      const obj = {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": `วันที่ ${date}`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xxs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": `${mealname}`,
                      "size": "lg",
                      "weight": "bold",
                      "gravity": "bottom",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": `${data[i].data.foodname}`,
                      "gravity": "center",
                      "flex": 1,
                      "wrap": true
                    }
                  ],
                  "flex": 3
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "image",
                      "url": `${data[i].data.image}`,
                      "aspectRatio": "4:4",
                      "action": {
                        "type": "uri",
                        "label": "action",
                        "uri": `${data[i].data.image}`
                      }
                    }
                  ],
                  "flex": 2
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "filler"
                }
              ],
              "backgroundColor": "#EDEDED",
              "height": "1px"
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Frice.png?alt=media&token=2f5a0058-69b1-40d1-883c-b6fa1a65cc27",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "ข้าว-แป้ง",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.rice}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ทัพพี",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Ffruits.png?alt=media&token=6d92ee25-4cdf-47dd-b973-8ab3d50c3068",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "ผลไม้",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.fruits}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ส่วน",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fdiet.png?alt=media&token=7e92f872-fe7c-497a-b6a5-d5030e633690",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "ผัก",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.vegetable}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ทัพพี",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fmilk.png?alt=media&token=a3a99132-9a48-4113-a975-cfe1b18edc13",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "นม",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.milk}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "แก้ว",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fturkey.png?alt=media&token=36d1393c-dded-43f8-b8ee-b62a9ec36f8c",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "เนื้อสัตว์",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.meat}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ช้อนข้าว",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fgreen-beans.png?alt=media&token=a482cdcf-765d-416f-af57-519fff152727",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "ไขมัน/ถั่ว",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.fat}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ช้อนชา",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fsugar.png?alt=media&token=140958f6-6807-4ab9-89be-03dff9200218",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "น้ำตาล",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.sugar}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ช้อนชา",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fsalt.png?alt=media&token=551326e3-d644-4639-97ee-0f6fbf8b6472",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "โซเดียม",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.sodium}`,
                  "size": "sm",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "ช้อนชา",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            },
            {
              "type": "separator"
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Ffire.png?alt=media&token=5d5f4e37-8a8c-4256-a268-ebf09a2898d6",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "พลังงานรวม",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 2,
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${data[i].data.kcal}`,
                  "size": "sm",
                  "align": "center",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "Kcal",
                  "align": "center",
                  "flex": 1,
                  "size": "sm"
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "color": "#FF7777",
              "action": {
                "type": "uri",
                "label": "แก้ไข",
                "uri": `line://app/1653872646-50jgVzQb?meal=${meal}&date=${data[i].data.date}&docId=${data[i].docId}`
              },
              "height": "sm"
            }
          ]
        }
      }
      allMeal.push(obj)
    }

  }
  const addMore = {
    "type": "bubble",
    "size": "kilo",
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": `เพิ่ม${mealname}อีก`,
            "uri": `line://app/1653872646-1qwnbVX8?meal=${meal}`
          },
          "flex": 1,
          "gravity": "center"
        }
      ]
    }
  }
  allMeal.push(addMore)
  return {
    "type": "flex",
    "altText": `${mealname}`,
    "contents": {
      "type": "carousel",
      "contents":
        allMeal
    }
  }
}
//flex รายการอาหาร แผ่นพับ
function flexFoodList() {
  return {
    "type": "flex",
    "altText": "รายการอาหาร",
    "contents": {
      "type": "carousel",
      "contents": [
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F001.jpeg?alt=media&token=914ce531-3078-4c5b-86d2-9752badf903b",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดข้าว-แป้ง",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F001.jpeg?alt=media&token=914ce531-3078-4c5b-86d2-9752badf903b"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F002.jpeg?alt=media&token=0d937fc3-2642-4a9a-86d8-bfd129f6f1c7",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดผลไม้",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F002.jpeg?alt=media&token=0d937fc3-2642-4a9a-86d8-bfd129f6f1c7"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F003.jpeg?alt=media&token=26e02c22-86bf-484f-a4eb-b9bad6ab0b06",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดผัก ประเภท ก.",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F003.jpeg?alt=media&token=26e02c22-86bf-484f-a4eb-b9bad6ab0b06"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F004.jpeg?alt=media&token=c0b7dc5e-8664-4141-8b28-034e91031026",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดผัก ประเภท ข.",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "http://linecorp.com/"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F005.jpeg?alt=media&token=edf28208-1d10-4b84-bf94-0adcbe2b7b17",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดนม",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F005.jpeg?alt=media&token=edf28208-1d10-4b84-bf94-0adcbe2b7b17"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F006.jpeg?alt=media&token=0a224c37-b47d-457f-a80a-8fc4fa6d35a9",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดเนื้อสัตว์",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F006.jpeg?alt=media&token=0a224c37-b47d-457f-a80a-8fc4fa6d35a9"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F007.jpeg?alt=media&token=f8653256-a22d-453a-8325-c3ebc6d4cab4",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดเนื้อสัตว์",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F007.jpeg?alt=media&token=f8653256-a22d-453a-8325-c3ebc6d4cab4"
          }
        },
        {
          "type": "bubble",
          "size": "kilo",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F008.jpeg?alt=media&token=40511d70-a1b7-4839-98df-8367481c91b9",
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "หมวดไขมัน",
                        "size": "md",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2Ffood%20list%2F008.jpeg?alt=media&token=40511d70-a1b7-4839-98df-8367481c91b9"
          }
        }
      ]
    }
  }
}
//flex ประวัติน้ำหนัก
function flexHistoryWeight(data) {
  var dataDate = []
  var dataWeight = []
  for (let i = 0; i < data.length; i++) {
    //console.log(data[i].date)
    //const dateHis = moment(data[i], 'DD-MM-YYYY').add(543, 'years').format('DD MMMM YYYY')
    const dateHis = moment(data[i].date, 'DD-MM-YYYY').locale("th").add(543, 'years').format('Do/MM/YY')
    //console.log(data[i])
    const objDate = {
      "type": "text",
      "text": `${dateHis}`,
      "size": "sm",
    }
    dataDate.push(objDate)
    const objData = {
      "type": "text",
      "text": `${data[i].data.weight}`,
      "size": "sm",
      "align": "center"
    }
    dataWeight.push(objData)
  }
  return {
    "type": "flex",
    "altText": "ประวัติน้ำหนัก",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ประวัติน้ำหนัก",
            "size": "md",
            "weight": "bold"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  }
                ],
                "height": "1px",
                "backgroundColor": "#000000"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "spacer",
                        "size": "sm"
                      },
                      {
                        "type": "text",
                        "text": "วันที่",
                        "align": "center"
                      }
                    ],
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "spacer",
                        "size": "sm"
                      },
                      {
                        "type": "text",
                        "text": "น้ำหนัก (กก.)",
                        "align": "center",
                        "wrap": true
                      }
                    ],
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  }
                ],
                "height": "1px",
                "backgroundColor": "#000000"
              }
            ],
            "margin": "lg"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": dataDate,
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": dataWeight,
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  }
                ],
                "height": "1px",
                "backgroundColor": "#000000"
              }
            ]
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }
  }
}

function flexRecordHealth() {

  return {
    "type": "flex",
    "altText": "สัดส่วนอาหารของท่าน",
    "contents": {
      "type": "bubble",
      "size": "kilo",
      "hero": {
        "type": "image",
        "url": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2FformHealthRecord.jpg?alt=media&token=b063b4ba-96b6-4896-a2fb-cfbe6764b5aa",
        "size": "full",
        "aspectMode": "fit",
        "action": {
          "type": "uri",
          "uri": "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/flex%2FformHealthRecord.jpg?alt=media&token=b063b4ba-96b6-4896-a2fb-cfbe6764b5aa"
        }
      }
    }
  }

}
//flex ประวัติการกิน
function flexFoodHistory(data) {
  //console.log(data)
  var time = []
  var foodname = []
  var kcal = []
  var sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += data[i].kcal
    const timeHM = moment(data[i].time, 'HH:mm:ss').format('HH:mm')
    const objTime = {
      "type": "text",
      "text": `${timeHM}`,
      "gravity": "center",
      "align": "start",
      "size": "sm",
      "flex": 1,
      "offsetStart": "5px"
    }
    time.push(objTime)
    const objFood = {
      "type": "text",
      "text": `${data[i].foodname}`,
      "gravity": "center",
      "align": "start",
      "size": "sm",
      "flex": 1,
      "offsetStart": "5px"
    }
    foodname.push(objFood)
    const objKcal = {
      "type": "text",
      "text": `${data[i].kcal}`,
      "gravity": "center",
      "align": "center",
      "size": "sm",
      "flex": 1
    }
    kcal.push(objKcal)
  }

  var kcalSum = [
    {
      "type": "text",
      "text": `${sum}`,
      "gravity": "center",
      "align": "center",
      "size": "sm",
      "flex": 1
    }
  ]
  return {
    "type": "flex",
    "altText": "ประวัติการกิน",
    "contents": {
      "type": "bubble",
      "size": "giga",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "ประวัติการกิน",
                    "size": "lg",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center"
                  },
                  {
                    "type": "text",
                    "text": `${date}`,
                    "size": "xxs",
                    "gravity": "center",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "spacer"
              }
            ],
            "borderColor": "#FFFFFF"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "หน่วย: Kcal",
                    "size": "xxs",
                    "weight": "regular",
                    "align": "end",
                    "gravity": "center"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "backgroundColor": "#000000",
            "height": "1px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "เวลา",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 1,
                    "width": "60px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ชื่ออาหาร",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "พลังงาน",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ],
                "height": "25px"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": time,
                    "width": "60px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": foodname,
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": kcal,
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "9:00",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "color": "#FFFFFF"
                      }
                    ],
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#FFFFFF",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "พลังงานรวม",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "offsetStart": "5px"
                      }
                    ],
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": kcalSum,
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  }
                ]
              }
            ],
            "margin": "md"
          }
        ]
      }
    },
    "quickReply": {
      "items": [
        {
          "type": "action",
          "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
          "action": {
            "type": "message",
            "label": "ข้อมูลสรุปและคำแนะนำ",
            "text": "ข้อมูลสรุป"
          },
        }
      ]
    }
  }
}
//flex ประวัติการกินแบบเลือกวัน
function flexFoodHistoryDate(data, dateSelect) {
  const dateSel = moment(dateSelect, 'YYYY-MM-DD').locale("th").add(543, 'years').format('Do MMMM YYYY')
  //console.log(data)
  var time = []
  var foodname = []
  var kcal = []
  var sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += data[i].kcal
    const timeHM = moment(data[i].time, 'HH:mm:ss').format('HH:mm')
    const objTime = {
      "type": "text",
      "text": `${timeHM}`,
      "gravity": "center",
      "align": "start",
      "size": "sm",
      "flex": 1,
      "offsetStart": "5px"
    }
    time.push(objTime)
    const objFood = {
      "type": "text",
      "text": `${data[i].foodname}`,
      "gravity": "center",
      "align": "start",
      "size": "sm",
      "flex": 1,
      "offsetStart": "5px"
    }
    foodname.push(objFood)
    const objKcal = {
      "type": "text",
      "text": `${data[i].kcal}`,
      "gravity": "center",
      "align": "center",
      "size": "sm",
      "flex": 1
    }
    kcal.push(objKcal)
  }

  var kcalSum = [
    {
      "type": "text",
      "text": `${sum}`,
      "gravity": "center",
      "align": "center",
      "size": "sm",
      "flex": 1
    }
  ]
  return {
    "type": "flex",
    "altText": "ประวัติการกิน",
    "contents": {
      "type": "bubble",
      "size": "giga",
      "direction": "ltr",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "ประวัติการกิน",
                    "size": "lg",
                    "weight": "bold",
                    "align": "start",
                    "gravity": "center"
                  },
                  {
                    "type": "text",
                    "text": `${dateSel}`,
                    "size": "xxs",
                    "gravity": "center",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "spacer"
              }
            ],
            "borderColor": "#FFFFFF"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "หน่วย: Kcal",
                    "size": "xxs",
                    "weight": "regular",
                    "align": "end",
                    "gravity": "center"
                  }
                ]
              }
            ],
            "borderColor": "#FFFFFF",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "backgroundColor": "#000000",
            "height": "1px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "เวลา",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 1,
                    "width": "60px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ชื่ออาหาร",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "พลังงาน",
                        "weight": "bold",
                        "align": "center",
                        "gravity": "center",
                        "flex": 1,
                        "size": "sm"
                      }
                    ],
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ],
                "height": "25px"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": time,
                    "width": "60px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#000000",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": foodname,
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": kcal,
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#000000"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              }
            ],
            "height": "1px",
            "backgroundColor": "#000000"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "9:00",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "color": "#FFFFFF"
                      }
                    ],
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "backgroundColor": "#FFFFFF",
                    "width": "1px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "พลังงานรวม",
                        "gravity": "center",
                        "align": "center",
                        "size": "sm",
                        "flex": 1,
                        "offsetStart": "5px"
                      }
                    ],
                    "flex": 2
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": kcalSum,
                    "flex": 1
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      }
                    ],
                    "width": "1px",
                    "backgroundColor": "#FFFFFF"
                  }
                ]
              }
            ],
            "margin": "md"
          }
        ]
      }
    }
  }
}
//flex ประวัติการกินวันนี้ที่กดจาก Qlick reply
function flexRecordFood(data) {
  const dateStart = moment().locale("th").subtract(7, 'days').add(543, 'years').format('Do/MM/YY')
  const dateEnd = moment().locale("th").add(543, 'years').format('Do/MM/YY')
  var obj = []
  for (let i = 0; i < data.length; i++) {
    const dateShow = moment(data[i].date, 'DD-MM-YYYY').locale("th").add(543, 'years').format('Do/MM/YY')

    const o = {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": `${dateShow}`,
          "size": "sm",
          "flex": 1
        },
        {
          "type": "text",
          "text": `${data[i].kcal}`,
          "size": "sm",
          "flex": 1,
          "offsetStart": "10px",
          "align": "center"
        },
        {
          "type": "text",
          "text": "รายละเอียด",
          "size": "sm",
          "flex": 1,
          "align": "end",
          "color": "#f57b51",
          "action": {
            "type": "message",
            "label": `ย้อนหลัง`,
            "text": `ย้อนหลังวันที่ ${data[i].date}`
          }
        }
      ],
      "height": "30px"
    }
    const space = {
      "type": "separator"
    }
    obj.push(o)
    obj.push(space)
  }
  return {
    "type": "flex",
    "altText": "ประวัติการกินย้อนหลัง",
    "contents": {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ประวัติการกินย้อนหลัง",
            "size": "lg",
            "weight": "regular"
          },
          {
            "type": "text",
            "text": `ระหว่างวันที่ ${dateStart} ถึง ${dateEnd}`,
            "size": "xxs"
          }

        ],
        "backgroundColor": "#a1e6e3"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "หน่วย:Kcal",
            "align": "end",
            "size": "xxs"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "ว/ด/ป",
                "size": "md",
                "flex": 2
              },
              {
                "type": "text",
                "text": "พลังงาน",
                "size": "md",
                "flex": 2
              },
              {
                "type": "filler"
              }
            ],
            "margin": "md",
            "height": "30px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": obj
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "รายละเอียด",
              "uri": "https://liff.line.me/1653872646-L6wW9DlA"
            },
            "height": "sm",
            "style": "primary",
            "color": "#75daad"
          }
        ]
      }
    }
  }

}
module.exports = {
  'flexRatio': flexRatio,
  'flexMeal': flexMeal,
  'flexMealDetail': flexMealDetail,
  'flexFoodList': flexFoodList,
  'flexHistoryWeight': flexHistoryWeight,
  'flexRecordHealth': flexRecordHealth,
  'flexResultRatio': flexResultRatio,
  'flexFoodHistory': flexFoodHistory,
  'flexFoodHistoryDate': flexFoodHistoryDate,
  'flexRecordFood': flexRecordFood
}