function startTyping(text, speed = 80) {
    let currentIndex = 0;
    const outputElement = document.getElementById("typing-effect");

    function typeNextChar() {
        if (currentIndex <= text.length) {
            outputElement.textContent = text.substring(0, currentIndex);
            outputElement.innerHTML += "<span class='cursor'>|</span>";
            currentIndex++;
            setTimeout(typeNextChar, speed);
        } else {
            setInterval(() => {
                const cursor = outputElement.querySelector(".cursor");
                cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
            }, 500);
        }
    }

    typeNextChar();
}

window.addEventListener("load", function() {
    startTyping("Computer Science Student. University of Pisa, Italy.");
});