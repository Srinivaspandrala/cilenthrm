import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales
});

// Event types with colors
const eventTypes = {
    Meeting: '#1E90FF',
    Birthday: '#FF4500',
    Holiday: '#32CD32',
    Conference: '#8A2BE2',
    Workshop: '#FFD700',
    Sports: '#FF6347',
    Music: '#FF69B4',
    Other: '#A9A9A9'
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: ''
    });

    // Fetch existing events from the server
    const fetchEvents = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Map event types to colors
                const mappedEvents = data.events.map((event) => ({
                    ...event,
                    start: new Date(`${event.Date}T${event.StartTime}`),
                    end: new Date(`${event.Date}T${event.EndTime}`),
                    color: eventTypes[event.eventType] || eventTypes.Other
                }));

                setEvents(mappedEvents);
            } else {
                alert('Error fetching events: ' + data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('There was an error fetching the events.');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleAddEvent = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        const eventData = {
            title: newEvent.title,
            date: newEvent.date,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            type: newEvent.type
        };

        console.log('Sending event data:', eventData); // Add this line

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            });

            const data = await response.json();

            if (response.ok) {
                const addedEvent = {
                    ...eventData,
                    start: new Date(`${newEvent.date}T${newEvent.startTime}`),
                    end: new Date(`${newEvent.date}T${newEvent.endTime}`),
                    color: eventTypes[newEvent.type] || eventTypes.Other
                };
                setEvents([...events, addedEvent]);

                alert('Event added successfully!');
                setNewEvent({
                    title: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    type: ''
                });
                setShowForm(false);
            } else {
                alert('Error adding event: ' + (data.message || 'Unknown error occurred.'));
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert('There was an error adding the event. Please try again later.');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEvents(events.filter(event => event.EventsID !== eventId));
                alert('Event deleted successfully!');
            } else {
                alert('Error deleting event: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('There was an error deleting the event.');
        }
    };

    const handleDateClick = (slotInfo) => {
        setNewEvent({
            ...newEvent,
            date: slotInfo.start.toISOString().split('T')[0],
            startTime: '',
            endTime: '',
            title: '',
            type: ''
        });
        setShowForm(true);
    };

    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '8px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                padding: '5px',
                position: 'relative',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        };
    };

    return (
        <div className='Calendar-siderBar'>
            <div style={{ padding: '20px' }} className='calendar-render'>
                {showForm && (
                    <div className="eventform-overlay">
                        <div className="eventform">
                            {/* Close Button */}
                            <FontAwesomeIcon icon={faTimes} className="eventform-close-icon" onClick={() => setShowForm(false)} />

                            {/* Event Title */}
                            <div className="eventform-input-group">
                                <i className="fas fa-calendar-plus" style={{color:"#0055b6"}}></i>
                                <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" className="styled-input" />
                            </div>

                            {/* Event Date */}
                            <div className="eventform-input-group">
                                <i className="fas fa-calendar-alt" style={{color:"#0055b6"}}></i>
                                <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} className="styled-input" />
                            </div>

                            {/* Start Time */}
                            <div className="eventform-input-group">
                                <i className="fas fa-clock" style={{color:"#0055b6"}}></i>
                                <input type="time" name="startTime" value={newEvent.startTime} onChange={handleInputChange} className="styled-input" />
                            </div>

                            {/* End Time */}
                            <div className="eventform-input-group">
                                <i className="fas fa-clock" style={{color:"#0055b6"}}></i>
                                <input type="time" name="endTime" value={newEvent.endTime} onChange={handleInputChange} className="styled-input" />
                            </div>

                            {/* Event Type Dropdown */}
                            <div className="eventform-select">
                                <i className="fas fa-list" style={{color:"#0055b6"}}></i>
                                <select name="type" value={newEvent.type} onChange={handleInputChange} style={{border:"none"}} >
                                    <option value="">Select Type</option>
                                    {Object.entries(eventTypes).map(([type]) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="form-buttons">
                                <button className="eventform-add-btn" onClick={handleAddEvent}>
                                    <FontAwesomeIcon icon={faCalendarPlus} /> Add Event
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="event-type-labels">
                    {Object.entries(eventTypes).map(([type, color]) => (
                        <div key={type} style={{ display: 'inline-flex', alignItems: 'center', margin: '5px 10px' }}>
                            <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '50%', marginRight: '5px' }} />
                            <span>{type}</span>
                        </div>
                    ))}
                </div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                    eventPropGetter={eventStyleGetter}
                    selectable
                    onSelectSlot={handleDateClick}
                    components={{
                        event: ({ event }) => (
                            <div>
                                <span>{event.title}</span>
                                <button onClick={() => handleDeleteEvent(event.EventsID)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default MyCalendar;