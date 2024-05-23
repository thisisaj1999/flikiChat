import { jwtDecode } from 'jwt-decode';

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};


const isUserAuthenticated = () => {
	const storedDataString = localStorage.getItem('AuthenticatedUser');
	
	if (storedDataString) {
			const storedData = JSON.parse(storedDataString);
			
			return storedData;
	}
	
	return false;
};


const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export { getRandomColor, decodeToken, isUserAuthenticated };