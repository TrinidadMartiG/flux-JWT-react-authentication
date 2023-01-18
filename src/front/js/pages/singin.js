import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function RegistrationForm() {

    const history = useNavigate()
    const { store, actions } = useContext(Context)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        actions.registerUser(email, password, history)
    }
    const dealChangeEmail = e => {
        e.preventDefault()
        setEmail(e.target.value)
        console.log(e.target.value, 'dealChange e.target.value')
    }
    const dealChangePassword = e => {
        e.preventDefault()
        setPassword(e.target.value)
        console.log(e.target.value, 'dealChange e.target.value')
    }


    return (
        <>
            <div className="row mt-5">
                <div className="col-lg-4 border border-white m-auto mx-auto text-center">
                    <h2 className="text-center pt-3">Sign up form</h2>
                    {/* Form start */}
                    <form id="form" action="#" className="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                            <input type="email" class="form-control" placeholder="Example@mail.com" value={email} onChange={dealChangeEmail} aria-label="Email" aria-describedby="basic-addon1" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                            <input type="password" id="inputPassword6" class="form-control" value={password} onChange={dealChangePassword} placeholder="*******" aria-label="password" aria-describedby="passwordHelpInline" />
                        </div>

                        <button className="btn btn btn-dark my-2" onClick={handleSubmitLogin}> Sign up! </button>
                        <br />
                        <Link to="/" className="btn btn btn-dark my-2">Back to Home</Link>
                    </form>
                </div>
            </div>
        </>
    )
};

export default RegistrationForm;