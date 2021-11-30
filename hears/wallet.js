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
    tokenSymbol = process.env.token_symbol
    try {
        userExits = await db.collection("userdata").findOne({
            _id: ctx.from.id
        })
        if (!userExits) return ctx.reply("User Not Found /start To Restart The Bot.")
        if (!userExits.walletAddress)
            return ctx.reply("First Enter Your Wallet Address To Continue", addwalletKeyboard)
        if (!userExits.walletVerify)
            return ctx.reply("Verify Your Wallet Address To Continue", verifywalletKeyboard)
        tokendata = await axios.get(`https://deep-index.moralis.io/api/v2/${userExits.walletAddress}/erc20?chain=bsc`, {
            headers: {
                "Accept": "application/json",
                "X-API-Key": "z4Djr25GYg69of4vra5bVl06MxBALX6mEGlDbv9sTnQr2Ey4dy3WRQl4oKKZXpFg"
            }
        })
        index = await tokendata.data.findIndex(x => x.symbol == tokenSymbol);
        if (index == -1) return ctx.reply("No Token Balance Found!!!")
        tokendata = tokendata.data[index];
        tokenbalance = tokendata.balance
        tokenbalance = tokenbalance.substring(0, tokenbalance.length - 18);
        await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
            $inc: {
                mainBalance: Number(tokenbalance),
            }
        })
        await ctx.reply(`
    Your Balance Of ${tokendata.name} Is ${Number(tokenbalance).toLocaleString()}`)
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}