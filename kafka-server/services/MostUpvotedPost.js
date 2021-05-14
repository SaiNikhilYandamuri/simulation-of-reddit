const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {
    user_email=msg.user_email
    

    // All posts user has created

    let all_posts= await Post.find({},{postTitle:1,createdByEmail:1,communityName:1,numberOfUpvotes:1})
    console.log(all_posts)

    let all_communities_created= await Community.find({createdBy:user_email},{communityName:1})
    console.log("All users created by community:",all_communities_created)

    result=[]
    
    for(let i=0;i<all_communities_created.length;i++)
    {
        for(let j=0;j<all_posts.length;j++)
        {
            if(all_communities_created[i].communityName==all_posts[j].communityName)
            {
                result.push(all_posts[j])
            }
        }
    }

    result.sort((a,b) => {

        return a.numberOfUpvotes<b.numberOfUpvotes? 1:-1

    })
    console.log(result)

    console.log("Printing result",result)

    let first_element=result.shift()
    console.log("Got first element",first_element)


    callback(null, first_element);
  }
  
  exports.handle_request = handle_request;
