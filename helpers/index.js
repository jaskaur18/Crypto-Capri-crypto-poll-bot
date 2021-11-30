const { inspect } = require('util')
const  pollChecker  = require('./pollCheker')
const  endPoll  = require('./endPoll')

// eslint-disable-next-line no-console
const debug = (err, ctx) => {
  console.log(err);
  ctx.reply("Oh Error Happened 😢.").catch(console.error);
  ctx.telegram
    .sendMessage(
      process.env.ADMIN_ID,
      `
Error Happned ${ctx.from.first_name}
Id - ${ctx.from.id} Username - @${ctx.from.username}
  
${err}
  `
    )
    .catch(console.error);
}

// eslint-disable-next-line no-console
const errorHandler = (error, ctx) => debug(error, ctx)


module.exports = {
  debug,
  errorHandler,
  pollChecker,
  endPoll,
}