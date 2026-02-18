const pending = new Map();

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