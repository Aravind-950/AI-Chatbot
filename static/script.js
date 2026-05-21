const chatBox = document.getElementById("chat-box");

async function sendMessage() {

    const userInput =
    document.getElementById("user-input");

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    // USER MESSAGE
    chatBox.innerHTML += `
        <div class="user-message">
            <b>You:</b> ${message}
        </div>
    `;

    // SAVE USER CHAT
    localStorage.setItem(
        "chatData",
        chatBox.innerHTML
    );

    // AUTO SCROLL
    chatBox.scrollTop =
    chatBox.scrollHeight;

    // CLEAR INPUT
    userInput.value = "";

    // TYPING ANIMATION
    chatBox.innerHTML += `
        <div class="bot-message" id="typing">
            Typing...
        </div>
    `;

    chatBox.scrollTop =
    chatBox.scrollHeight;

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        // REMOVE TYPING
        document
        .getElementById("typing")
        .remove();

        // BOT MESSAGE
        chatBox.innerHTML += `
            <div class="bot-message">
                <b>Bot:</b> ${data.reply}
            </div>
        `;

        // SAVE CHAT
        localStorage.setItem(
            "chatData",
            chatBox.innerHTML
        );

        // AUTO SCROLL
        chatBox.scrollTop =
        chatBox.scrollHeight;

    } catch (error) {

        document
        .getElementById("typing")
        .remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                Error occurred!
            </div>
        `;
    }
}

// ENTER KEY SUPPORT
document
.getElementById("user-input")
.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    }
);

// DARK MODE
function toggleDarkMode() {

    document.body.classList.toggle("dark");

}

// VOICE INPUT
function startVoice() {

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult =
    function(event) {

        document
        .getElementById("user-input")
        .value =
        event.results[0][0].transcript;

    };

    recognition.start();

}

// LOAD SAVED CHAT
window.onload = function() {

    const savedChat =
    localStorage.getItem("chatData");

    if (savedChat) {

        chatBox.innerHTML =
        savedChat;

    }

};
