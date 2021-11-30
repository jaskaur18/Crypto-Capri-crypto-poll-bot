const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require("telegram-keyboard")

depositKeyboard = Keyboard.make([Key.callback("Check Deposit", "checkdeposit")]).inline()

module.exports = () => async (ctx) => {
    if (ctx.chat.type != "private") return
    try {
        ctx.deleteMessage().catch(console.log)
        ctx.reply(`
${ctx.from.first_name}
Please Send ${process.env.token_symbol} Token To This Address:  0x6dced58a8310702927036b465c41cecf8b6f2eed
   
Send From The Same Wallet Address You Added In The Bot
   `, depositKeyboard)
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}
