import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const history = useNavigate()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/registrationform">
						<button className="btn btn-primary">Sign in</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary mx-2">Login in</button>
					</Link>
					{store?.user&& (
						<Link to="/logout" className="button button-primary button-wide-mobile button-sm" onClick={(e) => {
							e.preventDefault()
							actions.logout(history)
						}}>
							<button className="btn btn-primary mx-2">Logout</button>
						</Link>


					)
					}
				</div>

			</div>
		</nav>
	);
};
