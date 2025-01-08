window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
        chrome.identity.launch({interactive: true}, function(token) {
            console.log(token);
        });
    });
};