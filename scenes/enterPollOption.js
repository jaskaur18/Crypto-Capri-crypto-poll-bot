const { errorHandler } = require("../helpers");
var randomstring = require("randomstring");

function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
    }
    return myArray;
}

module.exports = () => async (ctx, next) => {
    try {
        ctx.session.pollOption = ctx.message.text
        pollId = randomstring.generate(7);
        options = String(ctx.session.pollOption).split("\n")
        dboptions = options.join(",")

        if (options.length < 2) return ctx.reply("Need 2 or More Option For Poll")

        optiondata = options.map(e => {
            return { text: e, callback_data: `option;${pollId};${e}` };
        })
        i = 1
        dboptionvote = []
        options.map(e => dboptionvote.push({ balance: 0, vote: 0, option: e }))
        console.log(dboptionvote);

        optiondata = chunkArrayInGroups(optiondata, 2)

        pollstartedOn = String(ctx.session.pollTime).split("\n")[0]
        pollendedOn = String(ctx.session.pollTime).split("\n")[1]

        await db.collection("polls").insertOne({
            _id: pollId,
            pollActive: `${pollstartedOn}`,
            pollTitle: ctx.session.pollText,
            pollStarted: `${pollstartedOn}`,
            pollEnded: `${pollendedOn}`,
            winOption: "None",
            options: dboptions,
            dboptionvote,
        })

        await ctx.reply(`Great Poll Has Been Created Poll Id - ${pollId}`)

        await ctx.reply(`${ctx.session.pollText}`, {
            reply_markup: {
                inline_keyboard: optiondata,
            },
        })

        ctx.scene.leave();
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}