// setup.js - Enhanced Profile Setup System
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const setupForm = document.getElementById('profileSetupForm');
  const steps = document.querySelectorAll('.setup-step');
  const progressFill = document.getElementById('progressFill');
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');
  const submitBtn = document.getElementById('submitProfileBtn');
  const profileImageInput = document.getElementById('profileImage');
  const previewImage = document.getElementById('previewImage');
  const subjectOptions = document.getElementById('subjectOptions');
  const selectedSubjectsList = document.getElementById('selectedSubjectsList');
  const selectedSubjectsCount = document.getElementById('selectedSubjectsCount');
  const subjectSearch = document.getElementById('subjectSearch');
  const categoryButtons = document.querySelectorAll('.subject-category-btn');
  const addSubjectModal = document.getElementById('addSubjectModal');
  const subjectForm = document.getElementById('subjectForm');
  
  // Current step tracking
  let currentStep = 1;
  const totalSteps = steps.length;
  
  // Sample subject data
  const allSubjects = [
    { name: 'Mathematics', category: 'math', levels: ['HL', 'SL'] },
    { name: 'Physical Sciences', category: 'science', levels: ['HL', 'SL'] },
    { name: 'Life Sciences', category: 'science', levels: ['HL', 'SL'] },
    { name: 'English Home Language', category: 'language', levels: ['HL', 'SL'] },
    { name: 'Afrikaans First Additional', category: 'language', levels: ['SL'] },
    { name: 'Life Orientation', category: 'humanities', levels: ['SL'] },
    { name: 'Geography', category: 'humanities', levels: ['HL', 'SL'] },
    { name: 'History', category: 'humanities', levels: ['HL', 'SL'] },
    { name: 'Accounting', category: 'commerce', levels: ['HL', 'SL'] },
    { name: 'Business Studies', category: 'commerce', levels: ['HL', 'SL'] },
    { name: 'Economics', category: 'commerce', levels: ['HL', 'SL'] },
    { name: 'Computer Applications Technology', category: 'technology', levels: ['SL'] },
    { name: 'Information Technology', category: 'technology', levels: ['HL', 'SL'] },
    { name: 'Dramatic Arts', category: 'arts', levels: ['HL', 'SL'] },
    { name: 'Visual Arts', category: 'arts', levels: ['HL', 'SL'] },
    { name: 'Music', category: 'arts', levels: ['HL', 'SL'] }
  ];
  
  // User's selected subjects
  let selectedSubjects = [];
  
  // Initialize the setup
  function initSetup() {
    // Load current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    // If user already has profile data, pre-fill the form
    if (currentUser.profileData) {
      const { personalInfo, academicInfo } = currentUser.profileData;
      
      // Personal Info
      if (personalInfo) {
        document.getElementById('fullName').value = personalInfo.fullName || '';
        document.getElementById('dob').value = personalInfo.dob || '';
        document.getElementById('idNumber').value = personalInfo.idNumber || '';
        document.getElementById('phone').value = personalInfo.phone || '';
        document.getElementById('address').value = personalInfo.address || '';
        
        if (personalInfo.profileImage) {
          previewImage.src = personalInfo.profileImage;
        }
      }
      
      // Academic Info
      if (academicInfo) {
        document.getElementById('currentGrade').value = academicInfo.currentGrade || '';
        document.getElementById('schoolName').value = academicInfo.schoolName || '';
        document.getElementById('academicYear').value = academicInfo.academicYear || new Date().getFullYear();
        document.getElementById('academicStream').value = academicInfo.academicStream || '';
      }
      
      // Subjects
      if (currentUser.profileData.subjects) {
        selectedSubjects = currentUser.profileData.subjects;
        updateSelectedSubjectsList();
      }
      
      // Goals
      if (currentUser.profileData.goals) {
        document.getElementById('careerInterest').value = currentUser.profileData.goals.careerInterest || '';
        document.getElementById('universityGoals').value = currentUser.profileData.goals.universityGoals || '';
        
        const recommendations = currentUser.profileData.goals.receiveRecommendations;
        if (recommendations !== undefined) {
          document.querySelector(`input[name="recommendations"][value="${recommendations ? 'yes' : 'no'}"]`).checked = true;
        }
      }
    }
    
    // Initialize subject options
    populateSubjectOptions();
    
    // Set up event listeners
    setupEventListeners();
  }
  
  // Set up all event listeners
  function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', goToPreviousStep);
    nextBtn.addEventListener('click', goToNextStep);
    setupForm.addEventListener('submit', completeProfileSetup);
    
    // Image upload
    profileImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Subject search
    subjectSearch.addEventListener('input', function() {
      populateSubjectOptions();
    });
    
    // Category buttons
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        populateSubjectOptions();
      });
    });
    
    // Subject form submission
    subjectForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const subjectName = document.getElementById('subjectName').value;
      const subjectLevel = document.getElementById('subjectLevel').value;
      const term1 = parseInt(document.getElementById('subjectTerm1').value) || 0;
      const term2 = parseInt(document.getElementById('subjectTerm2').value) || 0;
      const term3 = parseInt(document.getElementById('subjectTerm3').value) || 0;
      const term4 = parseInt(document.getElementById('subjectTerm4').value) || 0;
      
      // Add or update subject
      const existingIndex = selectedSubjects.findIndex(sub => sub.name === subjectName);
      
      if (existingIndex >= 0) {
        // Update existing subject
        selectedSubjects[existingIndex] = {
          name: subjectName,
          level: subjectLevel,
          term1, term2, term3, term4
        };
      } else {
        // Add new subject
        selectedSubjects.push({
          name: subjectName,
          level: subjectLevel,
          term1, term2, term3, term4
        });
      }
      
      // Update UI
      updateSelectedSubjectsList();
      
      // Close modal and reset form
      addSubjectModal.style.display = 'none';
      subjectForm.reset();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === addSubjectModal) {
        addSubjectModal.style.display = 'none';
      }
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
      });
    });
  }
  
  // Populate subject options based on search and category
  function populateSubjectOptions() {
    const searchTerm = subjectSearch.value.toLowerCase();
    const activeCategory = document.querySelector('.subject-category-btn.active').dataset.category;
    
    subjectOptions.innerHTML = '';
    
    const filteredSubjects = allSubjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm);
      const matchesCategory = activeCategory === 'all' || subject.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    filteredSubjects.forEach(subject => {
      const isSelected = selectedSubjects.some(s => s.name === subject.name);
      
      const subjectEl = document.createElement('div');
      subjectEl.className = `subject-option ${isSelected ? 'selected' : ''}`;
      subjectEl.innerHTML = `
        <div class="subject-info">
          <h4>${subject.name}</h4>
          <span class="subject-category">${subject.category}</span>
        </div>
        <button type="button" class="subject-action-btn">
          ${isSelected ? '<i class="fas fa-edit"></i> Edit' : '<i class="fas fa-plus"></i> Add'}
        </button>
      `;
      
      const actionBtn = subjectEl.querySelector('.subject-action-btn');
      actionBtn.addEventListener('click', function() {
        if (isSelected) {
          // Edit existing subject
          const existingSubject = selectedSubjects.find(s => s.name === subject.name);
          openSubjectModal(existingSubject);
        } else {
          // Add new subject
          openSubjectModal({
            name: subject.name,
            level: subject.levels.includes('HL') ? 'HL' : 'SL',
            term1: 0, term2: 0, term3: 0, term4: 0
          });
        }
      });
      
      subjectOptions.appendChild(subjectEl);
    });
  }
  
  // Open subject modal with data
  function openSubjectModal(subject) {
    document.getElementById('subjectName').value = subject.name;
    document.getElementById('subjectLevel').value = subject.level;
    document.getElementById('subjectTerm1').value = subject.term1 || '';
    document.getElementById('subjectTerm2').value = subject.term2 || '';
    document.getElementById('subjectTerm3').value = subject.term3 || '';
    document.getElementById('subjectTerm4').value = subject.term4 || '';
    
    addSubjectModal.style.display = 'flex';
  }
  
  // Update selected subjects list
  function updateSelectedSubjectsList() {
    selectedSubjectsList.innerHTML = '';
    selectedSubjectsCount.textContent = selectedSubjects.length;
    
    selectedSubjects.forEach((subject, index) => {
      const average = calculateSubjectAverage(subject);
      
      const subjectEl = document.createElement('div');
      subjectEl.className = 'selected-subject-item';
      subjectEl.innerHTML = `
        <div class="subject-header">
          <span class="subject-name">${subject.name} (${subject.level})</span>
          <span class="subject-average">Avg: ${average}%</span>
        </div>
        <div class="subject-actions">
          <button class="edit-subject" data-index="${index}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-subject" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      // Add event listeners to action buttons
      subjectEl.querySelector('.edit-subject').addEventListener('click', function() {
        openSubjectModal(subject);
      });
      
      subjectEl.querySelector('.delete-subject').addEventListener('click', function() {
        selectedSubjects.splice(index, 1);
        updateSelectedSubjectsList();
        populateSubjectOptions();
      });
      
      selectedSubjectsList.appendChild(subjectEl);
    });
  }
  
  // Calculate subject average
  function calculateSubjectAverage(subject) {
    const sum = subject.term1 + subject.term2 + subject.term3 + subject.term4;
    const count = [subject.term1, subject.term2, subject.term3, subject.term4].filter(v => v > 0).length;
    return count > 0 ? Math.round(sum / count) : 0;
  }
  
  // Navigation functions
  function goToPreviousStep() {
    if (currentStep > 1) {
      steps[currentStep - 1].classList.remove('active');
      currentStep--;
      steps[currentStep - 1].classList.add('active');
      updateProgress();
      updateNavButtons();
    }
  }
  
  function goToNextStep() {
    if (validateCurrentStep()) {
      steps[currentStep - 1].classList.remove('active');
      currentStep++;
      steps[currentStep - 1].classList.add('active');
      updateProgress();
      updateNavButtons();
    }
  }
  
  // Validate current step before proceeding
  function validateCurrentStep() {
    const currentStepEl = steps[currentStep - 1];
    
    if (currentStep === 1) {
      // Validate personal info
      const fullName = document.getElementById('fullName').value.trim();
      const dob = document.getElementById('dob').value;
      
      if (!fullName) {
        showError('Please enter your full name');
        return false;
      }
      
      if (!dob) {
        showError('Please enter your date of birth');
        return false;
      }
    }
    
    if (currentStep === 2) {
      // Validate academic info
      const currentGrade = document.getElementById('currentGrade').value;
      const schoolName = document.getElementById('schoolName').value.trim();
      
      if (!currentGrade) {
        showError('Please select your current grade');
        return false;
      }
      
      if (!schoolName) {
        showError('Please enter your school name');
        return false;
      }
    }
    
    if (currentStep === 3) {
      // Validate subjects
      if (selectedSubjects.length === 0) {
        showError('Please add at least one subject');
        return false;
      }
    }
    
    return true;
  }
  
  // Update progress bar and steps
  function updateProgress() {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
      if (index + 1 < currentStep) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (index + 1 === currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }
  
  // Update navigation buttons
  function updateNavButtons() {
    prevBtn.disabled = currentStep === 1;
    nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
    submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
  }
  
  // Complete profile setup
  function completeProfileSetup(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      
      // Create profile data structure
      const profileData = {
        personalInfo: {
          fullName: document.getElementById('fullName').value.trim(),
          dob: document.getElementById('dob').value,
          idNumber: document.getElementById('idNumber').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          address: document.getElementById('address').value.trim(),
          profileImage: previewImage.src
        },
        academicInfo: {
          currentGrade: document.getElementById('currentGrade').value,
          schoolName: document.getElementById('schoolName').value.trim(),
          academicYear: document.getElementById('academicYear').value,
          academicStream: document.getElementById('academicStream').value
        },
        subjects: selectedSubjects,
        goals: {
          careerInterest: document.getElementById('careerInterest').value,
          universityGoals: document.getElementById('universityGoals').value,
          receiveRecommendations: document.querySelector('input[name="recommendations"]:checked').value === 'yes'
        }
      };
      
      // Update user object
      currentUser.profileData = profileData;
      currentUser.profileComplete = true;
      
      // Update user in database
      let userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
      if (currentUser.id) {
        const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
        if (userIndex >= 0) {
          userDatabase[userIndex] = currentUser;
        } else {
          userDatabase.push(currentUser);
        }
      } else {
        // Create new user if doesn't exist
        currentUser.id = 'user-' + Date.now();
        userDatabase.push(currentUser);
      }
      
      localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Redirect to profile page
      window.location.href = 'profile.html';
    }
  }
  
  // Show error message
  function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.setup-error');
    if (existingError) existingError.remove();
    
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'setup-error';
    errorEl.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    
    // Insert after the step header
    const currentStepEl = steps[currentStep - 1];
    const stepHeader = currentStepEl.querySelector('.step-header');
    stepHeader.after(errorEl);
    
    // Scroll to error
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Initialize the setup
  initSetup();
});