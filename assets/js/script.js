// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    // Click event for hamburger menu
    hamburger.addEventListener('click', function() {
      toggleMenu();
    });
    
    // Keyboard support for hamburger menu
    hamburger.addEventListener('keydown', function(e) {
      // Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }
  
  // Function to toggle mobile menu
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-menu-active');
    
    // Update aria-expanded attribute for accessibility
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }
  
  // Close mobile menu when clicking a nav link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navLinks.classList.contains('mobile-menu-active')) {
        navLinks.classList.remove('mobile-menu-active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Add keyboard navigation to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      // Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Simulate click on the first link in the card, if any
        const link = card.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
  });
  
  // Add keyboard support for all buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    if (!button.getAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
    
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Add copy functionality to code blocks
  setupCodeBlockCopy();
});

// Function to setup code block copy functionality
function setupCodeBlockCopy() {
  const codeBlocks = document.querySelectorAll('.project-content pre');
  
  codeBlocks.forEach(block => {
    // Create copy button element
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.setAttribute('tabindex', '0');
    
    // Add click event listener to copy the code
    copyButton.addEventListener('click', () => {
      copyCodeToClipboard(block, copyButton);
    });
    
    // Add keyboard support for copy button
    copyButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyCodeToClipboard(block, copyButton);
      }
    });
    
    // Append button to code block
    block.appendChild(copyButton);
  });
}

// Function to copy code to clipboard
function copyCodeToClipboard(block, button) {
  const code = block.querySelector('code').textContent;
  navigator.clipboard.writeText(code)
    .then(() => {
      // Change button text temporarily to indicate success
      button.textContent = 'Copied!';
      // Set aria-live to announce the change for screen readers
      button.setAttribute('aria-live', 'polite');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.removeAttribute('aria-live');
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy code: ', err);
      button.textContent = 'Failed';
      button.setAttribute('aria-live', 'polite');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.removeAttribute('aria-live');
      }, 2000);
    });
} 