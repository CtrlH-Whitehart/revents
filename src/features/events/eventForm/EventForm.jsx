/* global google */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { listenToEvents } from '../eventActions';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryData } from '../../../app/api/categoryData';
import CustomDateInput from '../../../app/common/form/CustomDateInput';
import CustomPlaceInput from '../../../app/common/form/CustomPlaceInput';
import {
	listenToEventFromFirestore,
	updateEventInFirestore,
	addEventToFirestore,
	cancelEventToggle,
} from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {
	const dispatch = useDispatch();

	const [loadingCancel, setLoadingCancel] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { loading, error } = useSelector((state) => state.async);

	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	);

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: {
			address: '',
			latLng: null,
		},
		venue: {
			address: '',
			latLng: null,
		},
		date: '',
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required('You must provide a description'),
		city: Yup.object().shape({
			address: Yup.string().required('You must provide a city'),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('You must provide a venue'),
		}),
		date: Yup.string().required('You must provide a date'),
	});

	async function handleCancelToggle(event) {
		setConfirmOpen(false);
		setLoadingCancel(true);

		try {
			await cancelEventToggle(event);
			setLoadingCancel(false);
		} catch (error) {
			setLoadingCancel(true);
			toast.error(error.message);
		}
	}

	useFirestoreDoc({
		shouldExecute: !!match.params.id,
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch],
	});

	if (loading)
		return <LoadingComponent content='Loading event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values);
						setSubmitting(false);
						history.push('/events');
					} catch (error) {
						toast.error(error.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />

						<CustomTextInput
							name='title'
							placeholder='Event Title'
						/>
						<CustomSelectInput
							name='category'
							placeholder='Event Category'
							options={categoryData}
						/>
						<CustomTextArea
							name='description'
							placeholder='Description'
							rows={3}
						/>

						<Header
							sub
							color='teal'
							content='Event Location Details'
						/>
						<CustomPlaceInput name='city' placeholder='City' />
						<CustomPlaceInput
							name='venue'
							placeholder='Venue'
							disabled={!values.city.latLng}
							options={{
								location: new google.maps.LatLng(
									values.city.latLng
								),
								radius: 1000,
								types: ['establishment'],
							}}
						/>
						<CustomDateInput
							name='date'
							placeholderText='Event Date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='Time'
							dateFormat='MMMM d, yyyy h:mm a'
						/>
						{selectedEvent &&
							<Button
								loading={loadingCancel}
								type='button'
								floated='left'
								color={selectedEvent.isCancelled ? 'green' : 'red'}
								content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel Event'}
								onClick={() => setConfirmOpen(true)}
							/>
						}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							floated='right'
							positive
							content='Submit'
						/>
						<Button
							as={Link}
							disabled={isSubmitting}
							to='/events'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
			<Confirm 
				content={selectedEvent?.isCancelled ? 'This will reactivate the event - are you sure?' : 'This will cancel the event - are you sure?'}
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => handleCancelToggle(selectedEvent)}
			/>
		</Segment>
	);
}
