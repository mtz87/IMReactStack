/*
This file contains all constants in the app.
*/

module.exports = {
	//ABOUT MEMBERS
	GET_MEMBERS:'GET_MEMBERS',
	REMOVE_MEMBER:'REMOVE_MEMBER',
	ADD_MEMBER: 'ADD_MEMBER',
	INIT_MEMBERS_LIST: 'INIT_MEMBERS_LIST',

	//AUTH
	LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
	LOGIN_USER_SUCCESS:'LOGIN_USER_SUCCESS',
	LOGIN_USER_FAILURE:'LOGIN_USER_FAILURE',
	LOGOUT_USER:'LOGOUT_USER',

    //LANG
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

	//TRANSITIONS
	TRANSITION: 'TRANSITION',
	ENABLE_SCENES: 'ENABLE_SCENES',
	DISABLE_SCENES: 'DISABLE_SCENES',

	//UI
	MEDIA: 'MEDIA',
	breakpoint: {
		names: {
			large: 'large',
			medium: 'medium',
			small: 'small',
			none: 'none',
		},
		large: 1025,
		medium: 640,
	},
};
