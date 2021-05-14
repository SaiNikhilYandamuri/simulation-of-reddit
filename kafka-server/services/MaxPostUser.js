const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {
    user_email=msg.user_email
    

    // All communities in which users have commented

    const user_max_post_community= await Post.aggregate(
        [
          
          {
            $group :{
              
                _id:{community:"$communityName", member:"$createdByEmail"},
                count: { $sum: 1 },
                 
            }
          },
          
         ]
         )
         console.log("GOT ALL GRPS",user_max_post_community)
    // Community created by this user

    let all_communities_created= await Community.find({createdBy:user_email},{communityName:1})
    // console.log("All users created by community:",all_communities_created)
    console.log("All my communities",all_communities_created)

    result=[]
    
    for(let i=0;i<all_communities_created.length;i++)
    {
        for(let j=0;j<user_max_post_community.length;j++)
        {
            if(all_communities_created[i].communityName==user_max_post_community[j]._id.community)
            {
                result.push(user_max_post_community[j])
            }
        }
    }
         console.log("Printing result",result)

         result.sort((a,b) => {

            return a.count<b.count? 1:-1
    
        })

        let first_element=result.shift()
        console.log("Got first element",first_element)

    callback(null, first_element);
  }
  
  exports.handle_request = handle_request;
