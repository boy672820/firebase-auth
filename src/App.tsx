import React, { useState } from "react";
import "./App.css";
import Signin from "./components/Signin";
import UserPersistence from "./components/UserPersistence";
import { firebase } from "./initFirebase";

function App() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    React.useEffect(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }, []);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setEmail(value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPassword(value);
    };

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                user?.getIdToken(true).then((idToken) => {
                    console.log("Created new user!", idToken);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });
    };

    const handleVerify = () => {
        const user = firebase.auth().currentUser;

        user?.sendEmailVerification()
            .then(function () {
                // Email sent.
            })
            .catch(function (error) {
                // An error happened.
            });
    };

    return (
        <>
            <div>
                <h2>회원가입</h2>
                <form onSubmit={handleSignUp}>
                    <div>
                        <input
                            type="text"
                            onChange={handleEmail}
                            value={email}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            onChange={handlePassword}
                            value={password}
                        />
                    </div>
                    <button type="submit">submit</button>
                </form>

                <button type="button" onClick={handleVerify}>
                    Verify
                </button>
            </div>

            <Signin />

            <UserPersistence />
        </>
    );
}

export default App;
