import GoogleMapReact from 'google-map-react';
import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

function Marker() {
	return <Icon name='marker' size='big' color='teal' />;
}

export default function EventDetailedMap({ latLng }) {
	const zoom = 14;

	return (
		<Segment attached='bottom' style={{ padding: 0 }}>
			<div style={{ height: 300, width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyCINVb4Bi-UGbWS4Da5XydFQJRwcAhJpJ8',
					}}
					center={latLng}
					zoom={zoom}
				>
					<Marker lat={latLng.lat} lng={latLng.lng} />
				</GoogleMapReact>
			</div>
		</Segment>
	);
}
