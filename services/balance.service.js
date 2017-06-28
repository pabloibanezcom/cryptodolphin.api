const balanceService = {};

balanceService.generate = (portfolio, period) => {
    let result = [];
    result.push(generateBalance(portfolio, new Date()));
    return result;
}

const generateBalance = (portfolio, date) => {
    let balance = { date: date, coins: {}};
    portfolio.transactions.forEach(t => {
        if (t.date < date) {
            processTransaction(balance.coins, t);
        }
    });
    return balance;
}

const processTransaction = (balanceCoins, transaction) => {
    processTransactionCoin(balanceCoins, transaction.coin_src, -(transaction.amount_src));
    processTransactionCoin(balanceCoins, transaction.coin_dst, transaction.amount_dst);
}

const processTransactionCoin = (balanceCoins, coin, amount) => {
    if (balanceCoins[coin] == null) {
        balanceCoins[coin] = 0;
    }
    balanceCoins[coin] = balanceCoins[coin] + amount;
}

module.exports = balanceService;