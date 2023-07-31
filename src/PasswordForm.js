import {useState} from "react";
import validatePassword from "./validatePassword";

export default function PasswordForm() {
    const [passwordValue, setPasswordValue] = useState('')
    const [validateResult, setValidateResult] = useState(null)

    const validateClickHandler = () => {
        const verifyMessages = validatePassword(passwordValue)
        setValidateResult(verifyMessages)

        if (validateResult?.length <= 0) {
            setValidateResult(['Password is valid'])
        }
    }

    return (
        <div>
            <form>
                <label>Password:
                    <input
                        type="text"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                </label>
            </form>
            <button onClick={validateClickHandler}>Validate</button>
            <ul>
                { validateResult?.map(it => <li>{ it }</li>) }
            </ul>
        </div>
    )
}