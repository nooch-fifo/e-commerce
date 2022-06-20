import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUserDocumentFromAuth } from "../utilities/firebase-utils";
import FormInput from "./FormInput";
import '../styles/sign-up-form.scss';
import Button from "./Button";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }


    const resetForm = () => {
        setFormFields(defaultFormFields);
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            // setCurrentUser(user);

            // create User Document for this new user in DB
            await createUserDocumentFromAuth(user, { displayName });
            resetForm();

        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert("Error! User with that email already exists.")
            } else {
                console.log("Error creating the user", error);
            }
        }
    }


    return (
        <div className="sign-up-container">
            <h1>Don't have an account?</h1>
            <span>Sign Up With Your Email and Password</span>
            <form onSubmit={submitHandler}>
                <FormInput label="Display Name" type="text" onChange={changeHandler} name="displayName" value={displayName} required />

                <FormInput label="Email" type="email" onChange={changeHandler} name="email" value={email} required />

                <FormInput label="Password" type="password" onChange={changeHandler} name="password" value={password} required />

                <FormInput label="Confirm Password" type="password" onChange={changeHandler} name="confirmPassword" value={confirmPassword} required />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;