import React, { Component } from 'react';
import { setColourOpacity } from './colours';
import Data from './Data';
import { shorten } from './months';

const formatNumber = number => parseFloat(number).toFixed(2);
const formatDate = (date, tiny = false) => tiny ? `${date.getDate()}/${date.getMonth() + 1}` : `${date.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getFullYear()}`;

const fancyTH = (text, colour, colspan = 1) => <th colspan={colspan} style={{ backgroundColor: colour, textShadow: '0px 0px 5px #282828' }}>{text}</th>;
const renderPriceCells = (data, colour, tiny = false) => ([
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
		title={data.prices && `Information based on ${data.prices.length} property listings`}
	>
		€{formatNumber(data.lowest)}<br />
		€{formatNumber(data.highest)}
	</td>,
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
		title={data.prices && `Information based on ${data.prices.length} property listings`}
	>
		{data.median && `€${formatNumber(data.median)}`}
		{data.median && data.average && <br />}
		{data.average && `€${formatNumber(data.average)}`}
	</td>
]);
const renderMonthPriceCells = (data, what, where, colour, tiny = false) => ([
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
	>
		{data.getLowest(what, where) >= 100
		? <span>€{formatNumber(data.getLowest(what, where))}</span>
		: <span style={{ opacity: 0.2 }} title="Unrepresentative value">€{formatNumber(data.getLowest(what, where))}</span> }<br />
		€{formatNumber(data.getHighest(what, where))}
	</td>,
	<td
		style={{
			backgroundColor: setColourOpacity(colour, 0.1),
			...(tiny && { fontSize: '0.8em' })
		}}
	>
		€{formatNumber(data.getMedian(what, where))}<br />
		€{formatNumber(data.getAverage(what, where))}
	</td>
])

const renderLarge = (data, colours) => (
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowspan="3">Date</th>
				<th colspan="4">Renting</th>
				<th colspan="4">Sharing</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.rent.city, 2),
					fancyTH('County Dublin', colours.rent.county, 2),
					fancyTH('Dublin City', colours.sharing.city, 2),
					fancyTH('County Dublin', colours.sharing.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH(['Lowest/', <br />, 'Highest'], colours.rent.city),
					fancyTH(['Median/', <br />, 'Average'], colours.rent.city),
					fancyTH(['Lowest/', <br />, 'Highest'], colours.rent.county),
					fancyTH(['Median/', <br />, 'Average'], colours.rent.county),
					fancyTH(['Lowest/', <br />, 'Highest'], colours.sharing.city),
					fancyTH(['Median/', <br />, 'Average'], colours.sharing.city),
					fancyTH(['Lowest/', <br />, 'Highest'], colours.sharing.county),
					fancyTH(['Median/', <br />, 'Average'], colours.sharing.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map(month => [month, data.getMonth(month)]).map(([month, data]) =>
				<tr>
					<th>{month}</th>
					{renderMonthPriceCells(data, Data.RENT, Data.CITY, colours.rent.city)}
					{renderMonthPriceCells(data, Data.RENT, Data.COUNTY, colours.rent.county)}
					{renderMonthPriceCells(data, Data.SHARING, Data.CITY, colours.sharing.city)}
					{renderMonthPriceCells(data, Data.SHARING, Data.COUNTY, colours.sharing.county)}
				</tr>
			)}
			
			{/* {data.getDates().map(date => (
				<tr>
					<th title={new Date(date).toDateString()}>{formatDate(new Date(date))}</th>
					{renderPriceCells(data.getDay(date).get(Data.RENT, Data.CITY), colours.rent.city)}
					{renderPriceCells(data.getDay(date).get(Data.RENT, Data.COUNTY), colours.rent.county)}
					{renderPriceCells(data.getDay(date).get(Data.SHARING, Data.CITY), colours.sharing.city)}
					{renderPriceCells(data.getDay(date).get(Data.SHARING, Data.COUNTY), colours.sharing.county)}
				</tr>
			))} */}
		</tbody>
	</table>
);
const renderSmall = (data, colours, tiny = false) => ([
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowspan="3">Date</th>
				<th colspan="4">Renting</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.rent.city, 2),
					fancyTH('County Dublin', colours.rent.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH(['Lowest/', <br />, 'Highest'], colours.rent.city),
					fancyTH(['Median/', <br />, 'Average'], colours.rent.city),
					fancyTH(['Lowest/', <br />, 'Highest'], colours.rent.county),
					fancyTH(['Median/', <br />, 'Average'], colours.rent.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map(month => [month, data.getMonth(month)]).map(([month, data]) => (
				<tr>
					{ tiny
					? <th style={{...(tiny && { fontSize: '0.8em' })}}>{shorten(month)}</th>
					: <th>{month}</th> }
					
					{renderMonthPriceCells(data, Data.RENT, Data.CITY, colours.rent.city, tiny)}
					{renderMonthPriceCells(data, Data.RENT, Data.COUNTY, colours.rent.county, tiny)}
				</tr>
			))}
		</tbody>
	</table>,
	<table style={{ width: '100%' }}>
		<thead style={{
			backgroundColor: '#003A49',
			color: 'white',
		}}>
			<tr>
				<th rowspan="3">Date</th>
				<th colspan="4">Sharing</th>
			</tr>
			<tr>
				{[
					fancyTH('Dublin City', colours.sharing.city, 2),
					fancyTH('County Dublin', colours.sharing.county, 2),
				]}
			</tr>
			<tr>
				{[
					fancyTH(['Lowest/', <br />, 'Highest'], colours.sharing.city),
					fancyTH(['Median/', <br />, 'Average'], colours.sharing.city),
					fancyTH(['Lowest/', <br />, 'Highest'], colours.sharing.county),
					fancyTH(['Median/', <br />, 'Average'], colours.sharing.county),
				]}
			</tr>
		</thead>
		<tbody style={{
			backgroundColor: '#DFDFDF',
			color: 'black',
		}}>
			{data.getMonths().map(month => [month, data.getMonth(month)]).map(([month, data]) => (
				<tr>
					{ tiny
					? <th style={{...(tiny && { fontSize: '0.8em' })}}>{shorten(month)}</th>
					: <th>{month}</th> }
					{renderMonthPriceCells(data, Data.SHARING, Data.CITY, colours.sharing.city, tiny)}
					{renderMonthPriceCells(data, Data.SHARING, Data.COUNTY, colours.sharing.county, tiny)}
				</tr>
			))}
		</tbody>
	</table>
]);

class StatsTable extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			screenSize: 'large',
		};
	}
	
	componentDidMount() {
		this.onResize();
		window.addEventListener("resize", this.onResize);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}
	
	onResize = () => this.setState({
		screenSize: [
			['tiny', 0],
			['small', 420],
			['large', 780]
		].reduce((res, x) => window.innerWidth > x[1] ? x[0] : res, null),
	})

	render() {
		const {
			data,
			colours,
		} = this.props;
		const {
			screenSize,
		} = this.state;
		
		return {
			tiny: renderSmall,
			small: renderSmall,
			large: renderLarge
		}[screenSize](data, colours, screenSize === 'tiny');
	}
}

export default StatsTable;
