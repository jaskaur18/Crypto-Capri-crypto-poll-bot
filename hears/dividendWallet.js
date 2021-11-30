const { errorHandler } = require("../helpers")
const { default: axios } = require("axios")
const { Keyboard, Key } = require("telegram-keyboard")

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
        if (!userExits) return ctx.reply("User Not Found /start To Restart The Bot.")
        if (!userExits.walletAddress)
            return ctx.reply("First Enter Your Wallet Address To Continue", addwalletKeyboard)
        if (!userExits.walletVerify)
            return ctx.reply("Verify Your Wallet Address To Continue", verifywalletKeyboard)
        transData = await axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${process.env.token_contract}&address=${userExits.walletAddress}&page=1&offset=5&startblock=0&endblock=999999999&sort=desc&apikey=${process.env.bscScan_api_key}`)
        value = 0
        tokenName = "None"
        await transData.data.result.map(tran => {
            valuetoken = tran.value
            decimals = "0".repeat(tran.tokenDecimal);
            earlytotal = "1" + decimals;
            total = valuetoken / earlytotal;
            value += total
            tokenName = tran.tokenSymbol
        })
        await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
            $inc: {
                dividendBalance: Number(value),
            }
        })
        await ctx.reply(`Your Dividend Balance Of ${tokenName} Is - ${value}`)
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}