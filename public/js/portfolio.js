window.onload = function() {

var project         = document.getElementsByClassName("project-container"),
    projectImage    = document.getElementsByClassName("project-bg-container"),
    projectSummary  = document.getElementsByClassName("project-summary"),
    projectSummaryContents  = document.getElementsByClassName("ps-container"),
    shade           = document.getElementsByClassName("project-bg-shade"),
    parallax = document.getElementById("portfolio-bg"),
    downArrow = document.getElementById("down-arrow"),
    projectsHead = document.getElementById("about-projects-head");

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


// Expand Project Cards
//=====================
for(var i = 0; i < projectImage.length; i++) {
    projectImage[i].addEventListener('click', function(e) {
        var position = Array.from(projectImage).indexOf(e.currentTarget);
        var height = projectSummaryContents[position].clientHeight + 115 + 'px';
        var ch = projectSummary[position].clientHeight;
        if (!ch) {
            projectSummary[position].style.height = height;
        } else {
            projectSummary[position].style.height = 0;
        }
        shade[position].classList.toggle("project-active");
    });
}

// Background Parallax
// ===================
if(!isMobile) {
    window.addEventListener('scroll', function() {
        window.requestAnimationFrame(function() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var speed = 0.6;
            var scale = Math.round(scrolled * speed);
            parallax.style.transform = "translate3d(0," + scale + "px,0)";
        });
    });
}

// Animate Scroll Down
// ===================
downArrow.addEventListener('click', function() {
    var startingY = window.pageYOffset;
    var projectsHeadTop = projectsHead.getBoundingClientRect().top;
    var bodyTop = document.body.getBoundingClientRect().top;
    var offset = projectsHeadTop - bodyTop;
    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
    // Duration decreases the closer the projectsHead is to the top of the page
    var duration = (projectsHeadTop / offset) * 700 + 300;
    var start;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1)
        percent = easing(percent)

        window.scrollTo(0, startingY + projectsHeadTop * percent)

        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    });
});

// Window onLoad
};