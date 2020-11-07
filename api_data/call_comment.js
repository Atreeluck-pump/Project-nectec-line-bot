//firestore
var admin = require("firebase-admin");

//เรียกคำแนะนำจากผู้เชี่ยวชาญ
async function callComment(userId) {

    try {
        var comment = " "
        await admin.firestore().collection("users").doc(userId).collection('comment').orderBy("timestamp", "desc").limit(1).get()
            .then(snapshot => {
                snapshot.forEach(doc => {

                    comment = doc.data().comment

                });
            })

        return comment


    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    'callComment': callComment
}