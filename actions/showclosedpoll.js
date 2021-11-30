const { errorHandler } = require('../helpers')

function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
    }
    return myArray;
}

module.exports = () => async (ctx) => {
    if (ctx.chat.type != "private") return
    try {
        pollId = ctx.update.callback_query.data.split(";")[1]
        ctx.deleteMessage().catch(console.log)
        poll = await db.collection("polls").findOne({ _id: pollId })

        await ctx.reply(`
Poll Id - ${pollId}

${poll.pollTitle}

Win Poll - ${poll.winOption}

Closed
`)
    }
    catch (err) {
        errorHandler(err, ctx)
    }

}