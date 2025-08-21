// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const mobileToggle = document.getElementById("mobileToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")
const navIcons = document.querySelectorAll(".nav-icon")
const sections = document.querySelectorAll(".section")
const heroButtons = document.querySelectorAll("[data-section]")
const navbar = document.getElementById("navbar")
const morphingShape = document.getElementById("morphingShape")
const skillLevels = document.querySelectorAll(".skill-level")

// Add these variables at the top with other DOM elements
const mobileNavToggle = document.getElementById("mobileNavToggle")
const mobileNavMenu = document.getElementById("mobileNavMenu")
const mobileNavClose = document.getElementById("mobileNavClose")
const mobileNavOverlay = document.getElementById("mobileNavOverlay")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
const mobileThemeToggle = document.getElementById("mobileThemeToggle")

// Theme Management
let isDarkMode = localStorage.getItem("darkMode") === "true"

function initTheme() {
  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    document.body.removeAttribute("data-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode
  localStorage.setItem("darkMode", isDarkMode)

  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    document.body.removeAttribute("data-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }

  // Add rotation animation
  themeToggle.style.transform = "rotate(360deg)"
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0deg)"
  }, 300)
}

// Mobile Navigation Management
let isMobileNavOpen = false

function toggleMobileNav() {
  isMobileNavOpen = !isMobileNavOpen

  if (isMobileNavOpen) {
    mobileNavToggle.classList.add("active")
    mobileNavMenu.classList.add("active")
    mobileNavOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  } else {
    closeMobileNav()
  }
}

function closeMobileNav() {
  isMobileNavOpen = false
  mobileNavToggle.classList.remove("active")
  mobileNavMenu.classList.remove("active")
  mobileNavOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

// Section Management
function showSection(targetSection) {
  // Hide all sections
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const target = document.getElementById(targetSection)
  if (target) {
    target.classList.add("active")
  }

  // Update active nav link (desktop)
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === targetSection) {
      link.classList.add("active")
    }
  })

  // Update active nav icon (desktop)
  navIcons.forEach((icon) => {
    icon.classList.remove("active")
    if (icon.getAttribute("data-section") === targetSection) {
      icon.classList.add("active")
    }
  })

  // Update active mobile nav link
  mobileNavLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === targetSection) {
      link.classList.add("active")
    }
  })

  // Close mobile nav after selection
  if (isMobileNavOpen) {
    closeMobileNav()
  }

  // Animate skill levels if skills section is shown
  if (targetSection === "skills") {
    setTimeout(() => {
      animateSkillLevels()
    }, 500)
  }

  // Animate certificates if certificates section is shown
  if (targetSection === "certificates") {
    setTimeout(() => {
      animateCertificates()
    }, 500)
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Skill Level Animation
function animateSkillLevels() {
  skillLevels.forEach((level) => {
    const percentage = level.getAttribute("data-level")
    level.style.setProperty("--level", percentage + "%")
  })
}

// Add certificate animation function
function animateCertificates() {
  const certificateCards = document.querySelectorAll(".certificate-card")
  certificateCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    }, index * 100)
  })
}

// Morphing Shape Icons
const shapeIcons = [
  "fas fa-rocket",
  "fas fa-star",
  "fas fa-heart",
  "fas fa-bolt",
  "fas fa-gem",
  "fas fa-fire",
  "fas fa-magic",
  "fas fa-crown",
]

let currentIconIndex = 0

function changeMorphingIcon() {
  if (morphingShape) {
    const iconElement = morphingShape.querySelector("i")
    if (iconElement) {
      iconElement.className = shapeIcons[currentIconIndex]
      currentIconIndex = (currentIconIndex + 1) % shapeIcons.length
    }
  }
}

// Contact Form Management
// function handleContactForm(e) {
//   e.preventDefault()

//   const formData = new FormData(e.target)
//   const name = e.target.querySelector('input[type="text"]').value
//   const email = e.target.querySelector('input[type="email"]').value
//   const subject = e.target.querySelectorAll('input[type="text"]')[1].value
//   const message = e.target.querySelector("textarea").value

//   if (!name || !email || !subject || !message) {
//     showNotification("Please fill in all fields", "error")
//     return
//   }

//   const submitBtn = e.target.querySelector('button[type="submit"]')
//   const originalContent = submitBtn.innerHTML

//   submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
//   submitBtn.disabled = true

//   setTimeout(() => {
//     showNotification("Message sent successfully! I'll get back to you soon.", "success")
//     e.target.reset()
//     submitBtn.innerHTML = originalContent
//     submitBtn.disabled = false
//   }, 2000)
// }


// function showAlert(message, type = "info") {
//   const container = document.getElementById("alert-container");

//   const alert = document.createElement("div");
//   alert.className = `alert alert-${type}`;
//   alert.innerHTML = `
//     <span>${message}</span>
//     <button class="close-btn" onclick="this.parentElement.remove()">×</button>
//   `;

//   container.appendChild(alert);

//   // Auto remove after 3 seconds
//   setTimeout(() => {
//     if (alert.parentElement) {
//       alert.remove();
//     }
//   }, 3000);
// }



function handleButtonSubmit(form) {
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("btnSpinner");

  // Change text to "Sending..." and show spinner
  btnText.textContent = "Sending...";
  spinner.classList.remove("hidden");

  // Submit the form after 2 seconds
  setTimeout(() => {
    form.submit();
  }, 2000);

  return false; // prevent default submit now
}


window.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.classList.add("opacity-0");
      setTimeout(() => alert.remove(), 500); // remove after fade out
    }, 3000);
  });
});
// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
    </div>
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Scroll Animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Special animation for project cards
        if (entry.target.classList.contains("project-card")) {
          entry.target.style.animationDelay = Math.random() * 0.5 + "s"
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".about-card, .project-card, .contact-card, .skill-category")
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(50px)"
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`
    observer.observe(el)
  })
}

// Particle Cursor Effect
function createCursorEffect() {
  const cursor = document.createElement("div")
  cursor.className = "cursor-effect"
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, var(--primary-color), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
    cursor.style.opacity = "0.6"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Parallax Effect for Background Shapes
function handleParallax() {
  const shapes = document.querySelectorAll(".shape")
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1
    shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`
  })
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Navigation icons
  navIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const targetSection = icon.getAttribute("data-section")
      showSection(targetSection)

      // Add click animation
      icon.style.transform = "scale(0.9)"
      setTimeout(() => {
        icon.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Add footer links navigation
  const footerLinks = document.querySelectorAll(".footer-links a")
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetSection = link.getAttribute("data-section")
      if (targetSection) {
        showSection(targetSection)
      }
    })
  })

  // Mobile navigation toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", toggleMobileNav)
  }

  // Mobile navigation close
  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileNav)
  }

  // Mobile navigation overlay
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMobileNav)
  }

  // Mobile navigation links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetSection = link.getAttribute("data-section")
      showSection(targetSection)
    })
  })

  // Mobile theme toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", () => {
      toggleTheme()
      // Update mobile theme toggle icon
      if (isDarkMode) {
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Toggle Theme</span>'
      } else {
        mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Toggle Theme</span>'
      }
    })
  }

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetSection = link.getAttribute("data-section")
      showSection(targetSection)
    })
  })

  // Hero buttons
  heroButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetSection = button.getAttribute("data-section")
      if (targetSection) {
        showSection(targetSection)
      }
    })
  })

  // Contact form
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isMobileNavOpen &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target) &&
      !mobileNavMenu.contains(e.target) &&
      !mobileNavToggle.contains(e.target)
    ) {
      closeMobileNav()
    }
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileNavOpen) {
      closeMobileNav()
    }
  })

  // Initialize animations
  addScrollAnimations()

  // Create cursor effect
  createCursorEffect()

  // Change morphing shape icon every 3 seconds
  setInterval(changeMorphingIcon, 3000)

  // Parallax effect
  window.addEventListener("scroll", debounce(handleParallax, 10))

  // Add loaded class
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll(".btn, .nav-icon, .project-card, .about-card")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = element.style.transform + " scale(1.02)"
    })
    element.addEventListener("mouseleave", () => {
      element.style.transform = element.style.transform.replace(" scale(1.02)", "")
    })
  })

  // Enhanced responsive optimizations
  function handleResponsiveChanges() {
    const width = window.innerWidth

    // Adjust floating elements based on screen size
    const floatingElements = document.querySelectorAll(".float-element")
    floatingElements.forEach((element, index) => {
      if (width < 640) {
        element.style.display = index < 2 ? "flex" : "none"
      } else if (width < 768) {
        element.style.display = index < 3 ? "flex" : "none"
      } else {
        element.style.display = "flex"
      }
    })

    // Adjust background shapes for performance on mobile
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
      if (width < 480) {
        shape.style.display = index < 3 ? "block" : "none"
      } else if (width < 768) {
        shape.style.display = index < 4 ? "block" : "none"
      } else {
        shape.style.display = "block"
      }
    })

    // Optimize animations for mobile
    if (width < 768) {
      document.body.style.setProperty("--blur", "blur(10px)")
    } else {
      document.body.style.setProperty("--blur", "blur(20px)")
    }
  }

  // Handle orientation changes
  function handleOrientationChange() {
    setTimeout(() => {
      handleResponsiveChanges()
      // Recalculate morphing shape position
      const morphingShape = document.getElementById("morphingShape")
      if (morphingShape) {
        morphingShape.style.transform = "none"
        setTimeout(() => {
          morphingShape.style.transform = ""
        }, 100)
      }
    }, 100)
  }

  // Touch device optimizations
  function optimizeForTouch() {
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device")

      // Add touch-friendly interactions
      const interactiveElements = document.querySelectorAll(".nav-icon, .btn, .project-card")
      interactiveElements.forEach((element) => {
        element.addEventListener(
          "touchstart",
          function () {
            this.style.transform = "scale(0.98)"
          },
          { passive: true },
        )

        element.addEventListener(
          "touchend",
          function () {
            setTimeout(() => {
              this.style.transform = ""
            }, 150)
          },
          { passive: true },
        )
      })
    }
  }

  // Initialize responsive features
  handleResponsiveChanges()
  optimizeForTouch()

  // Add event listeners for responsive changes
  window.addEventListener("resize", debounce(handleResponsiveChanges, 100))
  window.addEventListener("orientationchange", handleOrientationChange)

  // Close mobile nav on window resize if open
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && isMobileNavOpen) {
      closeMobileNav()
    }
  })
})

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    // Recalculate animations on resize
    addScrollAnimations()
  }, 250),
)

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.altKey) {
    switch (e.key) {
      case "1":
        showSection("home")
        break
      case "2":
        showSection("about")
        break
      case "3":
        showSection("skills")
        break
      case "4":
        showSection("certificates")
        break
      case "5":
        showSection("projects")
        break
      case "6":
        showSection("contact")
        break
      case "t":
        toggleTheme()
        break
    }
  }
})

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Initialize non-critical animations
    console.log("Portfolio loaded and optimized!")
  })
}
