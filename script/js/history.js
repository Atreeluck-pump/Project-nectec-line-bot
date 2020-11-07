const dateStart = moment().format('DD-MM-YYYY')
const dateEnd = moment().subtract(7, 'days').format('DD-MM-YYYY')
console.log(dateStart)
console.log(dateEnd)

const start = moment(dateStart, 'DD-MM-YYYY').add(543, 'years').format('DD/MM/YYYY')
const end = moment(dateEnd, 'DD-MM-YYYY').add(543, 'years').format('DD/MM/YYYY')
$('#txtDateStart').text(end)
$('#txtDateEnd').text(start)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFdWUGFqrb_Z8HIMnDC1EcZMt5XgUrjDk",
    authDomain: "hba-project-db81d.firebaseapp.com",
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    projectId: "hba-project-db81d",
    storageBucket: "hba-project-db81d.appspot.com",
    messagingSenderId: "73692768531",
    appId: "1:73692768531:web:5bed26d43798d601a7d2e6",
    measurementId: "G-824HMK752T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

//Auth
const email = "test@hotmail.com";
const password = "123456";
firebase.auth().signInWithEmailAndPassword(email, password);

//liff.init({ liffId: "1653872646-L6wW9DlA" }, () => { }, err => console.error(err.code, error.message));
//const userId = 'Ufd0237b156b76fc784c1ace037a88c36'

window.onload = function () {
    const defaultLiffId = "1653872646-L6wW9DlA";
    myLiffId = defaultLiffId;
    initializeLiff(myLiffId);
};
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
}
function initializeApp() {
    liff.getProfile().then(function (profile) {
        const userId = profile.userId;
        //$('#txtUser').text(userId)
        getData(userId)
        getChart(userId)
    })
}


//console.log(userId, dateStart, dateEnd)

const TABLE_TEMPLATE =
    `
    <tr>
        <td id="txtDate"></td>
        <td id="txtRice"></td>
        <td id="txtKcalCarboPer"></td>
        <td id="txtKcalProteinPer"></td>
        <td id="txtKcalFatPer"></td>
        <td id="txtKcal"></td>
    </tr>

`
const dateStart1 = moment().format('YYYY-MM-DD')
const dateEnd1 = moment().subtract(7, 'days').format('YYYY-MM-DD')

var a = moment(dateStart1)
var b = moment(dateEnd1)
var result = a.diff(b, 'days')
console.log(result)

function getData(userId) {
    for (let i = 0; i <= result; i++) {
        const z = moment(dateEnd1).add(i, 'days').format('DD-MM-YYYY')
        console.log(z)
        db.collection("users").doc(userId).collection('diary').doc(z).get().then(function (doc) {
            if (doc.exists) {

                const tr = $(TABLE_TEMPLATE)
                const docId = doc.data().date
                const formatDate = moment(docId, 'DD-MM-YYYY').add(543, 'years').format('DD/MM/YYYY')
                tr.find('#txtDate').text(formatDate)
                db.collection("users").doc(userId).collection('diary').doc(docId).collection('history').doc('total').get().then(async function (doc) {
                    if (doc.exists) {

                        var food = ''
                        const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed',]
                        for (let j = 0; j < meal.length; j++) {
                            await db.collection('users').doc(userId).collection('diary').doc(docId).collection(meal[j]).get()
                                .then(snapshot => {
                                    snapshot.forEach(doc => {
                                        food += `${doc.data().foodname} `
                                        //console.log(doc.id +'=>'+doc.data().foodname);
                                    });
                                })
                        }

                        console.log(food)

                        tr.find('#txtRice').text(food)


                        tr.find('#txtKcal').text(doc.data().kcal)

                        const perCarbo = ((doc.data().kcalCarbo * 100) / doc.data().kcal).toFixed(2)
                        const perProtein = ((doc.data().kcalProtein * 100) / doc.data().kcal).toFixed(2)
                        const perFat = ((doc.data().kcalFat * 100) / doc.data().kcal).toFixed(2)
                        tr.find('#txtKcalCarboPer').text(perCarbo)
                        tr.find('#txtKcalProteinPer').text(perProtein)
                        tr.find('#txtKcalFatPer').text(perFat)
                        $('#tableRecord').append(tr)
                    }
                })
            }
        })
    }
}


async function getChart(userId) {
    var daySum = 0
    var kcalSum = 0
    var kcalCarboSum = 0
    var kcalProteinSum = 0
    var kcalFatSum = 0
    var bmr
    var kcalText = []

    var rice = 0
    var fruits = 0
    var sugar = 0
    var fat = 0
    var meat = 0
    var milk = 0
    var vegetable = 0


    await db.collection("users").doc(userId).collection('information').doc('profile').get().then(function (doc) {
        bmr = doc.data().bmr
    })

    for (let i = 0; i <= result; i++) {
        const z = moment(dateEnd1).add(i, 'days').format('DD-MM-YYYY')
        await db.collection("users").doc(userId).collection('diary').doc(z).collection('history').doc('total').get().then(function (doc) {
            if (doc.exists) {
                daySum++

                rice += doc.data().rice
                fruits += doc.data().fruits
                sugar += doc.data().sugar
                fat += doc.data().fat
                meat += doc.data().meat
                milk += doc.data().milk
                vegetable += doc.data().vegetable

                kcalSum += doc.data().kcal
                kcalCarboSum += doc.data().kcalCarbo
                kcalProteinSum += doc.data().kcalProtein
                kcalFatSum += doc.data().kcalFat
                const obj = {
                    "date": z,
                    "value": doc.data().kcal
                }
                kcalText.push(obj)
            }
        })
    }

    $('#txtDateResultKcal').text(daySum)

    const perCarbo = ((kcalCarboSum * 100) / kcalSum).toFixed(2)
    const perProtein = ((kcalProteinSum * 100) / kcalSum).toFixed(2)
    const perFat = ((kcalFatSum * 100) / kcalSum).toFixed(2)
    const kcalAvg = (kcalSum / daySum).toFixed(2)
    $('#txtKcalCarboResultAvg').text(perCarbo)
    $('#txtKcalProteinResultAvg').text(perProtein)
    $('#txtKcalFatResultAvg').text(perFat)
    $('#txtKcalResultAvg').text(kcalAvg)
    const carboAvg = (kcalCarboSum / daySum).toFixed(2)
    const proteinAvg = (kcalProteinSum / daySum).toFixed(2)
    const fatAvg = (kcalFatSum / daySum).toFixed(2)

    const riceAvg = (rice / daySum)
    const fruitsAvg = (fruits / daySum)
    const sugarAvg = (sugar / daySum)
    const fattAvg = (fat / daySum)
    const meatAvg = (meat / daySum)
    const milkAvg = (milk / daySum)
    const vegetableAvg = (vegetable / daySum)

    //cal carbo gram
    var carboGram = 0
    carboGram += (riceAvg * 18)
    carboGram += (fruitsAvg * 15)
    carboGram += (sugarAvg * 4)
    carboGram += (milkAvg * 12)
    carboGram += (vegetableAvg * 5)

    //cal Protein gram
    var proteinGram = 0
    proteinGram += riceAvg * 2
    proteinGram += milkAvg * 8
    proteinGram += vegetableAvg * 2
    proteinGram += meatAvg * 7

    //cal Fat gram
    var fatGram = 0
    fatGram += milkAvg * 5
    fatGram += meatAvg * 5
    fatGram += fattAvg * 5

    var bmrRange = bmr * 0.1


    var resultBmr = ''
    if (bmr + bmrRange > kcalAvg && kcalAvg > bmr - bmrRange) {
        resultBmr = 'เหมาะสมกับพลังงานที่ควรได้รับต่อวัน'
    } else if (kcalAvg > bmr + bmrRange) {
        resultBmr = 'มากกว่า'
    } else if (kcalAvg < bmr - bmrRange) {
        resultBmr = 'น้อยกว่า'
    }
    var resultCompareCarbo = ''
    var resultCarbo = ''
    if (perCarbo > 50) {
        resultCarbo = 'มากเกิน'
        resultCompareCarbo = 'ลด'
    } else if (40 <= perCarbo && perCarbo <= 50) {
        resultCarbo = 'เหมาะสม'
    } else {
        resultCarbo = 'น้อยเกิน'
        resultCompareCarbo = 'เพิ่ม'
    }

    var resultCompareProtein = ''
    var resultProtein = ''
    if (perProtein > 35) {
        resultProtein = 'มากเกิน'
        resultCompareProtein = 'ลด'
    } else if (25 <= perProtein && perProtein <= 35) {
        resultProtein = 'เหมาะสม'
    } else {
        resultProtein = 'น้อยเกิน'
        resultCompareProtein = 'เพิ่ม'
    }

    var resultCompareFat = ''
    var resultFat = ''
    if (perFat > 30) {
        resultFat = 'มากเกิน'
        resultCompareFat = 'ลด'
    } else if (20 <= perFat && perFat <= 30) {
        resultFat = 'เหมาะสม'
    } else {
        resultFat = 'น้อยเกิน'
        resultCompareFat = 'เพิ่ม'
    }

    $('#txtKcalCarboAvg').text(kcalAvg)
    $('#txtResultBmr').text(resultBmr)

    $("#txtBmr").text(bmr.toFixed(2))
    if (resultBmr == 'เหมาะสมกับพลังงานที่ควรได้รับต่อวัน') {
        $('#txtCommentKcal').hide()
    }

    var txtResultCarbo = ''
    if (resultCarbo == 'เหมาะสม') {
        $('#txtCarboGram').text(carboGram.toFixed(2))
        $('#txtCarboKcal').text(carboAvg)
        $('#txtResultCarbo1').text(resultCarbo)
        $('#txtEndCarbo').text('กับปริมาณที่ควรได้รับต่อวัน')
        $('#txtRecommendCarbo1').hide()
    } else {
        $('#txtCarboGram').text(carboGram.toFixed(2))
        $('#txtCarboKcal').text(carboAvg)
        $('#txtResultCarbo1').text(resultCarbo)
        $('#txtAddCarbo1').text(resultCompareCarbo)
        $('#txtAddRecomendCarbo1').text(` อาหารหมวดข้าว-แป้ง ผัก ผลไม้ และน้ำตาล`)
    }

    var txtResultProtein = ''
    if (resultProtein == 'เหมาะสม') {
        $('#txtProteinGram').text(proteinGram.toFixed(2))
        $('#txtProteinKcal').text(proteinAvg)
        $('#txtResultProtein1').text(resultProtein)
        $('#txtEndProtein').text('กับปริมาณที่ควรได้รับต่อวัน')
        $('#txtRecommendProtein1').hide()
    } else {
        $('#txtProteinGram').text(proteinGram.toFixed(2))
        $('#txtProteinKcal').text(proteinAvg)
        $('#txtResultProtein1').text(resultProtein)
        $('#txtAddProtein1').text(resultCompareProtein)
        $('#txtAddRecomendProtein1').text(`อาหารหมวดเนื้อสัตว์ และนม`)
    }

    var txtResultFat = ''
    if (resultFat == 'เหมาะสม') {
        $('#txtFatGram').text(fatGram.toFixed(2))
        $('#txtFatKcal').text(fatAvg)
        $('#txtResultFat1').text(resultFat)
        $('#txtEndFat').text('กับปริมาณที่ควรได้รับต่อวัน')
        $('#txtRecommendFat1').hide()
    } else {
        $('#txtFatGram').text(fatGram.toFixed(2))
        $('#txtFatKcal').text(fatAvg)
        $('#txtResultFat1').text(resultFat)
        $('#txtAddFat1').text(resultCompareFat)
        $('#txtAddRecomendFat1').text(`อาหารหมวดไขมัน/ถั่ว`)
    }
    getChartKcal(kcalText)
}

function getChartKcal(kcal) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartKcal", am4charts.XYChart);

        // Add data
        chart.data = kcal;

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.79;
        dateAxis.keepSelection = false;


    }); // end am4core.ready()
}
