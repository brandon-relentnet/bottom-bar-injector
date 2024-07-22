document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message');
    const saveButton = document.getElementById('save');
    const toggleButton = document.getElementById('toggle-bar');
    const heightSlider = document.getElementById('height-slider');
    const positionDropdown = document.getElementById('position-dropdown');
  
    chrome.storage.sync.get(['message', 'barEnabled', 'barHeight', 'barPosition'], (data) => {
      messageInput.value = data.message;
      toggleButton.textContent = data.barEnabled ? 'Turn Off Bar' : 'Turn On Bar';
      heightSlider.value = data.barHeight || 100;
      positionDropdown.value = data.barPosition || 'bottom';
    });
  
    saveButton.addEventListener('click', () => {
      const message = messageInput.value;
      chrome.storage.sync.set({ message });
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.sync.get('barEnabled', (data) => {
        const barEnabled = !data.barEnabled;
        chrome.storage.sync.set({ barEnabled });
        toggleButton.textContent = barEnabled ? 'Turn Off Bar' : 'Turn On Bar';
      });
    });
  
    heightSlider.addEventListener('input', () => {
      const barHeight = heightSlider.value;
      chrome.storage.sync.set({ barHeight });
    });
  
    positionDropdown.addEventListener('change', () => {
      const barPosition = positionDropdown.value;
      chrome.storage.sync.set({ barPosition }, () => {
        // Update the heightSlider value to reflect the current size of the bar
        chrome.storage.sync.get('barHeight', (data) => {
          heightSlider.value = data.barHeight || 100;
        });
      });
    });
  });
  