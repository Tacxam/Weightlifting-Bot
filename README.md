# Weightlifting-Bot
Bot for the RMIT Lifting Association

# Restraints:
**powerlifting**
- Users can only possess a single score for any particular division, older scores will be overwritten if a new score is submitted.
- Scores that are added, are both inputted into a leaderboard set and entered into a unique user hash. The leaderboard makes it easier to manage scores,
    the user hash makes it easy to find scores submitted by the user.
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