import { jwtDecode } from 'jwt-decode';

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
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

const convertToReadableTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
};


export { getRandomColor, decodeToken, convertToReadableTime };