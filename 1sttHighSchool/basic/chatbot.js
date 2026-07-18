document.addEventListener("DOMContentLoaded", () => {
    initChatBot();
});

// --- zoomBot Logic ---
function initChatBot() {
    const toggleBtn = document.getElementById("zoombot-toggle");
    const panel = document.getElementById("zoombot-panel");
    const closeBtn = document.getElementById("zoombot-close-btn");
    
    const messagesContainer = document.getElementById("zoombot-messages");
    const chatInput = document.getElementById("zoombot-input");
    const sendBtn = document.getElementById("zoombot-send");

    // Hardcoded API Key
    const geminiApiKey = "AQ.Ab8RN6IUDzadWcQX61hLp" + "6XoigDsHIwx5zF0iqO9IPy6I9lcSA";

    // Toggle Chat
    toggleBtn.addEventListener("click", () => panel.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => panel.classList.add("hidden"));

    function addMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
        msgDiv.innerHTML = text.replace(/\n/g, "<br>");
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage("user", text);
        chatInput.value = "";

        const typingId = "typing-" + Date.now();
        const typingMsg = document.createElement("div");
        typingMsg.id = typingId;
        typingMsg.className = "bot-msg";
        typingMsg.textContent = "جاري التفكير...";
        messagesContainer.appendChild(typingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-goog-api-key": geminiApiKey
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `أنت المساعد الذكي (zoomBot) الخاص بمنصة (ZoomTech) التعليمية. مهمتك هي مساعدة طلاب الصف الأول الثانوي في مصر على فهم أساسيات البرمجة، الهاردوير، الخوارزميات، ولغة بايثون. ردودك يجب أن تكون: 1. باللغة العربية الفصحى المبسطة جداً والودودة. 2. قصيرة ومباشرة وتفاعلية. 3. يمكنك وضع أمثلة من الحياة اليومية. السؤال هو: ${text}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            document.getElementById(typingId).remove();

            if (data.error) {
                addMessage("bot", "عذراً، حدث خطأ أثناء الاتصال: " + data.error.message);
            } else if (data.candidates && data.candidates[0].content) {
                addMessage("bot", data.candidates[0].content.parts[0].text);
            } else {
                addMessage("bot", "لم أتمكن من صياغة إجابة مناسبة. هل يمكنك توضيح السؤال؟");
            }
        } catch (err) {
            document.getElementById(typingId).remove();
            addMessage("bot", "حدث خطأ في الشبكة، يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        }
    }

    sendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
}
