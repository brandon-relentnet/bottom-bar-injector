chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ message: 'Hello, World!', barEnabled: true });
  });
  