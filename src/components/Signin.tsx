import React, { useState } from "react";
import { firebase } from "../initFirebase";

function Signin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [token, setToken] = useState<string>("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setEmail(value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPassword(value);
    };

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log("사용자 정보: ", user);

                user?.getIdToken(true).then((idToken) => {
                    setToken(idToken);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    };

    return (
        <>
            <div>
                <h2>로그인</h2>
                <form onSubmit={handleSignIn}>
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
                <p>{token}</p>
            </div>
        </>
    );
}

export default Signin;
