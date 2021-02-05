import React, { useState } from 'react';
import { Button, Grid, Step } from 'semantic-ui-react';
import PhotoWdigetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import cuid from 'cuid';
import { getFileExtension } from '../util/util';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';

export default function PhotoUploadWidget({ setEditMode }) {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	function handleCancelCrop() {
		setFiles([]);
		setImage(null);
	}

	function handleUploadImage() {
		setLoading(true);
		const filename = cuid() + '.' + getFileExtension(files[0].name);
		const uploadTask = uploadToFirebaseStorage(image, filename);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(progress);
			},
			(error) => {
				toast.error(error.message);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
					updateUserProfilePhoto(downloadURL, filename)
						.then(() => {
							setLoading(false);
							handleCancelCrop();
							setEditMode(false);
						})
						.catch((error) => {
							setLoading(false);
							toast.error(error.message);
						});
				});
			}
		);
	}

	return (
		<>
			<Step.Group widths={3}>
				<Step>
					<Step.Content>
						<Step.Title>1. Add Photo</Step.Title>
					</Step.Content>
				</Step>
				<Step>
					<Step.Content>
						<Step.Title>2. Resize</Step.Title>
					</Step.Content>
				</Step>
				<Step>
					<Step.Content>
						<Step.Title>3. Preview & Upload</Step.Title>
					</Step.Content>
				</Step>
			</Step.Group>

			<Grid>
				<Grid.Column width={4}>
					<PhotoWidgetDropzone setFiles={setFiles} />
				</Grid.Column>
				<Grid.Column width={2} />

				<Grid.Column width={4}>
					{files.length > 0 && (
						<PhotoWdigetCropper
							setImage={setImage}
							imagePreview={files[0].preview}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={1} />

				<Grid.Column width={4}>
					{files.length > 0 && (
						<>
							<div
								className='img-preview'
								style={{
									minHeight: 200,
									minWidth: 200,
									overflow: 'hidden',
								}}
							/>
							<Button.Group>
								<Button
									style={{ width: 100 }}
									loading={loading}
									positive
									icon='check'
									onClick={handleUploadImage}
								/>
								<Button
									style={{ width: 100 }}
									icon='close'
									disabled={loading}
									onClick={handleCancelCrop}
								/>
							</Button.Group>
						</>
					)}
				</Grid.Column>
				<Grid.Column width={1} />
			</Grid>
		</>
	);
}
