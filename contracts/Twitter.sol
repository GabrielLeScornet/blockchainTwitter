//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Twitter {
    struct Tweet {
        string text;
        address author;
        uint256 date;
        uint256 tweetId;
    }

    mapping(uint256 => Tweet) tweetMap;
    uint256 _countTweets;


    event TweetModified(address owner, uint256 tweetId);
    event TweetCreated(address owner, uint256 tweetId);
    event TweetDeleted(address owner, uint256 tweetId);

    constructor() {}

    function getTweetMap() public view returns (Tweet[] memory) {
        Tweet[] memory ret = new Tweet[](_countTweets);
        for (uint256 i = 0; i < _countTweets; i++) {
            ret[i] = tweetMap[i];
        }
        return ret;
    }

    function createTweet(string memory text) public {
        tweetMap[_countTweets].text = text;
        tweetMap[_countTweets].author = msg.sender;
        tweetMap[_countTweets].date = block.timestamp;
        tweetMap[_countTweets].tweetId = _countTweets;

        emit TweetCreated(msg.sender, _countTweets);

        _countTweets += 1;
    }

    function updateTweet(string memory newtext, uint256 tweetId) public {
        require(tweetMap[tweetId].date != 0, "Tweet should exist");
        require(
            tweetMap[tweetId].author == msg.sender,
            "Tweet should be your own / exist"
        );

        tweetMap[tweetId].text = newtext;
        tweetMap[tweetId].date = block.timestamp;

        emit TweetModified(msg.sender, tweetId);
    }

    function deleteTweet(uint256 tweetId) public {
        require(tweetId < _countTweets, "Tweet does not exist");
        require(
            msg.sender == tweetMap[tweetId].author,
            "You must be tweet owner to delete tweet"
        );

        if (tweetId != _countTweets - 1) {
            tweetMap[tweetId] = tweetMap[_countTweets - 1];
            tweetMap[tweetId].tweetId = tweetId;
        }
        _countTweets -= 1;

        emit TweetDeleted(msg.sender, tweetId);
    }
}
