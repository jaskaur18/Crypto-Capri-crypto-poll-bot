const { errorHandler } = require('../helpers')
const { Keyboard } = require("telegram-keyboard")

mainKeyboard = Keyboard.make([
    ["Wallet Balance", "Dividend Earned", "Open Poll"], ["Upcoming Poll", "Closed Poll"]
]).reply()

module.exports = () => async (ctx) => {
    emoji = ctx.update.callback_query.data.split(" ")[1]
    randomnumber = ctx.update.callback_query.data.split(" ")[2]
    if (emoji != randomnumber) return ctx.answerCbQuery("❌ Wrong Captcha", (alert = true));
    ctx.deleteMessage().catch(console.log)
    ctx.reply("Welcome To The Bot", mainKeyboard)
    userExits = await db.collection("userdata").findOne({
        _id: ctx.from.id
    })
    if (!userExits)
        await db.collection("userdata").insertOne({
            _id: ctx.from.id,
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
            userName: ctx.from.username,
            walletVerify: false,
            walletAddress: false,
            mainBalance: 0,
            dividendBalance: 0,
            pollWin: 0,
            pollTotal: 0,
        })
}