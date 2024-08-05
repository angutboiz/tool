document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        // Gửi văn bản đã chọn đến background.js
        chrome.runtime.sendMessage({ action: "textSelected", text: selectedText });
    }
});
