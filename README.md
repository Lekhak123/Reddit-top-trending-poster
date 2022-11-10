# Reddit-top-trending-poster
This discord bot keeps sending top trending stuff from specific subreddits (configured in the subreddit.json) and stores them in a database to avoid repetition. 
- GIT CLONE THIS
- npm i 
1) Go to jsons folder.
2) Open config.json.
3) Add discord bot token to "token.
4) This bot requires a pre made channel to exist on the server (any channel, the bot will try to copy it's properties/permissions, and stay under the same category). Hence, add the channel id to "channel_to_copy".
5) You need to add mongodb url to "mongo_url"  (This program uses mongodb). You might be wondering why I took the hassle of trying to integrate a database into this program when I could have just used a local json file instead. Well... I did that initially and it worked better than expected, but then I decided to use this program in github actions and lost the ability to edit local json. So, heres the small and useless database integration story. 
6) Go to subreddits.json and then add the subreddits that you wanna keep a watch on. example ["a","b","c"]
7) Setup a github action. But set up your repo as private to make sure other don't get your credentials. 
8) You are good to go. 


# I personally have been using this for months and it's working flawlessly (Never expected it to work and to be this useful) 
  ![This was supposed to be a image     ](https://media.discordapp.net/attachments/1025732232255643678/1040305777514119309/image.png?width=473&height=682)
  
I setup a github action for this program in my private repo and every hour or two, the program sends the latest trending stuff from the subreddits of my choice automatically. 
