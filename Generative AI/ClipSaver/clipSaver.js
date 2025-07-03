document.addEventListener("DOMContentLoaded", () => {
  const textList = document.getElementById("text-list");
  // const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  
  //alert("You are in clipsaver")
  // var sData = []
  chrome.storage.local.get(['savedData' ], (result) => {
    const value = result.savedData
    value.forEach(item => {
      // alert(`: ${item.value}`);
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = 'Delete';
      btn.style.backgroundColor = 'black';
      btn.style.color = 'red';
      btn.onclick = del(`${item.value}`)
      li.textContent = `${item.key}`;
      textList.appendChild(li);
      textList.appendChild(btn);
  });
  })
function del(val){
    chrome.storage.local.get(['savedData'], (result)=>{
      let value = result.savedData
      // console.log(value)
      console.log(typeof(val))
      value = value.filter(item =>item.value.toString() !== val.toString())
      chrome.storage.local.set({ savedData: value }, () => {
        console.log(value)
        if (chrome.runtime.lastError) {
          console.error("Error saving text:", chrome.runtime.lastError.message);
        } else {
          console.log("Item Deleted");
        }
      });
    })
  }
  // alert(sData)
  // console.log("Saved Text: ", savedData)
  // sData.forEach(item => {
  //   const li = document.createElement("li");
  //   li.textContent = item.text;
  //   textList.appendChild(li);
  // });
});
