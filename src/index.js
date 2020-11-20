import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Calendar from './components/calendar';
import Sidebar from './components/sidebar';


if (!window.localStorage.getItem('preferredZone')) {
	window.localStorage.setItem('preferredZone', JSON.stringify(Intl.DateTimeFormat().resolvedOptions().timeZone))
}

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		background: #F7F7FF;
		height: 100%;
		font-family: 'Noto Sans JP', sans-serif;
		color: #414141;
		font-size: 16px;
		line-height: 150%;
	}
`

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: minmax(250px, 15%) 1fr;

`

const data = {
	resources: [
		{ type: 'Aircraft', name: 'Piper Warrior III', callsign: 'N152DC' },
		{ type: 'Aircraft', name: 'Cessna Skyhawk C172S (G1000)', callsign: 'N21394' },
		{ type: 'Aircraft', name: 'Cessna 172N', callsign: 'N4967G' },
		{ type: 'Aircraft', name: 'Piper Archer III', callsign: 'N522JW' },
		{ type: 'Aircraft', name: 'Cessna C172S (GNS530)', callsign: 'N526ER' },
		{ type: 'Aircraft', name: 'Cessna C152', callsign: 'N65199' },
		{ type: 'Aircraft', name: 'Grumman Cougar', callsign: 'N723GA' },
		{ type: 'Aircraft', name: 'Piper Archer II', callsign: 'N934DE' },
		{ type: 'Simulators', name: 'Redbird LD (A-ATD)', callsign: null },
		{ type: 'Simulators', name: 'Redbird', callsign: null },
		{ type: 'Other', name: 'Classroom A', callsign: null },
		{ type: 'Other', name: 'Classroom B', callsign: null },
	],
	pilots: [

		{ type: 'Pilot', name: 'Jay Patel' },
		{ type: 'Pilot', name: 'Anna Nevison' },
		{ type: 'Pilot', name: 'Eric Karter' },
		{ type: 'Instructor', name: 'William Wang' },
		{ type: 'Instructor', name: 'Eric Stumpel' },
		{ type: 'Instructor', name: 'Todd Carlos' },
		{ type: 'Student', name: 'Steven Falco' },
		{ type: 'Student', name: 'Pawel Czarnecki' },
		{ type: 'Student', name: 'Brandon Young' },
	],
	upcomingEvents: [
		{
			people: ['steven falco', 'William Wang'],
			resource: { type: 'Other', name: 'Classroom A', callsign: null },
			startTime: '2020-10-10T19:20:48.962Z',
			endTime: '2020-10-10T23:50:48.962Z'
		},
		{
			people: ['Eric Stumpel', 'William Wang'],
			resource: { type: 'Aircraft', name: 'Piper Archer III', callsign: 'N522JW' },
			startTime: '2020-11-13T10:00:00.000Z',
			endTime: '2020-11-13T14:00:00.000Z'
		},
		{
			people: ['Eric Stumpel', 'Jay Patel'],
			resource: { type: 'Simulators', name: 'Redbird LD (A-ATD)', callsign: null },
			startTime: '2020-12-05T00:00:00.000Z',
			endTime: '2020-12-05T04:00:00.000Z'
		},
		{
			people: ['Todd Carlos', 'Anna Nevison'],
			resource: { type: 'Aircraft', name: 'Cessna C152', callsign: 'N65199' },
			startTime: '2021-01-11T00:00:00.000Z',
			endTime: '2021-01-14T23:20:48.962Z'
		},
		{
			people: ['Pawel Czarnecki', 'William Wang'],
			resource: { type: 'Aircraft', name: 'Piper Warrior III', callsign: 'N152DC' },
			startTime: '2021-01-20T11:20:48.962Z',
			endTime: '2021-01-20T14:20:48.962Z'
		},
		{
			people: ['Eric Stumpel', 'William Wang'],
			resource: { type: 'Aircraft', name: 'Piper Archer III', callsign: 'N522JW' },
			startTime: '2020-11-13T10:00:00.000Z',
			endTime: '2020-11-13T14:00:00.000Z'
		},
		{
			people: ['Eric Stumpel', 'Jay Patel'],
			resource: { type: 'Simulators', name: 'Redbird LD (A-ATD)', callsign: null },
			startTime: '2020-12-05T00:00:00.000Z',
			endTime: '2020-12-05T04:00:00.000Z'
		},
		{
			people: ['Todd Carlos', 'Anna Nevison'],
			resource: { type: 'Aircraft', name: 'Cessna C152', callsign: 'N65199' },
			startTime: '2021-01-11T00:00:00.000Z',
			endTime: '2021-01-14T23:20:48.962Z'
		},
		{
			people: ['Pawel Czarnecki', 'William Wang'],
			resource: { type: 'Aircraft', name: 'Piper Warrior III', callsign: 'N152DC' },
			startTime: '2021-01-20T11:20:48.962Z',
			endTime: '2021-01-20T14:20:48.962Z'
		}
	]
}

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Wrapper>
			<Sidebar pilots={data.pilots} resources={data.resources} events={data.upcomingEvents.slice(0, 5)} />
			<Calendar />
		</Wrapper>
	</React.StrictMode>,
	document.getElementById('root')
)