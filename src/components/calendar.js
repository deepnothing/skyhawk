import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';

const Calendar = styled.div`
	padding: 1rem;

	.eventwrapper {
		overflow: hidden;
		border-radius: 4px;
	}
`


const Event = styled.div`
	white-space: nowrap;
	padding: 5px;

	h4 { margin: 0; }
`


export default () => {
	return (
		<Calendar>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='timeGridWeek'
				slotDuration='01:00:00'
				allDaySlot={false}
				editable={true}
				events={[
					{
						title: 'Test',
						start: '2020-10-14T19:20:48.962Z',
						end: '2020-10-14T23:20:48.962Z',
						extendedProps: {
							pilots: ['Harsh Baid', 'William Wang'],
							resource: { type: 'Aircraft', name: 'Cessna 172N', callsign: 'N4967G' }
						}
					},
					{
						title: 'Test2',
						start: '2020-10-14T19:20:48.962Z',
						end: '2020-10-14T23:20:48.962Z',
						extendedProps: {
							pilots: ['Harsh Baid', 'William Wang'],
							resource: { type: 'Aircraft', name: 'Cessna 172N', callsign: 'N4967G' }
						}
					},
					{
						title: 'Test3',
						start: '2020-10-14T19:20:48.962Z',
						end: '2020-10-14T23:20:48.962Z',
						editable: false,
						extendedProps: {
							pilots: ['Harsh Baid', 'William Wang'],
							resource: { type: 'Aircraft', name: 'Cessna 172N', callsign: 'N4967G' }
						}
					}
				]}
				eventClassNames='eventwrapper'
				eventContent={(e) => {
					console.log(e);
					return (<Event>
						<h4>{e.timeText}</h4>
						<h5>{e.event.extendedProps.pilots.map((p, i, arr) => {
							return (p + ((i === arr.length - 1) ? '' : ', '))
						})}</h5>

					</Event>)
				}}
			/>
		</Calendar>
	)
}