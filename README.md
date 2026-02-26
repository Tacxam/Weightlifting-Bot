# Weightlifting-Bot
Bot for the RMIT Lifting Association

When creating new commands:
node deploy-commands.js

When running bot:
node index.js

# Commands:
**/s**
- add: adds score to user
- remove: removes score from user
- view: displays exercise leaderboard
- dots: calculates user's DOTS
- user: displays user's lifts

**/admin**
- add: add score to a user
- remove: removes score from a user

# Plans:
Leaderboard:
Users can input scores into a leaderboard:
- Differentiated by weight (Powerlifting)
- Differentiated by gender
- Differentiated by exercise (Major lifts)
- When a user adds a new score, previous scores of the same lift are deleted.
? Might need to archive old scores if a user is only allowed one score and most recent gets deleted.
    might want to retrieve old score and readd it.
- Scores are stored to the user themselves, the leaderboard reflects the cumulation of user scores