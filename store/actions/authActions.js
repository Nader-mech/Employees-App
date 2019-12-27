export const SIGN_UP = 'SIGN_UP';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT = 'LOGOUT';
export const LOGINED_USER = 'LOGINED_USER';


import { AsyncStorage } from 'react-native';

export const signUp = (email, password, imageUrl) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzfI6phTw6VUAgyIzVx9UUmnOzrzJliUo',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);

		const resData = await response.json();
		if (!response.ok) {
			const errorId = resData.error.message;
			let messaage = 'Something went wrong';
			if (errorId === 'EMAIL_EXISTS') {
				messaage = 'This email exist';
			} else if (errorId === 'INVAILD_PASSWORD') {
				messaage = 'This password is invalid';
			}
			throw new Error(messaage);
		}



		dispatch({ type: SIGN_UP, userData: { token: resData.idToken, userId: resData.localId, name: resData.email, image: imageUrl } });
		await saveDataToStorage(resData.idToken, resData.localId, resData.email, imageUrl);
	};
};

export const Login = (email, password, imageUrl) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzfI6phTw6VUAgyIzVx9UUmnOzrzJliUo',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);
		
		
		const resData = await response.json();

		if (!response.ok) {
			const errorId =  resData.error.message;
			let messaage
			if (errorId === 'EMAIL_NOT_FOUND') {
				messaage = 'This email is invalid';
			} else if (errorId === 'INVALID_PASSWORD') {
				messaage = 'This password is invalid';
			}
			throw new Error(messaage);
		}
		


		dispatch({
			type: LOGIN_USER,
			userData: { token: resData.idToken, userId: resData.localId, name: resData.email, image: imageUrl }
		});
		await saveDataToStorage(resData.idToken, resData.localId, resData.email, imageUrl);
	};
};

export const logOut = () => {
	return async (dispatch) => {
		await AsyncStorage.removeItem('userData');
		dispatch({ type: LOGOUT });
	};
};


export const loginedUser = () => {
	return async (dispatch) => {
		const userData = await AsyncStorage.getItem('userData');

		dispatch({ type: LOGINED_USER, userData: JSON.parse(userData) })
	}
}

const saveDataToStorage = async (token, userId, name, image) => {
	await AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token: token,
			userId: userId,
			name,
			image
		})
	);
};
