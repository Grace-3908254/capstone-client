import './FormError.scss';

function FormError ({ errorState, field}) {
    return (
        <>
        {errorState && !field && (
               
                <p className='input-error__message'>Uh oh... an error occured X_X</p>
        
        )}
        </>
    )
}

export default FormError;