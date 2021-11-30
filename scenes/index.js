const enterWallet = require('./enterWallet')
const enterPollText = require('./enterPollText')
const enterPollOption = require('./enterPollOption')
const enterPollTime = require('./enterPollTime')

module.exports = {
    enterWalletScene: enterWallet,
    enterPollTextScene: enterPollText,
    enterPollOptionScene: enterPollOption,
    enterPollTimeScene: enterPollTime,
}