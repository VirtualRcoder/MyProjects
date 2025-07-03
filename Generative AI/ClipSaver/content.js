document.addEventListener("copy", () => {
    const copiedText = document.getSelection()?.toString();
    if (copiedText) {
      showSaveButton(copiedText);
    }
  });
  
  function showSaveButton(text) {
    const existingButton = document.getElementById("save-copy-button");
    if (existingButton) existingButton.remove();
  
    const button = document.createElement("button");
    button.id = "save-copy-button";
    button.textContent = "Save Text";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "10000";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "10px 20px";
    button.style.borderRadius = "5px";
    button.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.3)";
    button.style.cursor = "pointer";
    
    button.addEventListener("click", () => {
      saveCopiedText(text);
      button.remove();
    });
  
    document.body.appendChild(button);
  }
  
  function saveCopiedText(text) {
    // Check if the extension context is valid
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage({ action: "saveText", text }, response => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
            //alert(response.status)
            console.log("Text saved successfully:", response.message);
        }
      });
    } else {
      console.warn("Extension context invalidated. Unable to send message.");
    }
  }
  