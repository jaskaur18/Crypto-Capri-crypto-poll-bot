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

        if (poll.pollActive == "false"){
            return ctx.reply(`
 ${poll._id}

${poll.pollTitle}

Win Poll Option - 

Closed
            `)
        }

        options = poll.options.split(",")
        optiondata = options.map(e => {
            return { text: e, callback_data: `option;${pollId};${e}` };
        })
        optiondata = chunkArrayInGroups(optiondata, 2)
        await ctx.reply(`
Poll Id - ${pollId}

${poll.pollTitle}`, {
            reply_markup: {
                inline_keyboard: optiondata,
            },
        })
    }
    catch (err) {
        errorHandler(err, ctx)
    }

}