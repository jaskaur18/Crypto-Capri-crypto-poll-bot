const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require("telegram-keyboard")
addPollKeyboard = Keyboard.make([Key.callback("Add Poll","addpoll")]).inline()

module.exports = () => async (ctx) => {
    try {
      await ctx.reply("Click On The Button To Add Poll",addPollKeyboard)
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}