const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
		},
		actions: {
			// Use getActions to call a function within a fuction

			registerUser: (email, password, history) => {
				fetch("https://3001-4geeksacade-reactflaskh-4cs4gdqo6x4.ws-us82.gitpod.io/register_user", {
					method: "POST",
					body: JSON.stringify({
						email: email,
						password: password
					}),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then(response => response.json())
					.then(data => {
						if (data.registerUser == "ok") {
							history("/login")
						}
					})
					.catch(error => console.log(error))
			},
			login: (email, password, history) => {
				fetch("https://3001-4geeksacade-reactflaskh-4cs4gdqo6x4.ws-us82.gitpod.io/login", {
					method: "POST",
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					headers: {
						"Content-Type": "application/json",
					}
				})
					.then(response => response.json())
					.then(data => {
						if (data.login == "ok") {
							sessionStorage.setItem("user", JSON.stringify(data))
							setStore({
								user: data
							})
							console.log(data)
						}
						history("/private")
					})
			},
			logout: (history) => {
				if (sessionStorage.getItem("user")) {
					sessionStorage.removeItem("user")
					setStore({
						user: null
					})
					history("/login")
				}
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			checkUser: () => {
				if (sessionStorage.getItem("user")) {
					setStore({
						user: JSON.parse(sessionStorage.getItem("user"))
					})
				}
			},
		}
	};
};

export default getState;
