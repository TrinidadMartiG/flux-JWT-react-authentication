import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function Login() {

    const history = useNavigate()
    const { store, actions } = useContext(Context)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        actions.login(email, password, history)
    }

    const dealChangePassword = e => {
        e.preventDefault()
        setPassword(e.target.value)
        console.log(e.target.value, 'dealChange e.target.value')
    }


    const dealChangeEmail = e => {
        e.preventDefault()
        setEmail(e.target.value)
        console.log(e.target.value, 'dealChange e.target.value')
    }

    return (
        <>
            <div className="row mt-5 ">
                <h2 className="mx-auto text-center p-3">Log in</h2>
                <div className="col-lg-4 border border-white m-auto mx-auto text-center">
                    <form onSubmit={handleSubmitLogin}>
                        <div class="mb-3">
                            <label for="exampleInputUser" class="form-label">Email</label>
                            <input type="text" class="form-control" id="exampleInputUser" value={email} onChange={dealChangeEmail} aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label" >Password</label>
                            <input type="password" class="form-control" value={password} onChange={dealChangePassword} id="exampleInputPassword1" />
                        </div>

                        <button type="submit" class="btn btn-dark">Enter</button>
                    </form>
                    <Link to='/' >
                        <button className="btn btn-dark my-5 ">Back to home</button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Login;