const StarNotary = artifacts.require("StarNotary");
const truffleAssert = require('truffle-assertions');

var accounts;
var owner;
var lastTokenId;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
    lastTokenId = 0;
});

function nextTokenId() {
    return lastTokenId++;
}

it('can Create a Star', async() => {
    let tokenId = nextTokenId();
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = nextTokenId();
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('Awesome Star!', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = nextTokenId();
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = nextTokenId();
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = nextTokenId();
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

describe('token name and symbol metadata', () => {
    it('name() should return the token name', async () => {
        let instance = await StarNotary.deployed();
        let name = await instance.name();
        assert.equal(name, 'DJ Star Token')
    })
    it('symbol() should return the token symbol', async () => {
        let instance = await StarNotary.deployed();
        let symbol = await instance.symbol();
        assert.equal(symbol, 'DJST')
    })
})

describe('function lookUptokenIdToStarInfo()', () => {
    it('should return the star name given a valid token id', async () => {
        // Create a Star with different name and tokenId
        let starName = 'JensenStar'
        let tokenId = nextTokenId();
        let instance = await StarNotary.deployed()
        await instance.createStar(starName, tokenId, {from: owner})
        // Call the lookUptokenIdToStarInfo function
        let starNameLookup = await instance.lookUptokenIdToStarInfo(tokenId)
        // Verify the Star name lookup is the same name
        assert.equal(starName, starNameLookup)
    })
    it('should return an empty string given a non-existant token id', async () => {
        let instance = await StarNotary.deployed()
        let starNameLookup = await instance.lookUptokenIdToStarInfo(9999999)
        assert.equal('', starNameLookup)
    })
});

describe('function exchangeStars()', () => {
    let user1;
    let user2;
    let tokenId1;
    let tokenId2;
    let instance;
    beforeEach(async () => {
        user1 = accounts[1];
        user2 = accounts[2];
        tokenId1 = nextTokenId();
        tokenId2 = nextTokenId();
        // Create 2 Stars with different names and tokenIds
        instance = await StarNotary.deployed()
        await instance.createStar('StarA',tokenId1,{from: user1})
        await instance.createStar('StarB',tokenId2,{from: user2})
    })
    it('lets 2 users exchange stars', async() => {
        // Call the exchangeStars functions implemented in the Smart Contract
        await instance.exchangeStars(tokenId1, tokenId2, {from: user1})
        // Verify that the owners have swapped
        // (tokenId1 is owned by user1 / tokenId2 is owned by user2)
        assert.equal(await instance.ownerOf.call(tokenId1), user2);
        assert.equal(await instance.ownerOf.call(tokenId2), user1);
    });
    it('rejects if the call is made by a user that does not own either star', async() => {
        // Get a users account that does not own either star being exchanged
        let user3 = accounts[3];
        // Assert that the exchangeStars call is reverted with the expected message
        await truffleAssert.reverts(
            instance.exchangeStars(tokenId1, tokenId2, {from: user3}),
            "You can't exchange a Star you don't own"
        );
    })
});

describe('function transferStar()', () =>{
    let newOwner;
    let tokenId;
    beforeEach(async () => {
        newOwner = accounts[1];
        tokenId = nextTokenId();
        instance = await StarNotary.deployed();
        // Create a Star with different tokenId
        await instance.createStar('A Star to Transfer later!', tokenId, {from: owner})
    })
    it('lets a user transfer a star', async() => {
        // Use the transferStar function implemented in the Smart Contract
        await instance.transferStar(newOwner, tokenId, {from: owner})
        // Verify the star owner changed.
        let newOwnerOfStar = await instance.ownerOf(tokenId)
        assert.equal(newOwnerOfStar, newOwner)
    });
    it('rejects if the call is made by a user that does not own the star', async() => {
        // Get a users account that does not own star being transfered
        let user3 = accounts[3];
        // Assert that the exchangeStars call is reverted with the expected message
        await truffleAssert.reverts(
            instance.transferStar(newOwner, tokenId, {from: user3}),
            "You can't transfer a Star you don't own"
        );
    })
})