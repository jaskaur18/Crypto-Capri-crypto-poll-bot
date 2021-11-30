const { errorHandler } = require('../helpers')
const { Keyboard } = require("telegram-keyboard")

mainKeyboard = Keyboard.make([
    ["Wallet Balance", "Dividend Earned", "Open Poll"], ["Upcoming Poll", "Closed Poll"]
]).reply()

module.exports = () => async (ctx) => {
    if (ctx.chat.type != "private") return
    ctx.deleteMessage().catch(console.log)
    await ctx.reply("Welcome To The Bot", mainKeyboard)
    userExits = await db.collection("userdata").findOne({
        _id: ctx.from.id
    })
    if (!userExits)
        return ctx.reply("User Not Found /start To Restart The Bot.")
    await ctx.reply("Enter Your Wallet Address ex - Oxa6f79B60659f141df90A0C747395B131cAAfFD12")
    ctx.scene.enter("enter-wallet")

}