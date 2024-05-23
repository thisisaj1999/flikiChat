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

function convertToReadableDays(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays <= 29) {
    if (diffDays === 2) {
      return '2 days back';
    } else if (diffDays === 3) {
      return '3 days back';
    } else if (diffDays === 5) {
      return '5 days back';
    } else {
      return `${diffDays} days back`;
    }
  } else if (diffDays <= 364) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} back`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} back`;
  }
}

const formatUserNames = (users) => {
  const names = users?.map(user => user.name);
  let formattedNames = names?.join(', ');
  if (formattedNames?.length > 30) {
      formattedNames = formattedNames?.slice(0, 5) + '. . .';
  }
  return formattedNames;
};

const getUserDisplayName = (user, group) => {
  return user?.id === group?.owner_id ? "you" : user?.name;
}

export { getRandomColor, decodeToken, convertToReadableTime, convertToReadableDays, formatUserNames, getUserDisplayName };