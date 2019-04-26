var urla = "https://free-api.heweather.net/s6/";

function ready(url, type, city) {
	return url + type + "?location=" + city + "&key=ae91f53c153b4dd8ac7fb6394f2c4660"
}
var cityArea = document.querySelector(".wrap .city-area");
var tem = document.querySelector(".wrap .tem");
var fanwei = document.querySelector(".weather-box .fanwei");
var tianqi = document.querySelector(".weather-box .tianqi");
var tubiao = document.querySelector(".weather-box .tubiao");
var nowdayTem = document.querySelector(".nowday-tem .timbox");
var nowWeek = document.querySelector(".now-week")
var swiperBox = document.querySelector(".swiperBox");
var airimg = document.querySelector(".degree img")
var nowday = document.querySelector(".nowday .week")
var max_tmp = document.querySelector(".fanwei")
var week = {
	0: "星期日",
	1: "星期一",
	2: "星期二",
	3: "星期三",
	4: "星期四",
	5: "星期五",
	6: "星期六",
}
var life = {
	comf: "舒适",
	drsg: "穿衣",
	flu: "感冒",
	sport: "运动",
	trav: "旅游",
	uv: "紫外线",
	cw: "洗车",
	air: "空气污染",
}
var lifeicon = {
	comf: "&#xe6aa;",
	drsg: "&#xe615;",
	flu: "&#xe63b;",
	sport: "&#xe6f1;",
	trav: "&#xe60d;",
	uv: "&#xe711;",
	cw: "&#xe660;",
	air: "&#xe613;",
}
let dat = new Date();
nowday.innerText = week[dat.getDay()];
$.ajax({
	type: "GET",
	url: ready(urla, "weather", "taiyuan"),
	success: function(data) {
		console.log(data)
		cityArea.innerText = data.HeWeather6[0].basic.location;
		tem.innerText = data.HeWeather6[0].now.tmp + "°";
		max_tmp.innerText = data.HeWeather6[0].daily_forecast[0].tmp_max +"~"+ data.HeWeather6[0].daily_forecast[0].tmp_min;
		tubiao.classList.remove("icon-999");
		tubiao.classList.add(`icon-${data.HeWeather6[0].now.cond_code}`);
		tianqi.innerText = data.HeWeather6[0].now.cond_txt;
		let str = "";
		let arr = "";
		let box = "";
		let hourW = data.HeWeather6[0].hourly;
		let days = data.HeWeather6[0].daily_forecast;
		let tips = data.HeWeather6[0].lifestyle;
		// 点温度
		for (let i = 0; i < hourW.length; i++) {
			str +=
				`
				<div class="swiper-slide timeclick">
					<div class="nowtime">${(new Date(hourW[i].time)).getHours()}时</div>
					<div class="iconfont icon-${hourW[i].cond_code} icon-tu"></div>
					<div class="nowtime-tem">${hourW[i].tmp}°</div>
				</div>
			`
		}
		nowdayTem.innerHTML = str;
		new Swiper('.nowday-tem', {
			slidesPerView: 5,
		});
		for (let i = 0; i < days.length; i++) {
			arr +=
				`
			<div class="now-week-box">
				<div class="now-week-day">${week[(new Date(days[i].date)).getDay()]}</div>
				<div class="iconfont icon-${days[i].cond_code_n} now-week-tu"></div>
				<div class="now-week-tmg">
					<span class="max-tmg">${days[i].tmp_max}°</span>
					<span class="min-tmg">${days[i].tmp_min}°</span>
				</div>
			</div>
			`
		}
		nowWeek.innerHTML = arr;
		for (let i = 0; i < tips.length; i++) {
			box +=
				`
			<div class="swiper-slide lunbo">
				<div class="tip-img"><i class="iconfontcss">${lifeicon[tips[i].type]}</i></div>
				<div class="tips">
					<div class="tips-title">${life[tips[i].type]}</div>
					<div class="tips-neirong">${tips[i].txt}</div>
				</div>
			</div>
			`
		}
		swiperBox.innerHTML = box;
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: -10,
			loop: true
		});
	}
})

$.ajax({
	type: "GET",
	url: ready(urla, "air", "taiyuan"),
	success: function(data) {
		let aqim = data.HeWeather6[0].air_now_city.aqi;
		var speed = (aqim / 500) * 100 + "%";
		airimg.style.left = speed;
	}
})

