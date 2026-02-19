const pending = new Map();

// interaction.user.id, { weight, exercise }
function setPending(userId, data) {
	pending.set(userId, { ...data, createdAt: Date.now() });
}

function getPending(userId) {
	return pending.get(userId);
}

function deletePending(userId) {
	pending.delete(userId);
}

module.exports = { setPending, getPending, deletePending };