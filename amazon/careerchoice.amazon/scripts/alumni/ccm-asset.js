async function sendEvent(id, subPage, page, action, value) {
    const data = {subPage: subPage, page: page, eventAction: `${id}-${action}`, eventValue: value, timestamp: Date.now()};
    console.log(data)
    return navigator.sendBeacon(`https://careerchoice.amazon/api/sendEvent`, JSON.stringify(data));
}

const clickableIds = ["home-link","in-the-news-link","alumni-page-video-halleigh","submit-story-button",
    "participant-carousel","alumni-video-carousel","alumni-page-video-megan","alumni-page-video-steve",
    "alumni-page-video-isaac","alumni-page-video-marivic","school-partner-intake-form",
    "employer-partnership-intake-form", "school-portal-link","submit-story-link","pr-media-request-link"];

window.addEventListener("load", function() {
    for (let i = 0; i < clickableIds.length; i++) {
        var element = document.getElementById(clickableIds[i]);
        if (element) {
            element.addEventListener('click', () => {
                sendEvent(clickableIds[i],'SuccessStoriesPage', "CareerChoiceMarketingWebsite", 'clicked', 'none');
            }, false);

        }
    }

    var selectLocale = document.getElementById("locale-dropdown-selector");
    selectLocale.onchange = function(event) {
        var languageValue = event.target.value;
        var currHost = window.location.hostname;
        var currPath = window.location.pathname;
        var startOfQuery = currPath.indexOf("?");
        if (startOfQuery >= 0) {
            var replaceSubString = currPath.substring(currPath.indexOf("?"), currPath.length);
            currPath.replace(replaceSubString, "");
        }

        window.location = "https://" + currHost + currPath + "?lang=" + languageValue;
    }
});

