import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const Sidebar = styled.div`
	background: #FFF;
	color: #414141;
	box-shadow: 5px 0 5px -3px rgba(0,0,0,.16), 8px 0 10px 1px rgba(0,0,0,.112), 2px 7px 14px 2px rgba(0,0,0,.096);
`;

const Title = styled.div`
	background: #EAEAEA;
	display: flex;
	justify-content: center;
	h2 {
		margin: 0;
		padding: 1.5rem 1rem;
		text-align: center;
		color: #694ED6;
		font-weight: 700;
	}
	svg {
		width: 2rem;
	}
`;

const Content = styled.div`
	margin: 0 1rem;
	h2 {
		font-weight: 100;
		text-align: center;
	}

	h4, h5 { margin-bottom: 0; }
`;

const EventBox = styled.div`
	max-height: 250px;
	overflow-y: auto;
	display: grid;
	grid-gap: 1rem;

	-ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
	::-webkit-scrollbar {
		width: 0px;
		background: transparent; /* make scrollbar transparent */
	}

	.events {
		box-shadow: 0 2px 1px -1px rgba(0,0,0,.16), 0 1px 1px 0 rgba(0,0,0,.112), 0 1px 3px 0 rgba(0,0,0,.096);
		height: 100px;
		margin: 0 5px;
		padding: .25rem .5rem;
		border-radius: 4px;
		background: #EAEAEA;

		h5 { margin: 0; color: #694ED6; }
		h6 { margin: 0; font-weight: 100; }
		
		hr { border: 1px solid #414141; margin: 0; }
	}
`;

function groupOptions(resources) {
	return (resources.reduce(function (acc, cv) {
		let option = {
			value: cv.callsign ?? cv.name,
			label: cv.name + (cv.callsign ? ` - ${cv.callsign}` : '')
		}

		let index = acc.findIndex(e => e.label === cv.type);

		if (index !== -1) {
			acc[index].options.push(option);
		} else {
			acc.push({
				label: cv.type,
				options: [option]
			});
		}
		return (acc);
	}, []));
}

export default ({ pilots, resources, events }) => {

	const formatTime = (time, format) => time.toFormat(format);
	const calcDuration = (start, end) => {
		let duration = '';
		let time = end.diff(start, ['days', 'hours', 'minutes']).toObject();

		duration += (time.days > 0 ? `${time.days}d ` : '');
		duration += (time.hours > 0 ? `${time.hours}hr ` : '');
		duration += (time.minutes > 0 ? `${Math.ceil(time.minutes)}m` : '00m');

		return (duration);
	}

	return (
		<Sidebar>
			<Title>
				<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>
					<path d="M512 416a96.15 96.15 0 0 1-96 96H138.2a690.4 690.4 0 0 0 47.3-64H416a32 32 0 0 0 0-64h-96a96 96 0 0 1 0-192h45.24A799.82 799.82 0 0 0 416 256h-96a32 32 0 0 0 0 
					64h96a96.15 96.15 0 0 1 96 96z" opacity="0.4"></path>
					<path d="M96 256a96 96 0 0 0-96 96c0 53 96 160 96 160s96-107 96-160a96 96 0 0 0-96-96zm0 128a32 32 0 1 1 32-32 32 32 0 0 1-32 32zM416 0a96 96 0 0 0-96 96c0 53 96 160 96 
					160s96-107 96-160a96 96 0 0 0-96-96zm0 128a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" fill="#C137A2"></path>
				</g></svg>
				<h2>Flight
					Scheduler</h2>
			</Title>

			<Content>
				<h2 style={{ fontWeight: 100 }}>Manhattan Aviators</h2>

				<h4 style={{ marginBottom: '1rem' }}>Upcoming Events</h4>
				<EventBox>
					{events.map((event, i) => {
						let start = DateTime.fromISO(event.startTime);
						let end = DateTime.fromISO(event.endTime);
						return (
							<div className='events' key={i}>
								<h5>{formatTime(start, 'DD')} <span style={{ fontWeight: 100 }}>[{calcDuration(start, end)}]</span></h5>
								<hr />
								<h6>{formatTime(start, 't')} - {start.hasSame(end, 'day') ? formatTime(end, 't') : formatTime(end, 'LLL L, t')}</h6>
								<h6><b>Pilot(s):</b> {event.people.map((person, i, arr) => person + ((i === arr.length - 1) ? '' : ', '))} </h6>
								<h6 style={{ color: '#C137A2', fontWeight: 700 }}>{(event.resource.callsign ? event.resource.callsign + ' - ' : '') + event.resource.name}</h6>
							</div>
						)
					})}
					<div>
						<a href="#"><h5 style={{ textAlign: 'center', margin: 0 }}>View All Events</h5></a>
					</div>
				</EventBox>

				<h4>Select Resource: </h4>
				<Select isMulti isSearchable styles={{ container: (provided) => ({ ...provided, margin: '1rem' }) }}
					options={groupOptions(resources)}
				/>

				<h4>Select Pilot(s)</h4>
				<Select isMulti isSearchable styles={{ container: (provided) => ({ ...provided, margin: '1rem' }) }}
					options={groupOptions(pilots)}
				/>

			</Content>
		</Sidebar>
	)
}
