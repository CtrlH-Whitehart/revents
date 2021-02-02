import { Form, Formik } from 'formik';
import React from 'react';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { updateUserProfile } from '../../../app/firestore/firestoreService';
import { toast } from 'react-toastify';

export default function ProfileForm({ profile }) {
	return (
		<Formik
			initialValues={{
				displayName: profile.displayName,
				description: profile.description || '',
			}}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					await updateUserProfile(values);
				} catch (error) {
					toast.error(error.message);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form className='ui form'>
					<CustomTextInput
						name='displayName'
						placeholder='Display Name'
					/>
					<CustomTextArea
						name='description'
						placeholder='Description'
					/>
					<Button
						loading={isSubmitting}
						disabled={isSubmitting || !isValid || !dirty}
						floated='right'
						type='submit'
						size='large'
						positive
						content='Update profile'
					/>
				</Form>
			)}
		</Formik>
	);
}
