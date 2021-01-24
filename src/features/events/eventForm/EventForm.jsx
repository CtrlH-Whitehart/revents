/* global google */
import cuid from 'cuid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createEvent, updateEvent } from '../eventActions';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryData } from '../../../app/api/categoryData';
import CustomDateInput from '../../../app/common/form/CustomDateInput';
import CustomPlaceInput from '../../../app/common/form/CustomPlaceInput';

export default function EventForm({ match, history }) {
	const dispatch = useDispatch();

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

	// function handleFormSubmit() {
	//   selectedEvent
	//     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
	//     : dispatch(
	//         createEvent({
	//           ...values,
	//           id: cuid(),
	//           hostedBy: "Bob",
	//           attendees: [],
	//           hostPhotoUrl: "/assets/user.png",
	//         })
	//       );
	//   history.push("/events");
	// }

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									hostedBy: 'Bob',
									attendees: [],
									hostPhotoUrl: '/assets/user.png',
								})
						  );
					history.push('/events');
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
		</Segment>
	);
}
