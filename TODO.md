When creating new commands:
node deploy-commands.js

When running bot:
node index.js

# Utility
[X] Normalise command names, i.e la, lpl, ls and l for normal commands to make it easier to tell what is a bot command
[ ] Remove the notifications for leaderboards and anything that mentions users
- [X] Leaderboards

# Functionality
## Admin (Deadass need to do heaps with this, but this will come last)
**removeUserScores** This removes all scores from a user [ ] Create this tool
[ ] PL remove
[ ] PL add
[ ] add
[ ] remove

## Score
[ ] Moderation of extreme or impossible scores
- [X] Negative handling
- [X] Extreme score handling
[ ] Female leaderboard variation (Not sure if this is feasible)

**add**
[X] Set permissions to only members or admin
[X] Reconfigure to handle hashing
[X] Update for leaderboard

**remove**
[X] Set permissions to only members or admin
[X] Reconfigure to handle hashing
[X] Update for leaderboard

**user**
[X] Configure to handle hashing

## Powerlifting
[ ] Moderation of extreme or impossible scores
- [X] Negative handling
- [X] Extreme score handling
[X] DOTS leaderboard !!!
[ ] DOTS percentile
[ ] Update *score* leaderboard if PL score is higher than existing score

**add**
[X] Set permissions to only members or admin
[X] Set up database integration
[X] Update for leaderboard (No need)

**remove**
[X] Set permissions to only members or admin
[X] Set up database integration
[X] Update for leaderboard (No need)

**user**
[X] Configure to handle hashing
[ ] Fix handling for new powerlifting leaderboard style

## Utility
[X] Configure scoreLeaderboardInitialiser
[ ] Automatically assign memberships?
[X] Create optimal protein (1.6 - 2.2g/kg)
[X] Create lb/kg conversion
[ ] Create HR zones estimator
[X] BMI calculator