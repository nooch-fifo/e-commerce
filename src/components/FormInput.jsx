import '../styles/form-input.scss';

const FormInput = ({ label, ...inputProps }) => {
    return (
        <div className="group">
            {label && (
                <label className={`${inputProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
            <input className="form-input" {...inputProps} />
        </div>
    )
}

export default FormInput;