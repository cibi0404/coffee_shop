/* ==========================================================================
   Aroma Cafe - Premium Login & Registration Page Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const tabSlider = document.getElementById('tab-slider');
  const tabSignIn = document.getElementById('tab-signin-trigger');
  const tabSignUp = document.getElementById('tab-signup-trigger');
  const signinPanel = document.getElementById('signin-panel');
  const signupPanel = document.getElementById('signup-panel');
  
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  
  const loadingOverlay = document.getElementById('loading-overlay');
  
  const forgotPasswordTrigger = document.getElementById('forgot-password-trigger');
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const forgotForm = document.getElementById('forgot-password-form');
  const modalSuccessState = document.getElementById('modal-success-state');
  const sentEmailDisplay = document.getElementById('sent-email-display');
  
  const formInputs = document.querySelectorAll('.form-input');
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  
  const signupPassword = document.getElementById('signup-password');
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');
  const strengthContainer = document.getElementById('strength-container');
  
  const termsAgree = document.getElementById('terms-agree');
  const termsError = document.getElementById('terms-error');

  const toastContainer = document.getElementById('toast-container');
  const visualSide = document.getElementById('visual-side');

  /* ==========================================================================
     1. Animated Cafe Stats Count-up
     ========================================================================== */
  const animateStats = () => {
    const statMembers = document.getElementById('stat-members');
    const statRating = document.getElementById('stat-rating');
    
    // Animate Member count from 0 to 15
    let membersCount = 0;
    const membersInterval = setInterval(() => {
      membersCount += 1;
      if (membersCount >= 15) {
        clearInterval(membersInterval);
        statMembers.textContent = "15K+";
      } else {
        statMembers.textContent = membersCount + "K+";
      }
    }, 50);

    // Animate Rating from 0 to 4.9
    let ratingCount = 0.0;
    const ratingInterval = setInterval(() => {
      ratingCount += 0.1;
      if (ratingCount >= 4.9) {
        clearInterval(ratingInterval);
        statRating.innerHTML = `4.9 <i class="fa-solid fa-star gold-star"></i>`;
      } else {
        statRating.innerHTML = `${ratingCount.toFixed(1)} <i class="fa-solid fa-star gold-star"></i>`;
      }
    }, 25);
  };
  
  // Trigger stat animations on load
  setTimeout(animateStats, 600);


  /* ==========================================================================
     2. Tab Navigation Switcher (Sign In vs Sign Up)
     ========================================================================== */
  const switchTab = (tab) => {
    if (tab === 'signin') {
      tabSlider.style.transform = 'translateX(0)';
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      
      signinPanel.style.display = 'block';
      setTimeout(() => {
        signinPanel.classList.add('active');
        signupPanel.classList.remove('active');
        signupPanel.style.display = 'none';
      }, 50);
    } else {
      // Width of slider container is halved. Translate by 100% of its width.
      tabSlider.style.transform = 'translateX(100%)';
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      
      signupPanel.style.display = 'block';
      setTimeout(() => {
        signupPanel.classList.add('active');
        signinPanel.classList.remove('active');
        signinPanel.style.display = 'none';
      }, 50);
    }
  };

  tabSignIn.addEventListener('click', () => switchTab('signin'));
  tabSignUp.addEventListener('click', () => switchTab('signup'));


  /* ==========================================================================
     3. Floating Labels & Focus States
     ========================================================================== */
  formInputs.forEach(input => {
    // Check initial state (useful if autofilled)
    if (input.value !== '') {
      input.classList.add('has-content');
    }
    
    input.addEventListener('focus', () => {
      input.classList.add('has-content');
      // Clear errors on focus
      clearInputError(input);
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.classList.remove('has-content');
      }
      validateInputOnBlur(input);
    });

    input.addEventListener('input', () => {
      if (input.value !== '') {
        input.classList.add('has-content');
      }
    });
  });


  /* ==========================================================================
     4. Password Visibility Toggle
     ========================================================================== */
  passwordToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      const passwordInput = passwordInputs[index];
      const eyeIcon = toggle.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
      }
    });
  });


  /* ==========================================================================
     5. Real-Time Password Strength Meter
     ========================================================================== */
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (!password) return 0;

    // Award points for various criteria
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  };

  signupPassword.addEventListener('input', () => {
    const password = signupPassword.value;
    
    if (password.length > 0) {
      strengthContainer.style.display = 'block';
    } else {
      strengthContainer.style.display = 'none';
      return;
    }

    const score = checkPasswordStrength(password);
    let barWidth = '0%';
    let barColor = '';
    let labelText = '';

    switch (score) {
      case 0:
      case 1:
        barWidth = '20%';
        barColor = 'var(--clr-error)';
        labelText = 'Very Weak - Add letters and symbols';
        break;
      case 2:
        barWidth = '40%';
        barColor = '#f4a261';
        labelText = 'Weak - Keep going!';
        break;
      case 3:
        barWidth = '60%';
        barColor = '#e9c46a';
        labelText = 'Moderate - Decent roast, but could be stronger';
        break;
      case 4:
        barWidth = '80%';
        barColor = '#a7c957';
        labelText = 'Strong - Premium Espresso quality!';
        break;
      case 5:
        barWidth = '100%';
        barColor = 'var(--clr-success)';
        labelText = 'Robust - Double-shot Espresso strength!';
        break;
    }

    strengthBar.style.width = barWidth;
    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = labelText;
    strengthLabel.style.color = barColor;
  });


  /* ==========================================================================
     6. Validation Helper Functions
     ========================================================================== */
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const showInputError = (input, message) => {
    const group = input.closest('.input-group');
    group.classList.add('has-error');
    group.classList.remove('has-success');
    const errorSpan = group.querySelector('.error-text');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  };

  const showInputSuccess = (input) => {
    const group = input.closest('.input-group');
    group.classList.remove('has-error');
    group.classList.add('has-success');
  };

  const clearInputError = (input) => {
    const group = input.closest('.input-group');
    group.classList.remove('has-error');
  };

  const validateInputOnBlur = (input) => {
    const val = input.value.trim();
    
    if (val === '') {
      // Don't flag empty inputs immediately on blur unless it's required (just clean errors)
      clearInputError(input);
      return;
    }

    if (input.type === 'email') {
      if (!validateEmail(val)) {
        showInputError(input, 'Please enter a valid email address.');
      } else {
        showInputSuccess(input);
      }
    } else if (input.id === 'signup-password') {
      if (val.length < 8) {
        showInputError(input, 'Password must be at least 8 characters.');
      } else {
        showInputSuccess(input);
      }
    } else if (input.id === 'signup-name') {
      if (val.length < 2) {
        showInputError(input, 'Please enter your full name (2+ characters).');
      } else {
        showInputSuccess(input);
      }
    } else if (input.type === 'password' && input.id === 'signin-password') {
      showInputSuccess(input);
    }
  };


  /* ==========================================================================
     7. Toast Notification Handler
     ========================================================================== */
  const showToast = (title, message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';
    
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close Toast">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
      dismissToast(toast);
    });
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(toast);
    }, 4000);
  };

  const dismissToast = (toast) => {
    toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  };


  /* ==========================================================================
     8. Simulated Backend Loader Animation
     ========================================================================== */
  const simulateBrewing = (successCallback) => {
    loadingOverlay.classList.add('active');
    
    // Reset cup animation fill
    const coffeeFill = document.querySelector('.coffee-fill');
    coffeeFill.style.animation = 'none';
    coffeeFill.offsetHeight; // Trigger reflow
    coffeeFill.style.animation = 'fillCup 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    
    setTimeout(() => {
      loadingOverlay.classList.remove('active');
      if (successCallback) successCallback();
    }, 2400);
  };


  /* ==========================================================================
     9. Form Submission Handling
     ========================================================================== */
  
  // Sign In Submission
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    let hasErrors = false;
    
    if (!validateEmail(emailInput.value)) {
      showInputError(emailInput, 'Please enter a valid email address.');
      hasErrors = true;
    } else {
      showInputSuccess(emailInput);
    }
    
    if (passwordInput.value.trim() === '') {
      showInputError(passwordInput, 'Password cannot be empty.');
      hasErrors = true;
    } else {
      showInputSuccess(passwordInput);
    }
    
    if (hasErrors) {
      showToast('Validation Error', 'Please complete the credentials carefully.', 'error');
      return;
    }
    
    // Proceed to simulated brewing loader
    simulateBrewing(() => {
      showToast('Welcome Back!', 'Your fresh cup and club dashboard are ready.', 'success');
      // Clear forms
      signinForm.reset();
      formInputs.forEach(i => i.classList.remove('has-content', 'has-success'));
    });
  });

  // Sign Up Submission
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    let hasErrors = false;
    
    if (nameInput.value.trim().length < 2) {
      showInputError(nameInput, 'Please enter your full name (2+ characters).');
      hasErrors = true;
    } else {
      showInputSuccess(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
      showInputError(emailInput, 'Please enter a valid email address.');
      hasErrors = true;
    } else {
      showInputSuccess(emailInput);
    }
    
    if (passwordInput.value.length < 8) {
      showInputError(passwordInput, 'Password must be at least 8 characters.');
      hasErrors = true;
    } else {
      showInputSuccess(passwordInput);
    }
    
    if (!termsAgree.checked) {
      termsError.style.display = 'block';
      hasErrors = true;
    } else {
      termsError.style.display = 'none';
    }
    
    if (hasErrors) {
      showToast('Membership Pending', 'Kindly fill in all requirements correctly.', 'error');
      return;
    }
    
    // Proceed to simulated brewing loader
    simulateBrewing(() => {
      showToast('Account Created!', `Welcome to the Club, ${nameInput.value}! Free brew points added.`, 'success');
      signupForm.reset();
      formInputs.forEach(i => i.classList.remove('has-content', 'has-success'));
      strengthContainer.style.display = 'none';
      // Switch back to login page
      switchTab('signin');
    });
  });
  
  termsAgree.addEventListener('change', () => {
    if (termsAgree.checked) {
      termsError.style.display = 'none';
    }
  });


  /* ==========================================================================
     10. Forgot Password Modal Controller
     ========================================================================== */
  const toggleModal = (action) => {
    if (action === 'open') {
      forgotPasswordModal.classList.add('active');
      setTimeout(() => {
        document.getElementById('forgot-email').focus();
      }, 300);
    } else {
      forgotPasswordModal.classList.remove('active');
      // Reset modal forms after fade out
      setTimeout(() => {
        forgotForm.reset();
        modalSuccessState.classList.remove('active');
        const input = document.getElementById('forgot-email');
        input.classList.remove('has-content');
        clearInputError(input);
      }, 400);
    }
  };

  forgotPasswordTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModal('open');
  });

  modalCloseBtn.addEventListener('click', () => toggleModal('close'));
  successCloseBtn.addEventListener('click', () => toggleModal('close'));
  
  // Close modal when clicking backdrop
  forgotPasswordModal.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
      toggleModal('close');
    }
  });

  // Forgot password form submission
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('forgot-email');
    
    if (!validateEmail(emailInput.value)) {
      showInputError(emailInput, 'Please enter a valid email address.');
      return;
    }
    
    // Show success overlay in modal
    sentEmailDisplay.textContent = emailInput.value;
    modalSuccessState.classList.add('active');
    showToast('Link Dispatched', 'A secret recipe recovery link is on its way.', 'success');
  });


  /* ==========================================================================
     11. Social Media Login Placeholders
     ========================================================================== */
  const googleBtn = document.getElementById('google-login-btn');
  const appleBtn = document.getElementById('apple-login-btn');
  
  const triggerSocialLogin = (provider) => {
    simulateBrewing(() => {
      showToast('Connected via Social', `Successfully logged in via ${provider}!`, 'success');
    });
  };

  googleBtn.addEventListener('click', () => triggerSocialLogin('Google'));
  appleBtn.addEventListener('click', () => triggerSocialLogin('Apple'));


  /* ==========================================================================
     12. Ambient Canvas Particles System (Warm Aroma Embers)
     ========================================================================== */
  const initAmbientCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1.5'; // Behind content, above visual overlay
    
    visualSide.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = visualSide.offsetWidth;
    let height = canvas.height = visualSide.offsetHeight;
    
    const particles = [];
    const maxParticles = 35;
    
    // Handle resize
    window.addEventListener('resize', () => {
      if (visualSide.offsetWidth > 0) {
        width = canvas.width = visualSide.offsetWidth;
        height = canvas.height = visualSide.offsetHeight;
      }
    });
    
    class SmokeParticle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 50 + 20;
        this.speedY = -(Math.random() * 0.4 + 0.15);
        this.speedX = (Math.random() * 0.2 - 0.1);
        this.alpha = 0.0;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.color = Math.random() > 0.5 ? 'rgba(245, 235, 230,' : 'rgba(198, 138, 76,'; // Latte froth cream or Caramel gold color
        this.maxLife = Math.random() * 400 + 400;
        this.life = 0;
      }
      
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.15; // Slow wavy float
        this.life++;
        
        // Custom fade-in and fade-out life cycle
        if (this.life < 100) {
          this.alpha += 0.0015;
        } else if (this.life > this.maxLife - 100) {
          this.alpha -= 0.0015;
        }
        
        if (this.alpha < 0) this.alpha = 0;
        if (this.alpha > 0.15) this.alpha = 0.15; // Keep it very subtle
        
        if (this.y < -this.size || this.life >= this.maxLife) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `${this.color}${this.alpha})`);
        gradient.addColorStop(0.5, `${this.color}${this.alpha * 0.4})`);
        gradient.addColorStop(1, `${this.color}0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Seed particles
    for (let i = 0; i < maxParticles; i++) {
      const p = new SmokeParticle();
      // Scatter initial positions vertically so they don't all rise from the bottom together
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      p.alpha = Math.random() * 0.12;
      particles.push(p);
    }
    
    const animate = () => {
      // Don't draw if visualSide is hidden (mobile screen layout)
      if (visualSide.offsetWidth > 0) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  // Init particle system
  initAmbientCanvas();
});