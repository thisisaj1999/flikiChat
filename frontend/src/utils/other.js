
const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const storeUserData = (response) => {
	const userData = response?.data;

	const authenticatedUser = {
			...userData,
			isAuth: true  
	};

	const userDataString = JSON.stringify(authenticatedUser);

	localStorage.setItem('AuthenticatedUser', userDataString);
};


const isUserAuthenticated = () => {
	const storedDataString = localStorage.getItem('AuthenticatedUser');
	
	if (storedDataString) {
			const storedData = JSON.parse(storedDataString);
			
			return storedData.isAuth === true;
	}
	
	return false;
};



export { getRandomColor, storeUserData, isUserAuthenticated };