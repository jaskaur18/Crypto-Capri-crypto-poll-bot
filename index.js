//Importing Necessary Stuff
///////////////////////////////////////////////////////////////
require("dotenv").config()
const { Telegraf, session, Stage, BaseScene } = require('telegraf')
const { BOT_TOKEN, ADMIN_ID } = process.env
const { db } = require('./db')
const { startCommand, addPollCommand } = require('./commands')
const { captchaAction, enterWalletAction, enterDepositAction,
    VerifyWalletAction, addPollAction, showPollAction, votePollAction, upcommingPollAction, showclosedpollAction } = require('./actions')
const { enterWalletScene, enterPollTextScene, enterPollOptionScene, enterPollTimeScene } = require('./scenes')
const { walletHears, dividendWalletHears, openPollsHears, closedpollsHears, upcommingPollHears } = require('./hears')
const { pollChecker, endPoll } = require('./helpers')
const stage = new Stage();
////////////////////////////////////////////////////////////////

const init = async (bot, db) => {

    /**
     * BaseScene
     */
    enterWallet = new BaseScene('enter-wallet')
    stage.register(enterWallet)
    enterPollTime = new BaseScene('enter-pollTime')
    stage.register(enterPollTime)
    enterPollText = new BaseScene('enter-pollText')
    stage.register(enterPollText)
    enterPollButton = new BaseScene('enter-pollButton')
    stage.register(enterPollButton)


    /**
     * Middlewares
     */
    bot.use(session())
    bot.use(stage.middleware());

    /**
     * Handlers
     */
    // bot.hears(/[\S\s]*/, hearsHandler())
    // bot.on('left_chat_member', leftChatMemberHandler())

    /**
     * Actions
     */
    bot.action(/captcha (.*?)/, captchaAction())
    bot.action('enterwallet', enterWalletAction())
    bot.action('verifywallet', VerifyWalletAction())
    bot.action('checkdeposit', enterDepositAction())
    bot.action('addpoll', addPollAction())
    bot.action(/poll;(.*?)/, showPollAction())
    bot.action(/option;(.*?)/, votePollAction())
    bot.action(/upcomming;(.*?)/, upcommingPollAction())
    bot.action(/closed;(.*?)/, showclosedpollAction())

    /**
     * Commands
     */
    bot.start(startCommand())
    bot.command("addpoll", addPollCommand())
    bot.command("cancle", ctx => ctx.scene.leave())

    /**
    * Hears
    */
    // bot.hears(/^\/start (.+[1-9]$)/, referralStart());
    bot.hears("Wallet Balance", walletHears())
    bot.hears("Dividend Earned", dividendWalletHears())
    bot.hears("Open Poll", openPollsHears())
    bot.hears("Closed Poll", closedpollsHears())
    bot.hears("Upcoming Poll", upcommingPollHears())


    /**
     * Scenes
     */
    enterWallet.on('message', enterWalletScene())
    enterPollTime.on('message', enterPollTimeScene())
    enterPollText.on('message', enterPollTextScene())
    enterPollButton.on("message", enterPollOptionScene())

    setTimeout(pollChecker() , 1000)
    setTimeout(endPoll() , 1000)

    return bot
}

/**
 * Init bot function.
 *
 * @param {Telegraf} bot The bot instance.
 * @param {Object} dbConfig The knex connection configuration.
 * @return {Promise<Telegraf>} Bot ready to launch.
 */

//Inilizing Bot
init(new Telegraf(BOT_TOKEN), db)
    .then((bot) => {
        /**
         * Run
         */
        bot.launch(console.log("BOt Started Working"))

        
    })
    .catch(console.log)

module.exports = init