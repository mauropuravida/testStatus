NetflixUtils = {
	previousSelectedTitleElement: 'undefined',
  getVideoTitle : function (childElement) {
		let parent = childElement.closest('.logo-and-text.meta-layer');
		if (parent && parent.length) {
			//it's a billboard video
			let parentChildren = $(parent).find('.title-logo');
			let titleLogo = $(parentChildren[0]);
			let titleAttr = titleLogo.attr('title');
			if (titleAttr) {
				return titleAttr;
			}
		} else {
			parent = childElement.closest('.jawBone');
			let outerElement = $(parent).find('.title.has-jawbone-nav-transition');
			let currentTitle = outerElement.first();
			if (currentTitle[0] == NetflixUtils.previousSelectedTitleElement) {
				currentTitle = outerElement.last();
			}
			NetflixUtils.previousSelectedTitleElement = currentTitle[0];
			let imgTitle = $(currentTitle).children('img.logo');
			let altAttr = imgTitle.attr('alt');
			let videoTitle;
			if (typeof altAttr !== 'undefined') {
				videoTitle = altAttr;
			} else {
				let divTitle = $(currentTitle).children('div.text');
				videoTitle = divTitle.text();
			}
			return videoTitle;
		}
	}
};
