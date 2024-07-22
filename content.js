const bar = document.createElement('div');
bar.id = 'side-bar';
bar.style.position = 'fixed';
bar.style.backgroundColor = '#333';
bar.style.color = '#fff';
bar.style.textAlign = 'center';
bar.style.zIndex = '10000'; // High z-index to ensure visibility
bar.style.display = 'none'; // Hide initially, will be shown based on settings
document.body.appendChild(bar);

function updateBar() {
  chrome.storage.sync.get(['message', 'barEnabled', 'barHeight', 'barPosition'], (data) => {
    bar.textContent = data.message || 'Default Message';
    bar.style.display = data.barEnabled ? 'block' : 'none';

    // Reset all positions and sizes
    bar.style.top = 'auto';
    bar.style.bottom = 'auto';
    bar.style.left = 'auto';
    bar.style.right = 'auto';
    bar.style.width = 'auto';
    bar.style.height = 'auto';

    // Set position and size based on value
    if (data.barPosition === 'top') {
      bar.style.top = '0';
      bar.style.width = '100%';
      bar.style.height = `${data.barHeight || 100}px`;
    } else if (data.barPosition === 'bottom') {
      bar.style.bottom = '0';
      bar.style.width = '100%';
      bar.style.height = `${data.barHeight || 100}px`;
    } else if (data.barPosition === 'left') {
      bar.style.left = '0';
      bar.style.width = `${data.barHeight || 100}px`; // Use barHeight for width
      bar.style.height = '100vh'; // Use 100vh for full height
    } else if (data.barPosition === 'right') {
      bar.style.right = '0';
      bar.style.width = `${data.barHeight || 100}px`; // Use barHeight for width
      bar.style.height = '100vh'; // Use 100vh for full height
    }
  });
}

// Listen for changes to the storage and update the bar accordingly
chrome.storage.onChanged.addListener(updateBar);
updateBar();

// Ensure the bar updates when the page is loaded or refreshed
document.addEventListener('DOMContentLoaded', updateBar);
