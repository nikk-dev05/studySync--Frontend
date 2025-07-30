document.addEventListener("DOMContentLoaded", function () {


  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.querySelector(".navbar");

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  
  const sections = document.querySelectorAll("section");
  const navAnchors = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  
  /*const typedText = document.getElementById("typed-text");
  const phrases = [
    "Empower Your Learning Journey",
    "Achieve More with StudySync",
    "Study Anywhere, Anytime",
    "Master Every Concept"
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    typedText.textContent = isDeleting
      ? currentPhrase.substring(0, letterIndex--)
      : currentPhrase.substring(0, letterIndex++);

    if (!isDeleting && letterIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }

    if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
*/
const typedText = document.getElementById("typed-text");
  const phrases = [
    "Empower Your Learning Journey",
    "Achieve More with StudySync",
    "Study Anywhere, Anytime",
    "Master Every Concept"
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let delay = 120;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      letterIndex--;
    } else {
      letterIndex++;
    }

    typedText.textContent = currentPhrase.slice(0, letterIndex);

    if (!isDeleting && letterIndex === currentPhrase.length) {
      delay = 1500; // pause before deleting
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    } else {
      delay = isDeleting ? 50 : 120; // smooth typing speed
    }

    setTimeout(typeEffect, delay);
  }

  requestIdleCallback(typeEffect); // smoother execution
  
  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "Study while others are sleeping; work while others are loafing.",
    "Push yourself, because no one else is going to do it for you.",
    "The expert in anything was once a beginner.",
    "Doubt kills more dreams than failure ever will.",
    "Your future is created by what you do today, not tomorrow."
  ];

  function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").textContent = `"${quote}"`;
  }

  getRandomQuote();

  
  const startBtn = document.getElementById("start-test-btn");
  const testMessage = document.getElementById("test-message");
  const optionsDiv = document.getElementById("options");
  const optionButtons = document.querySelectorAll(".option-btn");
  const result = document.getElementById("result");

  const focusWords = [
    { word: "Productivity", options: ["Focus", "Work", "Productivity", "Goal"] },
    { word: "Discipline", options: ["Routine", "Time", "Discipline", "Attention"] },
    { word: "Consistency", options: ["Effort", "Daily", "Focus", "Consistency"] }
  ];

  let correctAnswer = "";

  startBtn.addEventListener("click", () => {
    const randomSet = focusWords[Math.floor(Math.random() * focusWords.length)];
    correctAnswer = randomSet.word;

    testMessage.textContent = `Remember this word: ${correctAnswer}`;
    result.textContent = "";
    optionsDiv.style.display = "none";
    startBtn.disabled = true;

    setTimeout(() => {
      testMessage.textContent = "Which word did you see?";
      optionsDiv.style.display = "block";

      const shuffled = randomSet.options.sort(() => 0.5 - Math.random());
      optionButtons.forEach((btn, i) => {
        btn.textContent = shuffled[i];
      });
    }, 3000);
  });

  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.textContent;
      result.textContent =
        selected === correctAnswer
          ? "✅ Great! You were focused."
          : `❌ Oops! The correct word was "${correctAnswer}".`;
      result.style.color = selected === correctAnswer ? "green" : "red";
      startBtn.disabled = false;
      optionsDiv.style.display = "none";
    });
  });

  
  const modeToggle = document.getElementById("mode-toggle");
  const heroSection = document.getElementById("hero-section");

  
  const savedMode = localStorage.getItem("hero-mode");
  if (savedMode === "dark") {
    heroSection.classList.add("dark-mode");
    modeToggle.textContent = "☀️";
  }

  modeToggle.addEventListener("click", () => {
    heroSection.classList.toggle("dark-mode");
    const isDark = heroSection.classList.contains("dark-mode");
    modeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("hero-mode", isDark ? "dark" : "light");
  });
  
  const backToTopBtn = document.getElementById("backToTop");
  window.onscroll = function () {
    backToTopBtn.style.display =
      document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
        ? "block"
        : "none";
  };
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  
  const form = document.querySelector("form");
  const responseEl = document.getElementById("response");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("https://formspree.io/f/mldlnvvp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        responseEl.textContent = response.ok
          ? "✅ Thank you! Your message has been sent."
          : "❌ Oops! Something went wrong.";
        form.reset();
        setTimeout(() => {
          responseEl.textContent = "";
        }, 5000);
      })
      .catch(error => {
        console.error(error);
        responseEl.textContent = "❌ Error sending message.";
        setTimeout(() => {
          responseEl.textContent = "";
        }, 5000);
      });
  });

  
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  showTestimonial(currentIndex);

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "Thankyou.html";
  });
}



});