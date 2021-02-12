$(document).ready(function () {
	const imdbUrlTemplate = `http://www.imdb.com/find?ref_=nv_sr_fn&q=VIDEO_TITLE&s=all`;

	let imdbImage = $("<span/>");
	imdbImage.css({
		"max-width": "80px",
		"height": "auto"
	});
	imdbImage.append("<img id=\"imdb_img\" src=\"equo/images/IMDB_logo_2016.png\" style=\"max-width:60px;height:auto;\" alt=\"IMDB\" />")

	let imdbLink = $("<a/>", {
		role: "link",
		class: "nf-icon-button"
	});
	imdbLink.append(imdbImage);

	let divWrapper = $("<div/>").css({
		"margin-top": "10px"
	});

	let imdbDiv = $("<div/>", {
		class: "imdbLink"
	});
	imdbDiv.append(divWrapper).append(imdbLink);

	const getImdbUrl = function (videoTitle) {
		let imdbVideoTitle = videoTitle.replace(/ /g, '+');
		let imdbUrl = imdbUrlTemplate.replace('VIDEO_TITLE', imdbVideoTitle);
		return imdbUrl;
	};

	const refreshImdbPage = function (child) {
		let videoTitle = NetflixUtils.getVideoTitle(child);
		let imdbUrl = getImdbUrl(videoTitle);
		equo.updateBrowser({
			url: imdbUrl,
			name: 'IMDB'
		});
	};

	const insertImdbDivInBillboardLinks = function () {
		let optionalBillboardLinks = $(document).find('.billboard-links');
		if (optionalBillboardLinks.length) {
			let billboardLinks = $(optionalBillboardLinks[0]);
			imdbDiv.insertAfter(billboardLinks);
			refreshImdbPage(billboardLinks);
		}
	};

	insertImdbDivInBillboardLinks();

	equo.onNativeDomChanged((addedNode) => {
		let optionalOverview = addedNode.find('#pane-Overview div.overview');
		if (optionalOverview.length) {
			let overviewElement = $(optionalOverview[0]);
			imdbDiv.insertAfter(overviewElement);
			refreshImdbPage(imdbDiv);
		}
	});

	imdbDiv.click(function () {
		let videoTitle = NetflixUtils.getVideoTitle(imdbDiv);
		let imdbUrl = getImdbUrl(videoTitle);
		equo.openBrowser({
			url: imdbUrl,
			name: 'IMDB',
			position: 'bottom'
		});

		equo.logInfo("this is a info log.");

		equo.logWarn("this is a warning log.");

		equo.logError("this is a error log.");

		equo.logInfo({
			message: "this is a info log.",
			segmentation : {}
		});

		equo.logWarn({
			message: "this is a warning log.",
			segmentation : {}
		});

		equo.logError({
			message: "this is a error log.",
			segmentation : {}
		});
	});
});
