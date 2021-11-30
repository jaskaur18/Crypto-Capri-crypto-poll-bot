const moment = require('moment')
module.exports = () => async () => {

    allPolls = await db.collection('polls').find().toArray();

    //Active All Unactive Polls

    allPolls.map(async (poll) => {
        pollId = poll._id;
        pollStarted = poll.pollStarted

        if (pollStarted == "true" || pollStarted == "false") return

        todayTime = moment()
        startTime = moment(pollStarted, "YYYY-MM-DD HH:mm A")
        startPoll = todayTime.diff(startTime, 'hours')

        if (startPoll >= 0) {

            await db.collection('polls').updateOne({ _id: poll._id }, {
                $set: {
                    pollActive: "true"
                }
            })
            
        }
    })
}