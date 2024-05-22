module.exports = (io, socket) => {
	const createGroup = (payload) => {
		console.log(payload);
	};

	const getGroup = (orderId, callback) => {
		console.log(orderId, callback);
	};

	return {
		createGroup,
		getGroup,
	};
};
