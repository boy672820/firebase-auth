import React from "react";
import { firebase } from "../initFirebase";

export default function UserPersistence() {
    const [customToken, setCustomToken] = React.useState<string>("");

    const handleClick = () => {
        firebase
            .auth()
            .signInWithCustomToken(customToken)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                user?.getIdToken(true).then((idToken) => {
                    console.log(idToken);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCustomToken(e.target.value);
                }}
                value={customToken}
            />
            <button onClick={handleClick}>Custom token persistence</button>
        </div>
    );
}
