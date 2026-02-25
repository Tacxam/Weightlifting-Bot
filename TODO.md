
# Utility
[ ] addChoices for reload command for every command

# Functionality

## Leaderboard
[X] addScore needs to store to a DB
[X] delScore needs to delete from a DB
[ ] Create score confirmation functionality with pendingSubmission.js
[X] addScore implement confirmation
[X] **fix** addScore "Submission expired message" even after successful submission
[X] delScore implement confirmation
[ ] adminDelScore implement confirmation

# Powerlifting
[ ] DOTS calculations

## Admin
[ ] Set permissions considerations (only for admins)
[ ] Set autofill for users that have submitted scores

## Utility
[ ] Implement a function for users to understand what bot's purpose is
[ ] reload command autofill, make make it so it auto reads all the files in the commands directory
[?] **fix** reload command for subcommands

## Scalability
[X] Isolate handlers by function, ! Use collectors now
[X] Configure subcommands