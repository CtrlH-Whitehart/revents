import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Header, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';

export default function EventDetailedHeader({event}) {
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{padding: '0'}}>
                <Image className='eventImageStyle' src={`/assets/categoryImages/${event.category}.jpg`} fluid />

                <Segment className="eventImageTextStyle" basic >
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={event.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(event.date, 'MMMM d, yyy h:mm a')}</p>
                                <p>
                                    Hosted by <strong>{event.hostedBy}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>

                <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
}