chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "unlock") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            console.log("Unlocking tab", tabId);
            if (chrome.scripting) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabId },
                        files: ["content.js"],
                    },
                    () => {
                        sendResponse({ message: "Đăng nhập thành công!" });
                    }
                );
            } else {
                chrome.tabs.executeScript(tabId, { file: "content.js" }, () => {
                    sendResponse({ message: "Đăng nhập thành công!" });
                });
            }
        });

        return true;
    }
});
