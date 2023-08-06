import { useParams } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import './style.css';

export default function CoinHistoryChart(props) {
	const { coinData, currencyRate, currencySymbol } = props;
	const { id } = useParams();
	const idnew = id.replace(/\s+/g, '-').toLowerCase();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [duration, setDuration] = useState(24 * 3600 * 1000);
	const [interval, setInterval] = useState("m5");
	const [timeUnit, setTimeUnit] = useState("minute");
	const [gridTimeUnit, setGridTimeUnit] = useState("hour");
	const [gridCount, setGridCount] = useState(1);
	const [length, setLength] = useState(288)
	const [condition, setCondition] = useState(null);
	const buttons = [
		{
			id: 1,
			name: "1D",
			onClickFunction: oneDay,
		},
		{
			id: 2,
			name: "1W",
			onClickFunction: oneWeek,
		},
		{
			id: 3,
			name: "1M",
			onClickFunction: oneMonth,
		},
		{
			id: 4,
			name: "3M",
			onClickFunction: threeMonths,
		},
		{
			id: 5,
			name: "6M",
			onClickFunction: sixMonths,
		},
		{
			id: 6,
			name: "1Y",
			onClickFunction: oneYear,
		},
	];
	const slicedData = history.slice(-length);
	const firstData = slicedData[0];
	const lastData = slicedData[slicedData.length - 1];
	const intervalCount = interval.match(/\d+/g);
	async function getApiHistory() {
		try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/assets/${idnew}/history`, { params: { interval } });
            setHistory(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
	};
	history.forEach((item) => {
		item.priceUsd = item.priceUsd / currencyRate;
	});
	function decimal(x) {
		return parseFloat(x).toFixed(2);
	}
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};
	function Price(e) {
		if (e !== undefined) {
			return e.priceUsd;
		}
	};
	function timestamp(e) {
		if (e !== undefined) {
			return e.time;
		}
	};
	function high(e) {
		return Math.max.apply(Math, e.map(function (o) { return o.priceUsd; }));
	};
	function low(e) {
		return Math.min.apply(Math, e.map(function (o) { return o.priceUsd; }));
	};
	function changePercent() {
		return decimal(((Price(lastData) - Price(firstData)) / Price(firstData)) * 100);
	};
	function slicedDataPrice(e) {
		return (e.map(function (o) { return o.priceUsd; })).map(Number);
	};
	const slicedDataPrices = slicedDataPrice(slicedData);
	function average(e) {
		let sum = 0;
		for (let i = 0; i < e.length; i++) {
			sum += e[i];
		}
		return sum / e.length;
	};
	function oneDay() {
		setDuration(24 * 3600 * 1000 - 5 * 60 * 1000);
		setInterval("m5");
		setTimeUnit("minute");
		setGridTimeUnit("hour");
		setGridCount(1);
		setLength(288);
	}
	function oneWeek() {
		setDuration(7 * 24 * 3600 * 1000);
		setInterval("m30");
		setTimeUnit("minute");
		setGridTimeUnit("hour");
		setGridCount(5);
		setLength(336);
	}
	function oneMonth() {
		setDuration(30 * 24 * 3600 * 1000);
		setInterval("h2");
		setTimeUnit("hour");
		setGridTimeUnit("day");
		setGridCount(1);
		setLength(360);
	}
	function threeMonths() {
		setDuration(3 * 30 * 24 * 3600 * 1000);
		setInterval("h6");
		setTimeUnit("hour");
		setGridTimeUnit("day");
		setGridCount(3);
		setLength(360);
	}
	function sixMonths() {
		setDuration(6 * 30 * 24 * 3600 * 1000);
		setInterval("d1");
		setTimeUnit("day");
		setGridTimeUnit("day");
		setGridCount(5);
		setLength(180);
	}
	function oneYear() {
		setDuration(365 * 24 * 3600 * 1000);
		setInterval("d1");
		setTimeUnit("day");
		setGridTimeUnit("month");
		setGridCount(1);
		setLength(365);
	}
	function Button() {
		return buttons.map((button, active) => {
			const { id, name, onClickFunction } = button;
			return (
				<button
					key={id}
					className={`duration ${condition === active ? "clicked" : ""}`}
					id={name}
					onClick={() => {
						setCondition(active);
						onClickFunction(active);
					}}
				>
					<h5>{name}</h5>
				</button>
			)
		})
	};
	useEffect(() => {
		getApiHistory();
	}, [interval, duration, currencyRate]);
	useEffect(() => {
		document.getElementById("1D").click();
	}, []);
	useLayoutEffect(() => {
		let root = am5.Root.new("chartdiv");

		root.dateFormatter.setAll({
			dateFormat: "MMM dt, yyyy - hh:mm a",
			dateFields: ["time"]
		});

		root.numberFormatter.setAll({
			numberFormat: "#,###.0000",
			numericFields: ["priceUsd"]
		});

		// Create chart
		let chart = root.container.children.push(am5xy.XYChart.new(root, {
		}));

		// Create axes
		let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
			groupData: false,
			baseInterval: {
				timeUnit: timeUnit,
				count: intervalCount
			},
			gridIntervals: [
				{ timeUnit: gridTimeUnit, count: gridCount }
			],
			min: timestamp(lastData) - duration,
			renderer: am5xy.AxisRendererX.new(root, {}),
		}));
		xAxis.get("dateFormats")["hour"] = "ha";
		xAxis.get("dateFormats")["day"] = "MMM dd";
		xAxis.get("dateFormats")["month"] = "MMM YYYY";
		xAxis.get("renderer").labels.template.setAll({
			rotation: -60,
			fontSize: 11,
			fontWeight: 600,
			fill: am5.color(0x666666),
			centerX: am5.percent(100),
		});
		xAxis.get("renderer").grid.template.setAll({
			opacity: 0,
		});

		let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			numberFormat: "#,###.0000",
			extraMin: 0.1,
			extraMax: 0.1,
			renderer: am5xy.AxisRendererY.new(root, {
				minGridDistance: 25,
			})
		}));
		yAxis.get("renderer").labels.template.setAll({
			fontSize: 12,
			fill: am5.color(0x666666),
			inside: true,
			dy: -10,
			centerX: -630,
		});
		yAxis.get("renderer").grid.template.setAll({
			opacity: 0.7,
		});

		// Add series
		let series = chart.series.push(am5xy.LineSeries.new(root, {
			xAxis: xAxis,
			yAxis: yAxis,
			valueYField: "priceUsd",
			valueXField: "time",
			fill: Price(lastData) > Price(firstData) ? am5.color(0x4fedad) : am5.color(0xf44336),
			stroke: Price(lastData) > Price(firstData) ? am5.color(0x4fedad) : am5.color(0xf44336),
		}));
		
		let tooltip = am5.Tooltip.new(root, {
			pointerOrientation: "horizontal",
			labelText: "[#fff fontWeight:600 fontSize: 13px]{time}[/]\n[#fff fontSize: 13px]{priceUsd.formatNumber('#,###.0000')}[/]",
			getFillFromSprite: false,
		})
		tooltip.get("background").setAll({
			fill: am5.color(0x000000),
			fillOpacity: 0.75,
		});
		series.set("tooltip", tooltip);
		series.fills.template.setAll({
			fillOpacity: 0.2,
			visible: true,
		});
		series.strokes.template.setAll({
			strokeWidth: 3,
		});


		// Set up data processor to parse string dates
		series.data.processor = am5.DataProcessor.new(root, {
			dateFormat: "yyyy-MM-dd",
			dateFields: ["time"],
			numericFields: ["priceUsd"],
		});
		series.data.setAll(history);

		// Add cursor
		let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
			xAxis: xAxis,
			behavior: "none",
		}));
		cursor.lineX.set("visible", false);
		cursor.lineY.set("visible", false);

		// Make stuff animate on load
		chart.appear(1000, 100);

		return () => {
			root.dispose();
		};
	}, [history, currencyRate]);

	return (
		<div className="coin-chart">
			<div className="coin-chart-wrapper">
				<div className="basic-info">
					<div className="description">
						<img className="coin-icon" src />
						<div className="name-date">
							<div className="name">
								<h3>{coinData.name} ({coinData.symbol})</h3>
							</div>
							<div className="date">
								<h4>{Date().toString().slice(4, 15)}</h4>
							</div>
						</div>
					</div>
					<div className="statistics">
						<div className="high-low">
							<div className="high">
								<p className="gray">HIGH</p>
								<p>{currencySymbol + numberFormat(decimal(high(slicedData)))}</p>
							</div>
							<div className="low">
								<p className="gray">LOW</p>
								<p>{currencySymbol + numberFormat(decimal(low(slicedData)))}</p>
							</div>
						</div>
						<div className="average-change">
							<div className="average">
								<p className="gray">AVERAGE</p>
								<p>{currencySymbol + numberFormat(decimal(average(slicedDataPrices)))}</p>
							</div>
							<div className="change">
								<p className="gray">CHANGE</p>
								{Price(lastData) > Price(firstData)
									? <p className="change-green">{changePercent()}%</p>
									: <p className="change-red">{changePercent()}%</p>
								}
							</div>
						</div>
					</div>
				</div>
				<div id="chartdiv"></div>
				<Button></Button>
			</div>
		</div>
	);
}