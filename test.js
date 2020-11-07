const moment = require('moment')

//const date = new Date().getTime();
//const my_moment = moment('25-06-1994','DD-MM-YYYY')

//console.log('diff years ::==',moment().locale("th").diff(my_moment,'years'));

//console.log(moment(date).format('DD-MM-YYYY HH:mm:ss'));


//console.log(moment(1580804995941).locale("th").format('Do-MMMM-YYYY HH:mm:ss'))
//console.log(moment().locale("th").format('DD-MM-YYYY HH:mm:ss'))

// const my_date = '2017/07/03'
// const date = moment(my_date, 'YYYY/MM/DD').format('DD/MM/YYYY')
//console.log(date);

//2020-02-11 2020-02-14
// var a = moment('2020-02-14')
// var b = moment('2020-01-11')
// var result = a.diff(b, 'days')
// for (let i = 0; i <= result; i++) {
//     const z = moment('2020-01-30').add(i, 'days').format('DD/MM/YYYY')
//     console.log(z)
// }

console.log(moment('2020-01-30').add(543, 'years').format('DD/MM/YYYY'))