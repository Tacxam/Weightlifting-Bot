
# Utility
[ ] addChoices for reload command for every command

# Functionality

## Score
[X] addScore needs to store to a DB
[X] delScore needs to delete from a DB
[X] Create score confirmation functionality with pendingSubmission.js
[X] addScore implement confirmation
[X] **fix** addScore "Submission expired message" even after successful submission
[X] delScore implement confirmation
[X] adminDelScore implement confirmation
[X] user implement functionality
[ ] leaderboard implement functionality
[ ] distinguish male/female user scores (or open leaderboard)
		Condition: If users submit scores without a division, it will automatically be placed into an open division.
							 If users enter a division after submitting scores, their previous scores will be pushed into the new division

# Powerlifting
[ ] DOTS calculations

## Admin
[X] Set permissions considerations (only for admins)

## Utility
[ ] Implement a function for users to understand what bot's purpose is
[ ] reload command autofill, make make it so it auto reads all the files in the commands directory
[?] **fix** reload command for subcommands

## Scalability
[X] Isolate handlers by function, ! Use collectors now
[X] Configure subcommands