// DOM Elements
const editProfileBtn = document.getElementById('editProfileBtn');
const printProfileBtn = document.getElementById('printProfileBtn');
const editImageBtn = document.getElementById('editImageBtn');
const profileImage = document.getElementById('profileImage');
const imageUploadModal = document.getElementById('imageUploadModal');
const imageUpload = document.getElementById('imageUpload');
const saveImageBtn = document.getElementById('saveImageBtn');
const previewImage = document.getElementById('previewImage');
const addSubjectBtn = document.querySelector('.add-subject-btn');
const addSubjectModal = document.getElementById('addSubjectModal');
const subjectForm = document.getElementById('subjectForm');
const subjectsContainer = document.getElementById('subjectsContainer');
const addUniversityBtn = document.querySelector('.add-university-btn');
const addUniversityModal = document.getElementById('addUniversityModal');
const universityForm = document.getElementById('universityForm');
const universityContainer = document.getElementById('universityContainer');
const apsBreakdown = document.getElementById('apsBreakdown').getElementsByTagName('tbody')[0];
const totalAps = document.getElementById('totalAps');
const apsRequirements = document.getElementById('apsRequirements');

// Load user data
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser && currentUser.profileComplete) {
  const profileData = currentUser.profileData;
  
  // Personal Info
  document.getElementById('profileName').textContent = profileData.personalInfo.fullName;
  document.getElementById('fullName').textContent = profileData.personalInfo.fullName;
  document.getElementById('dob').textContent = profileData.personalInfo.dob;
  document.getElementById('idNumber').textContent = profileData.personalInfo.idNumber;
  document.getElementById('email').textContent = currentUser.email;
  document.getElementById('phone').textContent = profileData.personalInfo.phone;
  document.getElementById('address').textContent = profileData.personalInfo.address;
  
  // Profile Image
  if (profileData.personalInfo.profileImage) {
    document.getElementById('profileImage').src = profileData.personalInfo.profileImage;
  }
  
  // Academic Info
  document.getElementById('currentGrade').textContent = profileData.academicInfo.currentGrade;
  document.getElementById('profileGrade').textContent = `Grade ${profileData.academicInfo.currentGrade} Student`;
  document.getElementById('schoolName').textContent = profileData.academicInfo.schoolName;
  document.getElementById('profileSchool').textContent = profileData.academicInfo.schoolName;
  document.getElementById('academicYear').textContent = profileData.academicInfo.academicYear;
  document.getElementById('academicStream').textContent = profileData.academicInfo.academicStream;
  
  // Subjects
  if (profileData.subjects && profileData.subjects.length > 0) {
    sampleSubjects.length = 0; // Clear sample data
    profileData.subjects.forEach(subject => sampleSubjects.push(subject));
    loadSubjects();
    calculateAps();
  }
  
  // University Targets (if any)
  if (profileData.goals.universityGoals) {
    // You could parse this and create university targets
  }
}

// Sample Data - In a real app, this would come from a database
const sampleSubjects = [
  { name: 'Mathematics', level: 'HL', term1: 85, term2: 78, term3: 82, term4: 80 },
  { name: 'Physical Sciences', level: 'HL', term1: 78, term2: 82, term3: 85, term4: 80 },
  { name: 'Life Sciences', level: 'SL', term1: 72, term2: 75, term3: 78, term4: 80 },
  { name: 'English Home Language', level: 'SL', term1: 88, term2: 85, term3: 90, term4: 92 },
  { name: 'Afrikaans First Additional', level: 'SL', term1: 75, term2: 78, term3: 80, term4: 82 },
  { name: 'Life Orientation', level: 'SL', term1: 90, term2: 92, term3: 88, term4: 95 }
];

const sampleUniversities = [
  { 
    name: 'University of Cape Town', 
    faculty: 'Science', 
    program: 'BSc in Computer Science', 
    requiredAps: 42, 
    requirements: 'Maths & Physical Sciences with 70%+' 
  },
  { 
    name: 'Stellenbosch University', 
    faculty: 'Engineering', 
    program: 'BEng in Electrical Engineering', 
    requiredAps: 38, 
    requirements: 'Maths & Physical Sciences with 65%+' 
  }
];

const universityApsRequirements = [
  { name: 'University of Cape Town (UCT)', minAps: 42 },
  { name: 'University of the Witwatersrand (Wits)', minAps: 40 },
  { name: 'Stellenbosch University (Maties)', minAps: 38 },
  { name: 'University of Pretoria (UP/Tuks)', minAps: 36 },
  { name: 'University of Johannesburg (UJ)', minAps: 34 },
  { name: 'Rhodes University', minAps: 32 },
  { name: 'University of KwaZulu-Natal (UKZN)', minAps: 30 },
  { name: 'North-West University (NWU)', minAps: 28 },
  { name: 'University of the Free State (UFS)', minAps: 26 },
  { name: 'University of Limpopo', minAps: 24 }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load sample data if no user data exists
  if (!currentUser || !currentUser.profileComplete) {
    loadSubjects();
    loadUniversities();
    loadApsRequirements();
    calculateAps();
  }
  
  // Initialize charts
  initializeCharts();
});

// Edit Profile Button
editProfileBtn.addEventListener('click', function() {
  alert('Edit profile functionality will be implemented here');
});

// Print Profile Button
printProfileBtn.addEventListener('click', function() {
  window.print();
});

// Edit Image Button
editImageBtn.addEventListener('click', function() {
  imageUploadModal.style.display = 'flex';
});

// Close Modals
document.querySelectorAll('.close-modal').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
  });
});

// Image Upload Preview
imageUpload.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// Save Image
saveImageBtn.addEventListener('click', function() {
  if (previewImage.src) {
    profileImage.src = previewImage.src;
    imageUploadModal.style.display = 'none';
    
    // Update user's profile image in localStorage
    if (currentUser) {
      const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
      const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
      
      if (userIndex !== -1) {
        userDatabase[userIndex].profileData.personalInfo.profileImage = previewImage.src;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
      }
    }
    
    alert('Profile picture updated successfully!');
  } else {
    alert('Please select an image first');
  }
});

// Add Subject Button
addSubjectBtn.addEventListener('click', function() {
  addSubjectModal.style.display = 'flex';
});

// Subject Form Submission
subjectForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newSubject = {
    name: document.getElementById('subjectName').value,
    level: document.getElementById('subjectLevel').value,
    term1: parseInt(document.getElementById('subjectTerm1').value) || 0,
    term2: parseInt(document.getElementById('subjectTerm2').value) || 0,
    term3: parseInt(document.getElementById('subjectTerm3').value) || 0,
    term4: parseInt(document.getElementById('subjectTerm4').value) || 0
  };
  
  // Add to subjects array
  sampleSubjects.push(newSubject);
  
  // Update user's subjects in localStorage
  if (currentUser) {
    const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
    const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      userDatabase[userIndex].profileData.subjects = sampleSubjects;
      localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
      localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
    }
  }
  
  // Reload subjects
  loadSubjects();
  
  // Reset form and close modal
  subjectForm.reset();
  addSubjectModal.style.display = 'none';
  
  // Recalculate APS
  calculateAps();
  
  // Update charts
  initializeCharts();
});

// Add University Button
addUniversityBtn.addEventListener('click', function() {
  addUniversityModal.style.display = 'flex';
});

// University Form Submission
universityForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newUniversity = {
    name: document.getElementById('universityName').value,
    faculty: document.getElementById('faculty').value,
    program: document.getElementById('degreeProgram').value,
    requiredAps: parseInt(document.getElementById('requiredAps').value),
    requirements: document.getElementById('additionalRequirements').value
  };
  
  // Add to universities array
  sampleUniversities.push(newUniversity);
  
  // Reload universities
  loadUniversities();
  
  // Reset form and close modal
  universityForm.reset();
  addUniversityModal.style.display = 'none';
  
  // Update charts
  initializeCharts();
});

// Load Subjects
function loadSubjects() {
  subjectsContainer.innerHTML = '';
  
  sampleSubjects.forEach((subject, index) => {
    const average = calculateSubjectAverage(subject);
    
    const subjectCard = document.createElement('div');
    subjectCard.className = 'subject-card';
    subjectCard.innerHTML = `
      <div class="subject-actions">
        <button class="edit-subject" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-subject" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
      <div class="subject-header">
        <span class="subject-name">${subject.name}</span>
        <span class="subject-level">${subject.level}</span>
      </div>
      <div class="subject-marks">
        <div class="mark-item">
          <span class="mark-label">Term 1</span>
          <span class="mark-value">${subject.term1}%</span>
        </div>
        <div class="mark-item">
          <span class="mark-label">Term 2</span>
          <span class="mark-value">${subject.term2}%</span>
        </div>
        <div class="mark-item">
          <span class="mark-label">Term 3</span>
          <span class="mark-value">${subject.term3}%</span>
        </div>
        <div class="mark-item">
          <span class="mark-label">Term 4</span>
          <span class="mark-value">${subject.term4}%</span>
        </div>
      </div>
      <div class="subject-average">
        <span>Average</span>
        <span class="average-value">${average}%</span>
      </div>
    `;
    
    subjectsContainer.appendChild(subjectCard);
  });
  
  // Add event listeners to edit/delete buttons
  document.querySelectorAll('.edit-subject').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      editSubject(index);
    });
  });
  
  document.querySelectorAll('.delete-subject').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      deleteSubject(index);
    });
  });
}

// Load Universities
function loadUniversities() {
  universityContainer.innerHTML = '';
  
  sampleUniversities.forEach((university, index) => {
    const apsScore = calculateTotalAps();
    const meetsRequirements = apsScore >= university.requiredAps;
    
    const universityCard = document.createElement('div');
    universityCard.className = 'university-card';
    universityCard.innerHTML = `
      <div class="university-actions">
        <button class="edit-university" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-university" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
      <h3 class="university-name">${university.name}</h3>
      <p class="university-program">${university.faculty} - ${university.program}</p>
      <div class="university-requirements">
        <div class="requirement-item">
          <span class="requirement-label">Minimum APS:</span>
          <span class="requirement-value">${university.requiredAps}</span>
        </div>
        <div class="requirement-item">
          <span class="requirement-label">Requirements:</span>
          <span class="requirement-value">${university.requirements}</span>
        </div>
      </div>
      <div class="aps-status">
        <div>
          <span class="requirement-label">Your APS:</span>
          <span class="aps-value">${apsScore}</span>
        </div>
        <span class="status-badge ${meetsRequirements ? 'status-meets' : 'status-fails'}">
          ${meetsRequirements ? 'Meets Requirements' : 'Below Requirements'}
        </span>
      </div>
    `;
    
    universityContainer.appendChild(universityCard);
  });
  
  // Add event listeners to edit/delete buttons
  document.querySelectorAll('.edit-university').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      editUniversity(index);
    });
  });
  
  document.querySelectorAll('.delete-university').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      deleteUniversity(index);
    });
  });
}

// Load APS Requirements
function loadApsRequirements() {
  apsRequirements.innerHTML = '';
  
  universityApsRequirements.forEach(university => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${university.name}</span>
      <span>${university.minAps}</span>
    `;
    apsRequirements.appendChild(li);
  });
}

// Calculate Subject Average
function calculateSubjectAverage(subject) {
  const sum = subject.term1 + subject.term2 + subject.term3 + subject.term4;
  return Math.round(sum / 4);
}

// Calculate APS Score
function calculateAps() {
  // Clear previous breakdown
  apsBreakdown.innerHTML = '';
  
  let totalScore = 0;
  let subjectsCounted = 0;
  
  // Calculate APS for each subject (top 6 subjects)
  const sortedSubjects = [...sampleSubjects]
    .map(subject => ({
      ...subject,
      average: calculateSubjectAverage(subject)
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 6);
  
  sortedSubjects.forEach(subject => {
    const apsPoints = percentageToAps(subject.average);
    totalScore += apsPoints;
    subjectsCounted++;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.average}%</td>
      <td>${apsPoints}</td>
    `;
    apsBreakdown.appendChild(row);
  });
  
  // Update total APS
  totalAps.textContent = totalScore;
  
  // Update profile stats
  document.getElementById('apsScore').textContent = totalScore;
  
  // Calculate and update overall average
  const overallAverage = sortedSubjects.reduce((sum, subject) => sum + subject.average, 0) / subjectsCounted;
  document.getElementById('overallAverage').textContent = `${Math.round(overallAverage)}%`;
  
  return totalScore;
}

// Convert percentage to APS points
function percentageToAps(percentage) {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
}

// Edit Subject
function editSubject(index) {
  const subject = sampleSubjects[index];
  
  // Fill the form with subject data
  document.getElementById('subjectName').value = subject.name;
  document.getElementById('subjectLevel').value = subject.level;
  document.getElementById('subjectTerm1').value = subject.term1;
  document.getElementById('subjectTerm2').value = subject.term2;
  document.getElementById('subjectTerm3').value = subject.term3;
  document.getElementById('subjectTerm4').value = subject.term4;
  
  // Change button text
  document.querySelector('#subjectForm .auth-button').textContent = 'Update Subject';
  
  // Remove previous submit event listener
  subjectForm.removeEventListener('submit', handleSubjectUpdate);
  
  // Add new submit event listener for update
  function handleSubjectUpdate(e) {
    e.preventDefault();
    
    // Update subject
    sampleSubjects[index] = {
      name: document.getElementById('subjectName').value,
      level: document.getElementById('subjectLevel').value,
      term1: parseInt(document.getElementById('subjectTerm1').value) || 0,
      term2: parseInt(document.getElementById('subjectTerm2').value) || 0,
      term3: parseInt(document.getElementById('subjectTerm3').value) || 0,
      term4: parseInt(document.getElementById('subjectTerm4').value) || 0
    };
    
    // Update user's subjects in localStorage
    if (currentUser) {
      const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
      const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
      
      if (userIndex !== -1) {
        userDatabase[userIndex].profileData.subjects = sampleSubjects;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
      }
    }
    
    // Reload subjects
    loadSubjects();
    
    // Reset form and close modal
    subjectForm.reset();
    addSubjectModal.style.display = 'none';
    
    // Recalculate APS
    calculateAps();
    
    // Update charts
    initializeCharts();
    
    // Remove this event listener
    subjectForm.removeEventListener('submit', handleSubjectUpdate);
  }
  
  subjectForm.addEventListener('submit', handleSubjectUpdate);
  
  // Show modal
  addSubjectModal.style.display = 'flex';
}

// Delete Subject
function deleteSubject(index) {
  if (confirm('Are you sure you want to delete this subject?')) {
    sampleSubjects.splice(index, 1);
    
    // Update user's subjects in localStorage
    if (currentUser) {
      const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
      const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
      
      if (userIndex !== -1) {
        userDatabase[userIndex].profileData.subjects = sampleSubjects;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
      }
    }
    
    loadSubjects();
    calculateAps();
    initializeCharts();
  }
}

// Edit University
function editUniversity(index) {
  const university = sampleUniversities[index];
  
  // Fill the form with university data
  document.getElementById('universityName').value = university.name;
  document.getElementById('faculty').value = university.faculty;
  document.getElementById('degreeProgram').value = university.program;
  document.getElementById('requiredAps').value = university.requiredAps;
  document.getElementById('additionalRequirements').value = university.requirements;
  
  // Change button text
  document.querySelector('#universityForm .auth-button').textContent = 'Update Target';
  
  // Remove previous submit event listener
  universityForm.removeEventListener('submit', handleUniversityUpdate);
  
  // Add new submit event listener for update
  function handleUniversityUpdate(e) {
    e.preventDefault();
    
    // Update university
    sampleUniversities[index] = {
      name: document.getElementById('universityName').value,
      faculty: document.getElementById('faculty').value,
      program: document.getElementById('degreeProgram').value,
      requiredAps: parseInt(document.getElementById('requiredAps').value),
      requirements: document.getElementById('additionalRequirements').value
    };
    
    // Reload universities
    loadUniversities();
    
    // Reset form and close modal
    universityForm.reset();
    addUniversityModal.style.display = 'none';
    
    // Update charts
    initializeCharts();
    
    // Remove this event listener
    universityForm.removeEventListener('submit', handleUniversityUpdate);
  }
  
  universityForm.addEventListener('submit', handleUniversityUpdate);
  
  // Show modal
  addUniversityModal.style.display = 'flex';
}

// Delete University
function deleteUniversity(index) {
  if (confirm('Are you sure you want to delete this university target?')) {
    sampleUniversities.splice(index, 1);
    loadUniversities();
    initializeCharts();
  }
}

// Initialize Charts
function initializeCharts() {
  // Term Averages Chart
  const termCtx = document.getElementById('termChart').getContext('2d');
  const termChart = new Chart(termCtx, {
    type: 'bar',
    data: {
      labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
      datasets: [{
        label: 'Average %',
        data: [
          calculateTermAverage(1),
          calculateTermAverage(2),
          calculateTermAverage(3),
          calculateTermAverage(4)
        ],
        backgroundColor: [
          'rgba(51, 40, 191, 0.7)',
          'rgba(51, 40, 191, 0.7)',
          'rgba(51, 40, 191, 0.7)',
          'rgba(51, 40, 191, 0.7)'
        ],
        borderColor: [
          'rgba(51, 40, 191, 1)',
          'rgba(51, 40, 191, 1)',
          'rgba(51, 40, 191, 1)',
          'rgba(51, 40, 191, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
  
  // Subject Comparison Chart
  const subjectCtx = document.getElementById('subjectChart').getContext('2d');
  const subjectChart = new Chart(subjectCtx, {
    type: 'radar',
    data: {
      labels: sampleSubjects.slice(0, 6).map(subject => subject.name),
      datasets: [{
        label: 'Subject Averages',
        data: sampleSubjects.slice(0, 6).map(subject => calculateSubjectAverage(subject)),
        backgroundColor: 'rgba(51, 40, 191, 0.2)',
        borderColor: 'rgba(51, 40, 191, 1)',
        pointBackgroundColor: 'rgba(51, 40, 191, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(51, 40, 191, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
  
  // University Match Chart
  const universityCtx = document.getElementById('universityChart').getContext('2d');
  const universityChart = new Chart(universityCtx, {
    type: 'doughnut',
    data: {
      labels: sampleUniversities.map(uni => uni.name),
      datasets: [{
        data: sampleUniversities.map(uni => {
          const apsScore = calculateTotalAps();
          return Math.min(100, Math.round((apsScore / uni.requiredAps) * 100));
        }),
        backgroundColor: sampleUniversities.map(uni => {
          const apsScore = calculateTotalAps();
          return apsScore >= uni.requiredAps ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)';
        }),
        borderColor: sampleUniversities.map(uni => {
          const apsScore = calculateTotalAps();
          return apsScore >= uni.requiredAps ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)';
        }),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const uni = sampleUniversities[context.dataIndex];
              const apsScore = calculateTotalAps();
              return [
                `Your APS: ${apsScore}`,
                `Required: ${uni.requiredAps}`,
                `Match: ${Math.min(100, Math.round((apsScore / uni.requiredAps) * 100))}%`
              ];
            }
          }
        }
      }
    }
  });
  
  // Progress Over Time Chart
  const progressCtx = document.getElementById('progressChart').getContext('2d');
  const progressChart = new Chart(progressCtx, {
    type: 'line',
    data: {
      labels: ['Grade 10', 'Grade 11', 'Grade 12'],
      datasets: [{
        label: 'Your Progress',
        data: [65, 72, calculateOverallAverage()],
        fill: false,
        backgroundColor: 'rgba(51, 40, 191, 1)',
        borderColor: 'rgba(51, 40, 191, 1)',
        tension: 0.1
      }, {
        label: 'School Average',
        data: [62, 68, 71],
        fill: false,
        backgroundColor: 'rgba(156, 163, 175, 1)',
        borderColor: 'rgba(156, 163, 175, 1)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 50,
          max: 100
        }
      }
    }
  });
  
  // Return chart objects in case we need to update them later
  return {
    termChart,
    subjectChart,
    universityChart,
    progressChart
  };
}

// Calculate Term Average
function calculateTermAverage(termNumber) {
  const termKey = `term${termNumber}`;
  const sum = sampleSubjects.reduce((total, subject) => total + subject[termKey], 0);
  return Math.round(sum / sampleSubjects.length);
}

// Calculate Overall Average
function calculateOverallAverage() {
  const sum = sampleSubjects.reduce((total, subject) => {
    return total + calculateSubjectAverage(subject);
  }, 0);
  return Math.round(sum / sampleSubjects.length);
}

// Calculate Total APS
function calculateTotalAps() {
  // Get top 6 subjects by average
  const topSubjects = [...sampleSubjects]
    .map(subject => ({
      ...subject,
      average: calculateSubjectAverage(subject)
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 6);
  
  // Calculate total APS
  return topSubjects.reduce((total, subject) => {
    return total + percentageToAps(subject.average);
  }, 0);
}

// Edit Section Buttons
document.querySelectorAll('.edit-section-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const sectionId = this.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    // Toggle edit mode
    section.classList.toggle('edit-mode');
    
    // Show/hide edit inputs
    const infoItems = section.querySelectorAll('.info-item');
    infoItems.forEach(item => {
      const p = item.querySelector('p');
      const input = item.querySelector('.edit-input');
      
      if (section.classList.contains('edit-mode')) {
        p.style.display = 'none';
        input.style.display = 'block';
        
        // Special handling for select elements
        if (input.tagName === 'SELECT') {
          const value = p.textContent.trim();
          const options = input.options;
          for (let i = 0; i < options.length; i++) {
            if (options[i].text === value) {
              input.selectedIndex = i;
              break;
            }
          }
        }
      } else {
        p.style.display = 'block';
        input.style.display = 'none';
      }
    });
    
    // Show/hide edit buttons
    const editButtons = section.querySelector('.edit-buttons');
    if (section.classList.contains('edit-mode')) {
      editButtons.style.display = 'flex';
    } else {
      editButtons.style.display = 'none';
    }
  });
});

// Save/Cancel Buttons
document.querySelectorAll('.save-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const section = this.closest('.profile-section');
    const infoItems = section.querySelectorAll('.info-item');
    
    infoItems.forEach(item => {
      const p = item.querySelector('p');
      const input = item.querySelector('.edit-input');
      
      // Update the displayed value
      if (input.tagName === 'SELECT') {
        p.textContent = input.options[input.selectedIndex].text;
      } else {
        p.textContent = input.value;
      }
      
      // Update the profile stats if needed
      if (section.id === 'academic-info') {
        if (item.querySelector('label').textContent === 'Current Grade') {
          document.getElementById('profileGrade').textContent = `Grade ${p.textContent} Student`;
        }
        if (item.querySelector('label').textContent === 'School') {
          document.getElementById('profileSchool').textContent = p.textContent;
        }
      }
    });
    
    // Update user data in localStorage
    if (currentUser) {
      const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [];
      const userIndex = userDatabase.findIndex(u => u.id === currentUser.id);
      
      if (userIndex !== -1) {
        // Update personal info
        if (section.id === 'personal-info') {
          userDatabase[userIndex].profileData.personalInfo.fullName = document.getElementById('fullName').textContent;
          userDatabase[userIndex].profileData.personalInfo.dob = document.getElementById('dob').textContent;
          userDatabase[userIndex].profileData.personalInfo.idNumber = document.getElementById('idNumber').textContent;
          userDatabase[userIndex].profileData.personalInfo.phone = document.getElementById('phone').textContent;
          userDatabase[userIndex].profileData.personalInfo.address = document.getElementById('address').textContent;
        }
        
        // Update academic info
        if (section.id === 'academic-info') {
          userDatabase[userIndex].profileData.academicInfo.currentGrade = document.getElementById('currentGrade').textContent;
          userDatabase[userIndex].profileData.academicInfo.schoolName = document.getElementById('schoolName').textContent;
          userDatabase[userIndex].profileData.academicInfo.academicYear = document.getElementById('academicYear').textContent;
          userDatabase[userIndex].profileData.academicInfo.academicStream = document.getElementById('academicStream').textContent;
        }
        
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        localStorage.setItem('currentUser', JSON.stringify(userDatabase[userIndex]));
      }
    }
    
    // Exit edit mode
    section.classList.remove('edit-mode');
    section.querySelector('.edit-buttons').style.display = 'none';
  });
});

document.querySelectorAll('.cancel-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const section = this.closest('.profile-section');
    
    // Exit edit mode without saving
    section.classList.remove('edit-mode');
    section.querySelector('.edit-buttons').style.display = 'none';
    
    // Hide inputs and show paragraphs
    const infoItems = section.querySelectorAll('.info-item');
    infoItems.forEach(item => {
      item.querySelector('p').style.display = 'block';
      item.querySelector('.edit-input').style.display = 'none';
    });
  });
});