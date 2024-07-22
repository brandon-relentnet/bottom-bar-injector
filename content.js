const bar = document.createElement('div');
bar.id = 'bottom-bar';
bar.style.position = 'fixed';
bar.style.bottom = '0';
bar.style.left = '0';
bar.style.width = '100%';
bar.style.backgroundColor = '#333';
bar.style.color = '#fff';
bar.style.textAlign = 'center';
bar.style.padding = '10px';
bar.style.zIndex = '1000';
document.body.appendChild(bar);

function updateBar() {
  chrome.storage.sync.get(['message', 'barEnabled'], (data) => {
    bar.textContent = data.message;
    bar.style.display = data.barEnabled ? 'block' : 'none';
  });
}

chrome.storage.onChanged.addListener(updateBar);
updateBar();
