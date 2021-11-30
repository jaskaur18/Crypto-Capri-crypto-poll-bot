const { errorHandler } = require('../helpers')
const { Keyboard } = require("telegram-keyboard")
const axios = require("axios")

module.exports = () => async (ctx) => {
    token_symbol = process.env.token_symbol
    adminwallet = "0xecc4118092de5d26b6c42fdb95fe043c85e19139"
    if (ctx.chat.type != "private") return
    ctx.deleteMessage().catch(console.log)

    await ctx.reply(
        `  Please wait while we are checking your deposit, youâ€™ll get a message as soon the tokens will be in your balance.`
    );

    user = await db
        .collection("userdata")
        .findOne({ _id: ctx.from.id })

    bnbaddress = user.walletAddress;
    url = `https://api.bscscan.com/api?module=account&action=tokentx&address=${bnbaddress}&startblock=0&endblock=999999999&page=1&offset=5&sort=desc&apikey=${process.env.bscScan_api_key}`;
    getdata = await axios.get(url);
    ctx.deleteMessage().catch(console.log)
    if (getdata.data.status == 0) return ctx.reply("No Transaction Found");
    tokenSymbol = getdata.data.result[0].tokenSymbol;
    toaddress = getdata.data.result[0].to;
    transhash = getdata.data.result[0].hash;
    transshash = await db
        .collection("transhash")
        .findOne({ transactionhash: transhash });
    if (tokenSymbol != token_symbol)
        return ctx.reply("No Transaction Found22");
    if (
        toaddress.toLowerCase() != `${adminwallet}`.toLowerCase() &&
        transshash != null
    ) return ctx.reply("No Transaction  Found 3");

    ctx.reply("Wallet Successfully Verified");

    await db
        .collection("transhash")
        .insertOne({ transactionhash: transhash });

    await db
        .collection("userdata")
        .updateOne(
            { _id: ctx.from.id },
            { $set: { walletVerify: true } }
        );
}
