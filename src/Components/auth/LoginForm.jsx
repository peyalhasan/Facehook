import React from 'react';
import Field from '../common/Field'
import { useForm } from 'react-hook-form';


const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitForm = (formData) => {
        console.log(formData)
    }


    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]" onSubmit={handleSubmit(submitForm)}>
            <Field label='Email'  >
                <input
                    {...register('email', { required: "Email id is required" })}
                    className={`auth-input ${errors.email ? 'border-red-600' : 'border-gray-200'} `}
                    type="emil" name="emil" id="emil" placeholder='Enter your email address' />
            </Field>

            <Field label='Password'  >
                <input
                    {...register('password', {
                        required: "Password id is required",
                        minLength: {
                            value: 8,
                            message: 'Your password must be at least 8 characters'
                        }
                    })}
                    className={`auth-input ${errors.password ? 'border-red-600' : 'border-gray-200'} `}
                    type="emil" name="password" id="password" placeholder='Enter your password' />
            </Field>

            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
};

export default LoginForm;