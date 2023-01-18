import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const [autorizado, setAutorizado] = useState(false);

    let usertoken = store.user
    
	if (usertoken !== null){
		fetch("https://3001-4geeksacade-reactflaskh-4cs4gdqo6x4.ws-us82.gitpod.io/protected",{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization":"Bearer " + usertoken.token
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log("data", data)
			if (data.msg == "ok"){
				setAutorizado(true)
			} else {
				setAutorizado(false)
			}
		})	
	}

	if (autorizado){
		return (
			<div className="text-center mt-5">
				<h1>This is private!!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>
			</div>
		);
	} else {
		return (
			<div className="text-center mt-5">
				Usuario no autorizado
			</div>
		);
	}
};
