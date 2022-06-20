import { useState } from "react";
import { auth, createUserDocumentFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../utilities/firebase-utils";
import FormInput from "./FormInput";
import '../styles/sign-in-form.scss';
import Button, { BUTTON_TYPE_CLASSES } from "./Button";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const changeHandler = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    const resetForm = () => {
        setFormFields(defaultFormFields);
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        try {

            const {user} = await signInUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            resetForm();

        } catch (error) {

            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password");
                    break;
                case "auth/user-not-found":
                    alert("No User with this Email Found");
                    break;
                default:
                    console.log(error);
            }

        }
    }


    return (
        <div className="sign-up-container">
            <h1>Already have an account?</h1>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={submitHandler}>
                <FormInput label="Email" type="email" onChange={changeHandler} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={changeHandler} name="password" value={password} required />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;