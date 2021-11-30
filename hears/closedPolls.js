const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require("telegram-keyboard")
const { default: axios } = require('axios')

addwalletKeyboard = Keyboard.make([
    Key.callback("Enter Your Wallet Address", "enterwallet")
]).inline()

verifywalletKeyboard = Keyboard.make([
    Key.callback("Verify Your Wallet Address", "verifywallet")
]).inline()

module.exports = () => async (ctx) => {
    try {
        userExits = await db.collection("userdata").findOne({
            _id: ctx.from.id
        })

        pools = await db.collection("polls").find().limit(10).toArray();

        if (!userExits) return ctx.reply("User Not Found /start To Restart The Bot.")

        if (!userExits.walletAddress)
            return ctx.reply("First Enter Your Wallet Address To Continue", addwalletKeyboard)

        if (!userExits.walletVerify)
            return ctx.reply("Verify Your Wallet Address To Continue", verifywalletKeyboard)
            
        allPoll = []

        pools.map(poll => {
            if (poll.pollActive != "false") return 
            title = poll.pollTitle
            pollId = poll._id
            allPoll.push([{ text: title, callback_data: `closed;${pollId}` }]);
        })

        if (allPoll.length == 0) return ctx.reply("No Closed Poll")

        await ctx.reply(`All Closed Polls`, {
            reply_markup: {
                inline_keyboard: allPoll,
            },
        })
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}