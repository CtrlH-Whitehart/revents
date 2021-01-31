import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInUser } from './authAction';
import { registerInFirebase, signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='Register to Re-vents'>
			<Formik
				initialValues={{ displayName: '', email: '', password: '' }}
				validationSchema={Yup.object({
					displayName: Yup.string().required(),
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await registerInFirebase(values);
						dispatch(closeModal());
					} catch (error) {
                        setErrors({ auth: error.message})
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty, errors }) => (
					<Form className='ui form'>
						<CustomTextInput
							name='displayName'
							placeholder='Display Name'
						/>
						<CustomTextInput
							name='email'
							placeholder='Email Address'
						/>
						<CustomTextInput
							name='password'
							placeholder='Password'
							type='password'
						/>
                        {errors.auth && (
							<Label
                                basic
                                key='red'
								color='red'
								style={{ marginBottom: 10 }}
								content={errors.auth}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Register'
						/>
						<Divider horizontal>Or</Divider>
						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
