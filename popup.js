document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message');
    const saveButton = document.getElementById('save');
    const toggleButton = document.getElementById('toggle-bar');
  
    chrome.storage.sync.get(['message', 'barEnabled'], (data) => {
      messageInput.value = data.message;
      toggleButton.textContent = data.barEnabled ? 'Turn Off Bar' : 'Turn On Bar';
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
  });
  