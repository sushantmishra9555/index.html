window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const navbar = document.getElementById("navbar");
    
    // If user scrolls down more than 50px
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}