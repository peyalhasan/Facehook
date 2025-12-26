import React from 'react';
import Field from '../common/Field'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';



const RegistrationForm = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const submitForm = async (formData) => {
       
        try {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);
            
            if (response.status === 201) {
                navigate('/login')
            }
        } catch (error) {
            setError('root.random', {
                type: 'random',
                message: `Something went wrong: ${error.message}`
            })
        }
    }

    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]" onSubmit={handleSubmit(submitForm)}>
            <Field label='First Name' error={errors.firstName}  >
                <input
                    {...register('firstName', { required: "First Name id is required" })}
                    className={`auth-input ${errors.firstName ? 'border-red-600' : 'border-gray-200'} `}
                    type="firstName" name="firstName" id="firstName" placeholder='Enter your First Name' />
            </Field>
            <Field label='Last Name' error={errors.lastName}  >
                <input
                    {...register('lastName')}
                    className={`auth-input ${errors.lastName ? 'border-red-600' : 'border-gray-200'} `}
                    type="lastName" name="lastName" id="lastName" placeholder='Enter your Last Name' />
            </Field>
            <Field label='Email' error={errors.email}  >
                <input
                    {...register('email', { required: "Email id is required" })}
                    className={`auth-input ${errors.email ? 'border-red-600' : 'border-gray-200'} `}
                    type="email" name="email" id="email" placeholder='Enter your emaial address' />
            </Field>

            <Field label='Password' error={errors.password} >
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
            <p>{errors?.root?.random?.message}</p>

            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Register
                </button>
            </Field>
        </form>
    );
};

export default RegistrationForm;