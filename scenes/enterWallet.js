const { errorHandler } = require("../helpers");
const { Keyboard, Key } = require("telegram-keyboard")


verifywalletKeyboard = Keyboard.make([
    Key.callback("Verify Your Wallet Address", "verifywallet")
]).inline()

module.exports = () => async (ctx, next) => {
    try {
        ctx.session.walletaddress = ctx.message.text
        await ctx.reply(`Your Wallet Address - ${ctx.session.walletaddress} Has Been Saved!`)
        await db.collection("userdata").updateOne({ _id: ctx.from.id }, { $set: { walletAddress: ctx.session.walletaddress } })
        await ctx.reply("Now Verify Your Wallet Address To Continue", verifywalletKeyboard)
        ctx.scene.leave();
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}