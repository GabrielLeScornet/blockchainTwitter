const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Twitter", function () {

  it("Creation Unique and Multiple Tweets", async function () {

    // Initialisation du contract factory
    const Twitter = await ethers.getContractFactory("Twitter");

    // Deploiement sur la blockChain
    const twitter = await Twitter.deploy();
    await twitter.deployed();

    // Recuperation du couple auteur & adresse pour se connecter
    const [author, addr1] = await ethers.getSigners()

    const tweetTx = await  twitter.connect(addr1).createTweet("1 Tweet");
    await tweetTx.wait();

    let secondTweet = await  twitter.connect(addr1).createTweet("2 Tweet");
    await secondTweet.wait();

    let thirdTweet = await  twitter.connect(addr1).createTweet("3 Tweet");
    await thirdTweet.wait();

    let forthTweet = await  twitter.connect(addr1).createTweet("4 Tweet");
    await forthTweet.wait();

    let fifthTweet = await  twitter.connect(addr1).createTweet("5 Tweet");
    await fifthTweet.wait();

    let sixthTweet = await  twitter.connect(addr1).createTweet("6 Tweet");
    await sixthTweet.wait();

    console.log("Tweets creation ", await twitter.getTweetMap())
  });

  it("Multiple authors", async function () {

    // Initialisation du contract factory
    const Twitter = await ethers.getContractFactory("Twitter");

    // Deploiement sur la blockChain
    const twitter = await Twitter.deploy();
    await twitter.deployed();

    // Recuperation du couple auteur & adresse pour se connecter
    const [author, addr1] = await ethers.getSigners()

    console.log("Multiple authors: ", await twitter.getTweetMap())
  });

  it("Update Tweets", async function () {

    // Initialisation du contract factory
    const Twitter = await ethers.getContractFactory("Twitter");

    // Deploiement sur la blockChain
    const twitter = await Twitter.deploy();
    await twitter.deployed();

    // Recuperation du couple auteur & adresse pour se connecter
    const [author, addr1] = await ethers.getSigners()

    const tweetTx = await  twitter.connect(addr1).createTweet("First Tweet");
    await tweetTx.wait();

    let secondTweet = await  twitter.connect(addr1).createTweet("Deuxième Tweet");
    await secondTweet.wait();

    const udpateTweetF = await twitter.connect(addr1).updateTweet("First Tweet updated", 0);
    await udpateTweetF.wait();
    const udpateTweetS = await twitter.connect(addr1).updateTweet("Second Tweet updated", 1);
    await udpateTweetS.wait();
    console.log("Tweets Updated: ", await twitter.getTweetMap())
  });

  it("Delete Tweets", async function () {

    // Initialisation du contract factory
    const Twitter = await ethers.getContractFactory("Twitter");

    // Deploiement sur la blockChain
    const twitter = await Twitter.deploy();
    await twitter.deployed();

    // Recuperation du couple auteur & adresse pour se connecter
    const [author, addr1] = await ethers.getSigners()

    const tweetTx = await  twitter.connect(addr1).createTweet("1 Tweet");
    await tweetTx.wait();

    let secondTweet = await  twitter.connect(addr1).createTweet("2 Tweet");
    await secondTweet.wait();

    let thirdTweet = await  twitter.connect(addr1).createTweet("3 Tweet");
    await thirdTweet.wait();

    let forthTweet = await  twitter.connect(addr1).createTweet("4 Tweet");
    await forthTweet.wait();

    let fifthTweet = await  twitter.connect(addr1).createTweet("5 Tweet");
    await fifthTweet.wait();

    let sixthTweet = await  twitter.connect(addr1).createTweet("6 Tweet");
    await sixthTweet.wait();

    let deleteTweetTx = await twitter.connect(addr1).deleteTweet(1);
    await deleteTweetTx.wait()

    console.log("Premier supppr res: ", await twitter.getTweetMap())

     deleteTweetTx = await  twitter.connect(addr1).deleteTweet(0);
    await deleteTweetTx.wait()
    console.log("Deuxième suppr res: ", await twitter.getTweetMap())
  });

});
