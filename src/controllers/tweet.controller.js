import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body;
    if(!content?.trim()) {
        throw new ApiError(400, "All fields are required")
    }
    
    const tweet = await Tweet.create({
        content: content.trim(),
        owner: req?.user._id
    })

    return res.status(201).json(
        new ApiResponse(201, tweet, "Tweet created successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const{userId} = req.params;
    if(!isValidObjectId(userId)) {    
        throw new ApiError(400, "User Id does not exist")
    }
    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found")
    }

    const tweets = await Tweet.find({
        owner: userId
    }).populate("owner", "username")

    return res.status(200).json(
        new ApiResponse(200, tweets, "Tweets fetched successfully")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params;
    if(!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Tweet Id does not exist")
    }
    const tweet = await Tweet.findById(tweetId);
    if(!tweet) {
        throw new ApiError(404, "Tweet not found")
    }
    await tweet.deleteOne();
    return res.status(200).json(    
        new ApiResponse(200, {}, "Tweet deleted successfully")    
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
