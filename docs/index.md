---
hide:
  - date
  - navigation
  - toc
# template: home.html # Removed this due to 'home.html' not found error
home: true
nostatistics: true
comments: false
icon: fontawesome/solid/house
extra_classes:
  - homepage
---

<br><br><br>
<div class="hero-section">
  <h1 style="text-align: center; font-size: 3em; letter-spacing: 0.1em;">欢迎来到snowfoootball的个人网站</h1>
  <p id="typing-effect" style="text-align: center; font-size: 1.5em; letter-spacing: 0.05em;"></p>
  <!-- 您可以在这里添加更多介绍性文字或按钮 -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('typing-effect');
  const textsToAnimate = [
  "If you cry because the sun has gone out of your life, your tears will prevent you from seeing the stars."
];
  let currentTextIndex = 0;
  let index = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentText = textsToAnimate[currentTextIndex];
    if (!isDeleting && index < currentText.length) {
      textElement.innerHTML = currentText.substring(0, index + 1) + '<span class="cursor"></span>';
      index++;
      setTimeout(typeWriter, 60); // Faster typing
    } else if (isDeleting && index > 0) {
      textElement.innerHTML = currentText.substring(0, index - 1) + '<span class="cursor"></span>';
      index--;
      setTimeout(typeWriter, 30); // Faster deleting
    } else if (!isDeleting && index === currentText.length) {
      // Pause at the end of typing
      setTimeout(() => {
        isDeleting = true;
        setTimeout(typeWriter, 500); // Wait before deleting
      }, 2000);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % textsToAnimate.length; // Move to the next text
      // Pause before typing again
      setTimeout(() => {
          index = 0; // Reset index to start typing from the beginning
          setTimeout(typeWriter, 500); // Wait before re-typing
      }, 1000);
    }
  }
  typeWriter();
});
</script>
