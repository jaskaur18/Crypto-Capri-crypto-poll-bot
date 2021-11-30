const { db } = require('../db')
const { errorHandler } = require('../helpers')
const axios = require('axios')

module.exports = () => async (ctx) => {
    if (ctx.chat.type != "private") return
    try {
        tokenSymbol = process.env.token_symbol
        poll_data = (ctx.update.callback_query.data).split(";")
        pollId = poll_data[1]
        pollOption = poll_data[2]
        ctx.deleteMessage().catch(console.log)
        
        userExits = await db.collection("userdata").findOne({
            _id: ctx.from.id
        })

        if (!userExits)
            return ctx.reply("User Not Found /start To Restart The Bot.")

        user_poll = await db.collection(`poll_${pollId}`).findOne({
            _id: ctx.from.id
        })

        if (user_poll != undefined) return ctx.answerCbQuery("You Have Aldready Participated In The Poll", (alert = true))
        
        tokendata = await axios.get(`https://deep-index.moralis.io/api/v2/${userExits.walletAddress}/erc20?chain=bsc`, {
            headers: {
                "Accept": "application/json",
                "X-API-Key": "z4Djr25GYg69of4vra5bVl06MxBALX6mEGlDbv9sTnQr2Ey4dy3WRQl4oKKZXpFg"
            }
        })

        index = await tokendata.data.findIndex(x => x.symbol == tokenSymbol);
        if (index == -1) return ctx.reply("No Token Balance Found!!!")
        tokendata = tokendata.data[index];
        await ctx.reply(`Voted On - ${pollId} Option - ${pollOption}`)

        await db.collection("polls").updateOne({ _id: pollId }, {
            $inc: {
                [`polldata.vote${pollOption}`]: 1,
                [`polldata.balance${pollOption}`]: Number(tokendata.balance),
            }
        })

        await db.collection(`poll_${pollId}`).insertOne({
            _id: ctx.from.id,
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
            username: ctx.from.username
        })

        await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
            $inc: {
                mainBalance: Number(tokendata.balance),
                pollTotal: 1,
            }
        })
    }
    catch (err) {
        errorHandler(err, ctx)
    }

}