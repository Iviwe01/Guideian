// auth.js - Enhanced Authentication System
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const signupPassword = document.getElementById('signupPassword');
  const strengthBars = document.querySelectorAll('.strength-bar');
  const strengthLabel = document.getElementById('strengthLabel');
  const passwordRequirements = document.querySelectorAll('.password-requirements li');
  const forgotPasswordLink = document.getElementById('forgotPassword');
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  // Password strength levels
  const strengthLevels = [
    { label: 'Very Weak', color: '#ef4444', width: '25%' },
    { label: 'Weak', color: '#f59e0b', width: '50%' },
    { label: 'Medium', color: '#f59e0b', width: '75%' },
    { label: 'Strong', color: '#10b981', width: '100%' }
  ];

  // User database (in a real app, this would be server-side)
  let userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];

  // Initialize password toggle buttons
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const isPassword = passwordInput.type === 'password';
      
      passwordInput.type = isPassword ? 'text' : 'password';
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // Check password strength
  signupPassword?.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    // Check password requirements
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Update requirement indicators
    passwordRequirements?.forEach((li, index) => {
      let isValid = false;
      switch(index) {
        case 0: isValid = hasLength; break;
        case 1: isValid = hasUppercase; break;
        case 2: isValid = hasNumber; break;
        case 3: isValid = hasSpecial; break;
      }
      li.classList.toggle('valid', isValid);
    });
    
    // Calculate strength
    if (hasLength) strength++;
    if (hasUppercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;
    
    // Update strength meter
    if (strength > 0) {
      const strengthLevel = strengthLevels[strength - 1];
      strengthLabel.textContent = strengthLevel.label;
      strengthLabel.style.color = strengthLevel.color;
      
      strengthBars.forEach((bar, index) => {
        bar.style.backgroundColor = index < strength ? strengthLevel.color : '#e5e7eb';
        bar.style.width = index < strength ? strengthLevel.width : '0%';
      });
    }
  });

  // Handle login form submission
  loginForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    // Find user in database
    const user = userDatabase.find(u => u.email === email);
    
    if (!user) {
      showError('No account found with this email');
      return;
    }

    // Verify password - IMPORTANT: In real app, use proper password hashing
    if (user.password !== password) {
      showError('Incorrect password');
      return;
    }

    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

    // Simulate network delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store user session
    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // Redirect to profile page
    window.location.href = 'profile.html';
  });

  // Handle signup form submission
  signupForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match!');
      return;
    }

    if (!acceptTerms) {
      showError('You must accept the terms and conditions');
      return;
    }

    // Check if email already exists
    if (userDatabase.some(u => u.email === email)) {
      showError('This email is already registered. Please login instead.');
      return;
    }

    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

    // Simulate network delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new user with basic profile structure
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // WARNING: In production, NEVER store plain text passwords
      profileComplete: false,
      profileData: {
        personalInfo: {
          fullName: `${firstName} ${lastName}`,
          dob: '',
          idNumber: '',
          phone: '',
          address: '',
          profileImage: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=3328bf&color=fff`
        },
        academicInfo: {
          currentGrade: '',
          schoolName: '',
          academicYear: new Date().getFullYear(),
          academicStream: ''
        },
        subjects: [],
        goals: {
          careerInterest: '',
          universityGoals: '',
          receiveRecommendations: true
        }
      },
      createdAt: new Date().toISOString()
    };

    // Add to database
    userDatabase.push(newUser);
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    
    // Set as current user and redirect to profile setup
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = 'profile-setup.html';
  });

  // Forgot password flow
  forgotPasswordLink?.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordModal.style.display = 'flex';
  });

  forgotPasswordForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();

    if (!email) {
      showError('Please enter your email address');
      return;
    }

    // Show loading state
    const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Check if email exists
    const userExists = userDatabase.some(u => u.email === email);

    // Simulate network delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Always show success message (for security, don't reveal if email exists)
    this.style.display = 'none';
    document.querySelector('.reset-success').style.display = 'block';

    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Reset Link';

    // Hide after 5 seconds
    setTimeout(() => {
      forgotPasswordModal.style.display = 'none';
      this.style.display = 'block';
      document.querySelector('.reset-success').style.display = 'none';
      this.reset();
    }, 5000);
  });

  // Close modals
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Helper Functions
  function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.auth-error');
    if (existingError) existingError.remove();

    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'auth-error';
    errorEl.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    
    // Insert after the form header or at the top of the form
    const formHeader = document.querySelector('.auth-header') || 
                      document.querySelector('.auth-form');
    formHeader.after(errorEl);
    
    // Scroll to error
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});