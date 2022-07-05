//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Twitter {
    struct Tweet {
        string text;
        address author;
        uint256 date;
        uint256 tweetId;
        bool isDeleted;
    }

    mapping(uint256 => Tweet) tweetMap;
    uint256 _countAllTweets;
    uint256 _countUnDeletedTweets;

    function getTweetMap() public view returns (Tweet[] memory) {
        Tweet[] memory ret = new Tweet[](_countAllTweets);
        uint256 j = 0;
        for (uint256 i = 0; i < _countAllTweets; i++) {
           ret[j] = tweetMap[i];
        }
        return ret;
    }

    // Creer un tweet avec le texte en parametre
    function createTweet(string memory text) public {

        // Assignation dans la map de tweets du nvx tweet et de ses attributs
        tweetMap[_countAllTweets].text = text;
        tweetMap[_countAllTweets].author = msg.sender;
        tweetMap[_countAllTweets].date = block.timestamp;
        tweetMap[_countAllTweets].isDeleted = false;

        // Les tweets sont triés par date en leur associant un id qui grandit
        // de 1 a chaque nouveau tweet.
        tweetMap[_countAllTweets].tweetId = _countAllTweets;

        _countUnDeletedTweets += 1 ;
        _countAllTweets += 1;
    }

    function updateTweet(string memory updatedText, uint256 tweetId) public {

        // Verification de l'acces au tweet
        require(tweetMap[tweetId].date != 0, "Tweet should exist");
        require(tweetMap[tweetId].author == msg.sender,"Tweet should be yours");

        // Modifidification du tweet trouvé et mise a jours de la date :
        // Nous conservons le meme ordre, le tweetId informant sur la
        // chronologie inital des tweets et l'heure date la plus récente
        tweetMap[tweetId].text = updatedText;
        tweetMap[tweetId].date = block.timestamp;
    }

    function deleteTweet(uint256 tweetId) public {
        require(tweetId < _countAllTweets, "Tweet does not exist");
        require(msg.sender == tweetMap[tweetId].author,
            "You must be tweet owner to delete tweet"
        );

        // On attribut au tweet supprimer une date a 0, ne l'affichant pas
        //  mais gardé en donnée avec un flag isDeleted (permettant l'affichage
        // des tweets supprimés)
        if (tweetId != _countAllTweets - 1) {
            tweetMap[tweetId].isDeleted = true;
        }
        _countUnDeletedTweets -= 1;

    }
}

