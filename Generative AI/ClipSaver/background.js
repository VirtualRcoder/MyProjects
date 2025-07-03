chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveText") {
      //console.log(message)
      saveTextToStorage(message.text);
    
      purgeExpiredData();
      // const value = { a: '1', b: '2', c: '3' };

      // // Save to Chrome storage
      // chrome.storage.local.set({ myKey: value }, function () {
      //   console.log('Value is saved to Chrome storage!');
      // });

      // // Retrieve the value
      // chrome.storage.local.get(['myKey'], function (result) {
      //   if (result.myKey) {
      //       console.log('Retrieved value:', result.myKey);
      //   } else {
      //       console.log('No value found for "myKey"');
      //   }
      // });


      sendResponse({ status: "success", message: "Text saved successfully" });
    }
  });
  
  function saveTextToStorage(text) {
    const timestamp = Date.now();
    chrome.storage.local.get(['savedData' ], (result) => {
      const savedText = result.savedData || [];
      savedText.push({ key: text, value: timestamp });
      console.log("savetextToStorage: ",savedText)
      chrome.storage.local.set({ savedData: savedText }, () => {
        
        if (chrome.runtime.lastError) {
          console.error("Error saving text:", chrome.runtime.lastError.message);
        } else {
          console.log("Text saved:", text);
        }
      });
      
    });
  }
  
  function purgeExpiredData() {
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();
  
    chrome.storage.local.get(['savedData'], (result) => {
    console.log("Purge:", result.savedData)
      const savedText = result.savedData || [];
      // const filteredText = savedText.filter(item => now - item.timestamp < oneMonth);
      //console.log("Purge2: ", savedText)
      // chrome.storage.local.set({ savedData: filteredText }, () => {
      //   if (chrome.runtime.lastError) {
      //     console.error("Error purging expired data:", chrome.runtime.lastError.message);
      //   } else {
      //     console.log("Expired data purged");
      //   }
      // });
    });
  }
  