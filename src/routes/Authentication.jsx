import SignInForm from '../components/Sign-InForm';
import SignUpForm from '../components/Sign-UpForm';
import '../styles/login.scss';

const Login = () => {
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Login;