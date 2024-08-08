document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleHandle = toggleSwitch.querySelector('span');
  
    toggleSwitch.addEventListener('click', () => {
      const isChecked = toggleSwitch.getAttribute('aria-checked') === 'true';
      toggleSwitch.setAttribute('aria-checked', !isChecked);
      
      if (isChecked) {
        toggleHandle.classList.remove('translate-x-5');
        toggleHandle.classList.add('translate-x-0');
        toggleSwitch.classList.remove('bg-green-400');
        toggleSwitch.classList.add('bg-gray-200');
      } else {
        toggleHandle.classList.remove('translate-x-0');
        toggleHandle.classList.add('translate-x-5');
        toggleSwitch.classList.remove('bg-gray-200');
        toggleSwitch.classList.add('bg-green-400');
      }
    });
  
    toggleSwitch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleSwitch.click();
      }
    });
  });
  