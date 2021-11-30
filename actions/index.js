const captchaAction = require('./captcha')
const enterWalletAction = require('./enterWallet')
const VerifyWalletAction = require("./verifyWallet")
const enterDepositAction = require('./depositWallet')
const addPollAction = require('./addpoll')
const showPollAction = require('./showPoll')
const votePollAction = require('./votePoll')
const upcommingPollAction = require('./upcommingPoll')
const showclosedpollAction = require('./showclosedpoll')

module.exports = {
    captchaAction,
    enterWalletAction,
    enterDepositAction,
    VerifyWalletAction,
    addPollAction,
    showPollAction,
    votePollAction,
    upcommingPollAction,
    showclosedpollAction,
}