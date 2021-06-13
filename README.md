# Simulation-Of-Reddit
<p align="center">  
  <img  align="center" src="https://github.com/SaiNikhilYandamuri/simulation-of-reddit/blob/main/client/src/components/resources/redditImage.PNG">
</p>

 To gain a better understanding of the inner workings, tools and technologies used to develop a distributed full-stack application/product. 

## What it does
We have simulated various features present in the original web application like
1) The user can signup and login to the system.
2) The user can view posts of communities he is part of on the home/dashboard page.
3) The user can create his own community and invite members to join a community.
4) The user can create a post in any community he is part of.
5) The user can upvote or downvote a post.
6) The user can add comments to a post and can also upvote or downvote a comment.
7) The user can approve invites for the people who have requested to join the community.
8) A messaging application was built to implement chat feature.
9) User can look into various analytics related to community, posts etc.

## How it was built
1) Designed 3-tier distributed/scalable web application using message queues, caching, and connection pooling to improve throughput by approximately 70% as opposed to    traditional backend implementations.
2) Implemented the Frontend in ReactJS  
3) Used React Testing Library to write frontend tests and Mocha to write backend tests to see if system functions as expected.
4) Deployed the application on AWS EC2 instances to leverage easy scalability the cloud platform has to offer. 
5) Organized the development lifecycle to mimic real world version control and agile methodologies. 

## Features

## Tools used 
 ReactJS, NodeJS, ExpressJS, Mongo DB, MySQL, HTML5, PassportJS, Apache Kafka, Redis Caching

## Prerequisites
Before running this locally you must have Node,Apache Kafka (version 2.11),Zookeeper,Redis, MySQL,MongoDB etc.setup. 

## Challenges we ran into
Tricky to implement Kafka for such a large scale application. Multiple zookepers would be needed to ensure smooth functioning.
Integration of various modules led to various merge conflicts.
A larger cloud instance (more then t2. micro capacity) would be needed to ensure a decent reponse time from system.

## Future Scope
Multiple image upload functionality while creating post
Ability to create subreddits.
More granularity in community moderations page.

### Kindly refer to project report for further details
