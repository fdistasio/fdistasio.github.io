function startTyping(text, speed = 80) {
    let currentIndex = 0;
    const outputElement = document.getElementById("typing-effect");

    function typeNextChar() {
        if (currentIndex <= text.length) {
            outputElement.textContent = text.substring(0, currentIndex);
            outputElement.innerHTML += createCursorElement();
            currentIndex++;
            setTimeout(typeNextChar, speed);
        } else {
            setInterval(() => {
                toggleCursorVisibility();
            }, 500);
        }
    }

    function createCursorElement() {
        return "<span class='cursor'>|</span>";
    }

    function toggleCursorVisibility() {
        const cursor = outputElement.querySelector(".cursor");
        cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
    }

    typeNextChar();
}

window.addEventListener("load", function() {
    startTyping("Computer Science Student. University of Pisa, Italy.");
});