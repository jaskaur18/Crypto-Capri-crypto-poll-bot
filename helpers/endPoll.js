const moment = require('moment');
const { MongoBatchReExecutionError } = require('mongodb');
module.exports = () => async () => {

    allPolls = await db.collection('polls').find().toArray();

    //Stop All Active Polls

    allPolls.map(async (poll) => {
        pollId = poll._id;
        pollEnded = poll.pollEnded

        if (poll.pollActive == "false") return

        todayTime = moment()
        endTime = moment(pollEnded, "YYYY-MM-DD HH:mm A")
        endPoll = todayTime.diff(endTime, 'hours')

        winOption = poll.dboptionvote
        let sortedOption = winOption.sort((a, b) => b.balance - a.balance)
        let loadOption = sortedOption[0];

        if (endPoll >= 0) {

            await db.collection('polls').updateOne({ _id: poll._id }, {
                $set: {
                    pollActive: "false",
                    winOption: `${loadOption.option}`
                }
            })

        }
    })
}