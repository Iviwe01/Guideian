document.addEventListener('DOMContentLoaded', function() {
  // South African Grade 9 subjects based on CAPS curriculum
  const grade9Subjects = [
    // Languages (Home Language)
    { name: "English Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Afrikaans Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "IsiZulu Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "IsiXhosa Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Sepedi Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Setswana Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Sesotho Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Xitsonga Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "SiSwati Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "Tshivenda Home Language", category: "Languages", icon: "fas fa-language" },
    { name: "IsiNdebele Home Language", category: "Languages", icon: "fas fa-language" },
    
    // First Additional Languages
    { name: "English First Additional Language", category: "Languages", icon: "fas fa-language" },
    { name: "Afrikaans First Additional Language", category: "Languages", icon: "fas fa-language" },
    { name: "IsiZulu First Additional Language", category: "Languages", icon: "fas fa-language" },
    { name: "IsiXhosa First Additional Language", category: "Languages", icon: "fas fa-language" },
    
    // Core Subjects
    { name: "Mathematics", category: "Core", icon: "fas fa-square-root-alt" },
    { name: "Mathematical Literacy", category: "Core", icon: "fas fa-calculator" },
    { name: "Life Orientation", category: "Core", icon: "fas fa-user-graduate" },
    
    // Sciences
    { name: "Natural Sciences", category: "Sciences", icon: "fas fa-flask" },
    
    // Humanities
    { name: "Social Sciences (History & Geography)", category: "Humanities", icon: "fas fa-globe-africa" },
    
    // Technical Subjects
    { name: "Technology", category: "Technical", icon: "fas fa-laptop-code" },
    { name: "Economic and Management Sciences", category: "Commerce", icon: "fas fa-chart-line" },
    { name: "Creative Arts", category: "Arts", icon: "fas fa-palette" },
    { name: "Physical Education", category: "Sports", icon: "fas fa-running" },
    { name: "Agricultural Sciences", category: "Agriculture", icon: "fas fa-tractor" },
    { name: "Religious Studies", category: "Humanities", icon: "fas fa-hands-praying" }
  ];

  // Interest categories with detailed South African career relevance
  const interestCategories = [
    { 
      name: "Technology & IT", 
      description: "Computers, programming, digital systems", 
      icon: "fas fa-laptop-code",
      careers: ["Software Developer", "IT Support", "Data Scientist", "Cybersecurity Specialist", "AI Engineer"]
    },
    { 
      name: "Engineering", 
      description: "Building, designing, problem-solving", 
      icon: "fas fa-cogs",
      careers: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Mining Engineer", "Aerospace Engineer"]
    },
    { 
      name: "Medicine & Health", 
      description: "Healthcare, biology, helping people", 
      icon: "fas fa-heartbeat",
      careers: ["Doctor", "Nurse", "Pharmacist", "Physiotherapist", "Dentist", "Veterinarian"]
    },
    { 
      name: "Business & Finance", 
      description: "Entrepreneurship, management, finance", 
      icon: "fas fa-chart-line",
      careers: ["Accountant", "Financial Manager", "Entrepreneur", "Economist", "Investment Banker"]
    },
    { 
      name: "Arts & Design", 
      description: "Creative fields, design, expression", 
      icon: "fas fa-palette",
      careers: ["Graphic Designer", "Animator", "Architect", "Fashion Designer", "Interior Designer"]
    },
    { 
      name: "Science & Research", 
      description: "Research, experiments, discovery", 
      icon: "fas fa-flask",
      careers: ["Biotechnologist", "Chemist", "Environmental Scientist", "Geologist", "Astronomer"]
    },
    { 
      name: "Law & Justice", 
      description: "Justice, legal systems, debate", 
      icon: "fas fa-gavel",
      careers: ["Lawyer", "Judge", "Human Rights Advocate", "Police Officer", "Forensic Investigator"]
    },
    { 
      name: "Education", 
      description: "Teaching, mentoring, sharing knowledge", 
      icon: "fas fa-chalkboard-teacher",
      careers: ["Teacher", "Professor", "Educational Psychologist", "Curriculum Developer", "School Principal"]
    },
    { 
      name: "Environment & Nature", 
      description: "Nature, conservation, sustainability", 
      icon: "fas fa-leaf",
      careers: ["Environmental Consultant", "Conservationist", "Wildlife Biologist", "Urban Planner", "Marine Biologist"]
    },
    { 
      name: "Humanities & Social", 
      description: "Human behavior, society, culture", 
      icon: "fas fa-users",
      careers: ["Social Worker", "Psychologist", "Anthropologist", "Journalist", "Historian"]
    },
    { 
      name: "Sports & Fitness", 
      description: "Physical activity, health, competition", 
      icon: "fas fa-running",
      careers: ["Professional Athlete", "Sports Coach", "Physiotherapist", "Sports Manager", "Fitness Trainer"]
    },
    { 
      name: "Agriculture & Food", 
      description: "Farming, food production, agribusiness", 
      icon: "fas fa-tractor",
      careers: ["Farmer", "Agricultural Scientist", "Food Technologist", "Veterinarian", "Wine Maker"]
    },
    { 
      name: "Hospitality & Tourism", 
      description: "Tourism, hotels, food service", 
      icon: "fas fa-utensils",
      careers: ["Chef", "Hotel Manager", "Tour Guide", "Event Planner", "Sommelier"]
    }
  ];

  // Expanded list of 30 subject streams with detailed information
  const subjectStreams = [
    // STEM Fields
    {
      name: "Pure Mathematics & Physical Sciences",
      subjects: ["Mathematics", "Physical Sciences", "Information Technology", "Life Sciences"],
      interests: ["Technology & IT", "Engineering", "Science & Research"],
      careers: ["Engineer", "Physicist", "Mathematician", "Data Scientist"],
      fitScore: 95,
      description: "For students excelling in mathematics and interested in technical fields. Leads to careers in engineering, research, and technology."
    },
    {
      name: "Life Sciences & Medicine",
      subjects: ["Life Sciences", "Physical Sciences", "Mathematics", "Agricultural Sciences"],
      interests: ["Medicine & Health", "Science & Research", "Environment & Nature"],
      careers: ["Doctor", "Biologist", "Pharmacist", "Veterinarian"],
      fitScore: 90,
      description: "Ideal for future healthcare professionals and biologists. Prepares students for medical school and biological sciences."
    },
    {
      name: "Computer Science & IT",
      subjects: ["Information Technology", "Mathematics", "Physical Sciences", "Computer Applications Technology"],
      interests: ["Technology & IT", "Engineering"],
      careers: ["Software Developer", "IT Specialist", "Cybersecurity Expert", "AI Engineer"],
      fitScore: 85,
      description: "Focused on programming and digital systems. Prepares students for the growing tech industry in South Africa."
    },
    
    // Commerce Fields
    {
      name: "Accounting & Finance",
      subjects: ["Accounting", "Mathematics", "Business Studies", "Economics"],
      interests: ["Business & Finance"],
      careers: ["Accountant", "Financial Manager", "Auditor", "Investment Banker"],
      fitScore: 90,
      description: "For students interested in numbers and business. Leads to careers in accounting, banking, and financial management."
    },
    {
      name: "Business & Entrepreneurship",
      subjects: ["Business Studies", "Economics", "Accounting", "Mathematics or Maths Literacy"],
      interests: ["Business & Finance"],
      careers: ["Entrepreneur", "Business Manager", "Marketing Specialist", "HR Manager"],
      fitScore: 85,
      description: "Develops business acumen and entrepreneurial skills. Ideal for future business leaders and startup founders."
    },
    {
      name: "Economics & Actuarial Science",
      subjects: ["Mathematics", "Economics", "Accounting", "Physical Sciences"],
      interests: ["Business & Finance", "Science & Research"],
      careers: ["Economist", "Actuary", "Financial Analyst", "Policy Analyst"],
      fitScore: 80,
      description: "For analytically minded students interested in economic systems and financial risk assessment."
    },
    
    // Humanities Fields
    {
      name: "Law & Political Studies",
      subjects: ["History", "Geography", "Life Orientation", "Additional Language"],
      interests: ["Law & Justice", "Humanities & Social"],
      careers: ["Lawyer", "Judge", "Politician", "Human Rights Advocate"],
      fitScore: 85,
      description: "Develops critical thinking and debate skills. Prepares students for law school and careers in justice systems."
    },
    {
      name: "Psychology & Social Work",
      subjects: ["Life Sciences", "Life Orientation", "History", "Additional Language"],
      interests: ["Humanities & Social", "Education"],
      careers: ["Psychologist", "Social Worker", "Counselor", "HR Specialist"],
      fitScore: 80,
      description: "For students interested in human behavior and helping professions. Leads to careers in mental health and social services."
    },
    {
      name: "Journalism & Media Studies",
      subjects: ["English Home Language", "History", "Dramatic Arts", "Visual Arts"],
      interests: ["Humanities & Social", "Arts & Design"],
      careers: ["Journalist", "Media Producer", "Public Relations", "Content Creator"],
      fitScore: 75,
      description: "Develops communication and media production skills. Prepares students for careers in journalism and digital media."
    },
    
    // Arts & Design Fields
    {
      name: "Fine Arts & Design",
      subjects: ["Visual Arts", "Dramatic Arts", "History", "English Home Language"],
      interests: ["Arts & Design"],
      careers: ["Artist", "Graphic Designer", "Animator", "Art Director"],
      fitScore: 90,
      description: "For creative students with artistic talent. Leads to careers in visual arts, design, and creative industries."
    },
    {
      name: "Performing Arts",
      subjects: ["Dramatic Arts", "Music", "English Home Language", "History"],
      interests: ["Arts & Design"],
      careers: ["Actor", "Musician", "Dancer", "Theater Director"],
      fitScore: 85,
      description: "Develops performance skills and creative expression. Prepares students for careers in theater, film, and music."
    },
    {
      name: "Fashion & Textile Design",
      subjects: ["Visual Arts", "Consumer Studies", "History", "Business Studies"],
      interests: ["Arts & Design", "Business & Finance"],
      careers: ["Fashion Designer", "Textile Artist", "Merchandiser", "Stylist"],
      fitScore: 80,
      description: "Combines creativity with practical design skills. Leads to careers in fashion and textile industries."
    },
    
    // Technical & Vocational Fields
    {
      name: "Engineering Graphics & Design",
      subjects: ["Engineering Graphics and Design", "Mathematics", "Physical Sciences", "Information Technology"],
      interests: ["Engineering", "Technology & IT"],
      careers: ["Architectural Technologist", "Draughtsperson", "Civil Engineer", "Industrial Designer"],
      fitScore: 85,
      description: "Develops technical drawing and design skills. Prepares students for careers in architecture and engineering."
    },
    {
      name: "Hospitality & Culinary Arts",
      subjects: ["Hospitality Studies", "Consumer Studies", "Business Studies", "Mathematics or Maths Literacy"],
      interests: ["Hospitality & Tourism"],
      careers: ["Chef", "Hotel Manager", "Event Planner", "Food Critic"],
      fitScore: 80,
      description: "Develops culinary and hospitality management skills. Leads to careers in food service and tourism industries."
    },
    {
      name: "Electrical Technology",
      subjects: ["Electrical Technology", "Mathematics", "Physical Sciences", "Engineering Graphics and Design"],
      interests: ["Engineering", "Technology & IT"],
      careers: ["Electrician", "Electrical Engineer", "Technician", "Renewable Energy Specialist"],
      fitScore: 75,
      description: "Provides hands-on electrical skills. Prepares students for careers in electrical engineering and maintenance."
    },
    
    // Agriculture & Environmental Fields
    {
      name: "Agricultural Sciences",
      subjects: ["Agricultural Sciences", "Life Sciences", "Geography", "Mathematics or Maths Literacy"],
      interests: ["Agriculture & Food", "Environment & Nature"],
      careers: ["Agricultural Scientist", "Farm Manager", "Food Technologist", "Conservationist"],
      fitScore: 85,
      description: "Focuses on modern farming techniques and food production. Prepares students for careers in agriculture and agribusiness."
    },
    {
      name: "Environmental Studies",
      subjects: ["Geography", "Life Sciences", "Agricultural Sciences", "Mathematics or Maths Literacy"],
      interests: ["Environment & Nature"],
      careers: ["Environmental Consultant", "Conservationist", "Urban Planner", "Park Ranger"],
      fitScore: 80,
      description: "Develops understanding of environmental systems. Leads to careers in conservation and environmental management."
    },
    {
      name: "Marine Biology",
      subjects: ["Life Sciences", "Geography", "Mathematics", "Physical Sciences"],
      interests: ["Environment & Nature", "Science & Research"],
      careers: ["Marine Biologist", "Oceanographer", "Environmental Scientist", "Fisheries Manager"],
      fitScore: 75,
      description: "Focuses on marine ecosystems and conservation. Prepares students for careers in marine science and research."
    },
    
    // Additional specialized streams
    {
      name: "Aviation & Aeronautics",
      subjects: ["Mathematics", "Physical Sciences", "Geography", "Engineering Graphics and Design"],
      interests: ["Engineering", "Science & Research"],
      careers: ["Pilot", "Aerospace Engineer", "Air Traffic Controller", "Aircraft Mechanic"],
      fitScore: 70,
      description: "For students interested in aviation and aircraft. Leads to careers in the growing aerospace industry."
    },
    {
      name: "Forensic Science",
      subjects: ["Life Sciences", "Physical Sciences", "Mathematics", "History"],
      interests: ["Science & Research", "Law & Justice"],
      careers: ["Forensic Scientist", "Crime Scene Investigator", "Pathologist", "Toxicologist"],
      fitScore: 65,
      description: "Combines science with criminal investigation. Prepares students for careers in forensic laboratories and law enforcement."
    },
    {
      name: "Sports Science",
      subjects: ["Life Sciences", "Physical Education", "Mathematics or Maths Literacy", "Consumer Studies"],
      interests: ["Sports & Fitness"],
      careers: ["Sports Scientist", "Biokineticist", "Fitness Trainer", "Sports Coach"],
      fitScore: 60,
      description: "Focuses on human performance and exercise science. Leads to careers in sports medicine and fitness industries."
    }
  ];

  // Expanded list of 40 career options with detailed information
  const careerOptions = [
    // Technology & IT Careers
    {
      name: "Software Developer",
      description: "Design and develop computer applications and systems",
      salary: "R300,000 - R1,000,000+",
      education: "Degree in Computer Science or related field",
      demand: "High demand in South Africa",
      interests: ["Technology & IT"],
      subjects: ["Mathematics", "Physical Sciences", "Information Technology"]
    },
    {
      name: "Data Scientist",
      description: "Analyze and interpret complex data to help organizations make decisions",
      salary: "R400,000 - R1,200,000+",
      education: "Degree in Computer Science, Statistics or Mathematics",
      demand: "Growing demand with digital transformation",
      interests: ["Technology & IT", "Business & Finance"],
      subjects: ["Mathematics", "Physical Sciences", "Information Technology"]
    },
    {
      name: "Cybersecurity Specialist",
      description: "Protect computer systems and networks from cyber attacks",
      salary: "R350,000 - R1,100,000+",
      education: "Degree in IT with cybersecurity focus",
      demand: "Critical need in financial and government sectors",
      interests: ["Technology & IT"],
      subjects: ["Mathematics", "Physical Sciences", "Information Technology"]
    },
    
    // Engineering Careers
    {
      name: "Civil Engineer",
      description: "Design and oversee construction of infrastructure projects",
      salary: "R350,000 - R900,000+",
      education: "BEng in Civil Engineering",
      demand: "Steady demand for infrastructure development",
      interests: ["Engineering"],
      subjects: ["Mathematics", "Physical Sciences", "Engineering Graphics and Design"]
    },
    {
      name: "Mining Engineer",
      description: "Plan and supervise mining operations and mineral extraction",
      salary: "R400,000 - R1,000,000+",
      education: "BEng in Mining Engineering",
      demand: "Important in South Africa's mining sector",
      interests: ["Engineering"],
      subjects: ["Mathematics", "Physical Sciences", "Geography"]
    },
    {
      name: "Renewable Energy Engineer",
      description: "Develop sustainable energy solutions like solar and wind power",
      salary: "R300,000 - R800,000+",
      education: "Engineering degree with energy focus",
      demand: "Growing with green energy initiatives",
      interests: ["Engineering", "Environment & Nature"],
      subjects: ["Mathematics", "Physical Sciences", "Geography"]
    },
    
    // Medical Careers
    {
      name: "Medical Doctor",
      description: "Diagnose and treat illnesses and injuries",
      salary: "R400,000 - R2,000,000+",
      education: "MBChB degree + internship + community service",
      demand: "Always high demand, especially in rural areas",
      interests: ["Medicine & Health"],
      subjects: ["Mathematics", "Physical Sciences", "Life Sciences"]
    },
    {
      name: "Nurse",
      description: "Provide patient care and assist doctors in medical settings",
      salary: "R200,000 - R600,000+",
      education: "Nursing diploma or degree",
      demand: "Critical shortage in South Africa",
      interests: ["Medicine & Health"],
      subjects: ["Life Sciences", "Mathematics or Maths Literacy"]
    },
    {
      name: "Physiotherapist",
      description: "Help patients recover movement after injuries or illness",
      salary: "R250,000 - R700,000+",
      education: "Degree in Physiotherapy",
      demand: "Growing with sports medicine and rehabilitation needs",
      interests: ["Medicine & Health", "Sports & Fitness"],
      subjects: ["Life Sciences", "Physical Sciences"]
    },
    
    // Business & Finance Careers
    {
      name: "Chartered Accountant",
      description: "Prepare and examine financial records for organizations",
      salary: "R400,000 - R1,500,000+",
      education: "BCom Accounting + articles + board exams",
      demand: "Always in demand for financial management",
      interests: ["Business & Finance"],
      subjects: ["Accounting", "Mathematics", "Business Studies"]
    },
    {
      name: "Financial Analyst",
      description: "Assess financial data to guide investment decisions",
      salary: "R300,000 - R900,000+",
      education: "Degree in Finance, Economics or Accounting",
      demand: "Important in banking and investment sectors",
      interests: ["Business & Finance"],
      subjects: ["Accounting", "Mathematics", "Economics"]
    },
    {
      name: "Entrepreneur",
      description: "Start and run your own business venture",
      salary: "Varies widely based on business success",
      education: "Business education helpful but not required",
      demand: "Essential for economic growth and job creation",
      interests: ["Business & Finance"],
      subjects: ["Business Studies", "Economics", "Accounting"]
    },
    
    // Arts & Design Careers
    {
      name: "Graphic Designer",
      description: "Create visual concepts to communicate ideas",
      salary: "R150,000 - R500,000+",
      education: "Diploma or degree in Graphic Design",
      demand: "Steady demand in marketing and media",
      interests: ["Arts & Design"],
      subjects: ["Visual Arts", "Computer Applications Technology"]
    },
    {
      name: "Architect",
      description: "Design buildings and oversee their construction",
      salary: "R300,000 - R900,000+",
      education: "Degree in Architecture + internship",
      demand: "Growing with urban development",
      interests: ["Arts & Design", "Engineering"],
      subjects: ["Mathematics", "Physical Sciences", "Visual Arts"]
    },
    {
      name: "Fashion Designer",
      description: "Create clothing and accessory designs",
      salary: "R120,000 - R600,000+",
      education: "Diploma or degree in Fashion Design",
      demand: "Competitive but growing local industry",
      interests: ["Arts & Design"],
      subjects: ["Visual Arts", "Consumer Studies"]
    },
    
    // Science & Research Careers
    {
      name: "Biotechnologist",
      description: "Use biological processes for industrial applications",
      salary: "R250,000 - R700,000+",
      education: "Degree in Biotechnology or Microbiology",
      demand: "Growing in pharmaceutical and agricultural sectors",
      interests: ["Science & Research"],
      subjects: ["Life Sciences", "Physical Sciences", "Mathematics"]
    },
    {
      name: "Environmental Scientist",
      description: "Study and solve environmental problems",
      salary: "R200,000 - R600,000+",
      education: "Degree in Environmental Science",
      demand: "Increasing with environmental regulations",
      interests: ["Science & Research", "Environment & Nature"],
      subjects: ["Life Sciences", "Geography"]
    },
    {
      name: "Geologist",
      description: "Study earth materials and processes for mining and construction",
      salary: "R300,000 - R900,000+",
      education: "Degree in Geology",
      demand: "Important for mining and environmental sectors",
      interests: ["Science & Research"],
      subjects: ["Geography", "Physical Sciences", "Mathematics"]
    },
    
    // Law & Justice Careers
    {
      name: "Attorney",
      description: "Provide legal advice and represent clients in court",
      salary: "R300,000 - R1,500,000+",
      education: "LLB degree + articles + admission exam",
      demand: "Steady demand across legal fields",
      interests: ["Law & Justice"],
      subjects: ["History", "English Home Language"]
    },
    {
      name: "Forensic Investigator",
      description: "Collect and analyze crime scene evidence",
      salary: "R200,000 - R600,000+",
      education: "Degree in Forensic Science or related field",
      demand: "Growing with specialized law enforcement needs",
      interests: ["Law & Justice", "Science & Research"],
      subjects: ["Life Sciences", "Physical Sciences"]
    },
    {
      name: "Human Rights Advocate",
      description: "Promote and protect human rights through legal and social channels",
      salary: "R150,000 - R500,000+",
      education: "Degree in Law, Social Sciences or Human Rights",
      demand: "Important for social justice organizations",
      interests: ["Law & Justice", "Humanities & Social"],
      subjects: ["History", "Life Orientation"]
    },
    
    // Education Careers
    {
      name: "High School Teacher",
      description: "Educate students in specific subject areas",
      salary: "R200,000 - R500,000+",
      education: "Degree + PGCE teaching qualification",
      demand: "Always needed, especially in STEM subjects",
      interests: ["Education"],
      subjects: ["Subject you want to teach", "English Home Language"]
    },
    {
      name: "Educational Psychologist",
      description: "Help students with learning challenges and mental health",
      salary: "R300,000 - R800,000+",
      education: "Psychology degree + specialization",
      demand: "Growing awareness of mental health in schools",
      interests: ["Education", "Humanities & Social"],
      subjects: ["Life Sciences", "Life Orientation"]
    },
    {
      name: "University Professor",
      description: "Teach and conduct research at tertiary level",
      salary: "R400,000 - R1,200,000+",
      education: "PhD in specialized field",
      demand: "Competitive but rewarding academic path",
      interests: ["Education", "Science & Research"],
      subjects: ["Mathematics", "Physical Sciences", "English Home Language"]
    },
    
    // Environment & Nature Careers
    {
      name: "Conservationist",
      description: "Protect natural resources and wildlife habitats",
      salary: "R150,000 - R500,000+",
      education: "Degree in Conservation or Environmental Science",
      demand: "Important for biodiversity protection",
      interests: ["Environment & Nature"],
      subjects: ["Life Sciences", "Geography"]
    },
    {
      name: "Urban Planner",
      description: "Design and manage land use in cities and towns",
      salary: "R250,000 - R700,000+",
      education: "Degree in Urban Planning or related field",
      demand: "Growing with urbanization in South Africa",
      interests: ["Environment & Nature", "Humanities & Social"],
      subjects: ["Geography", "Mathematics"]
    },
    {
      name: "Marine Biologist",
      description: "Study ocean ecosystems and marine life",
      salary: "R200,000 - R600,000+",
      education: "Degree in Marine Biology or Zoology",
      demand: "Important for coastal conservation",
      interests: ["Environment & Nature", "Science & Research"],
      subjects: ["Life Sciences", "Geography"]
    },
    
    // Humanities & Social Careers
    {
      name: "Social Worker",
      description: "Help vulnerable individuals and communities",
      salary: "R150,000 - R400,000+",
      education: "Degree in Social Work",
      demand: "Critical need in South African society",
      interests: ["Humanities & Social"],
      subjects: ["Life Orientation", "History"]
    },
    {
      name: "Clinical Psychologist",
      description: "Diagnose and treat mental health conditions",
      salary: "R300,000 - R900,000+",
      education: "Psychology degree + internship + registration",
      demand: "Growing mental health awareness",
      interests: ["Humanities & Social", "Medicine & Health"],
      subjects: ["Life Sciences", "Life Orientation"]
    },
    {
      name: "Journalist",
      description: "Research and report news stories",
      salary: "R120,000 - R500,000+",
      education: "Degree in Journalism or Media Studies",
      demand: "Changing with digital media landscape",
      interests: ["Humanities & Social"],
      subjects: ["English Home Language", "History"]
    },
    
    // Sports & Fitness Careers
    {
      name: "Professional Athlete",
      description: "Compete in sports at highest levels",
      salary: "Varies widely by sport and success",
      education: "Training and talent development",
      demand: "Highly competitive but rewarding",
      interests: ["Sports & Fitness"],
      subjects: ["Physical Education", "Life Sciences"]
    },
    {
      name: "Biokineticist",
      description: "Use exercise to improve health and rehabilitate injuries",
      salary: "R200,000 - R500,000+",
      education: "Degree in Biokinetics",
      demand: "Growing with health awareness",
      interests: ["Sports & Fitness", "Medicine & Health"],
      subjects: ["Life Sciences", "Physical Education"]
    },
    {
      name: "Sports Coach",
      description: "Train and develop athletes and teams",
      salary: "R120,000 - R400,000+",
      education: "Diploma or degree in Sports Science",
      demand: "Steady in schools and professional teams",
      interests: ["Sports & Fitness"],
      subjects: ["Physical Education", "Life Sciences"]
    },
    
    // Agriculture & Food Careers
    {
      name: "Agricultural Scientist",
      description: "Research and improve farming techniques",
      salary: "R250,000 - R600,000+",
      education: "Degree in Agriculture or related field",
      demand: "Important for food security",
      interests: ["Agriculture & Food"],
      subjects: ["Agricultural Sciences", "Life Sciences"]
    },
    {
      name: "Food Technologist",
      description: "Develop and improve food products",
      salary: "R200,000 - R500,000+",
      education: "Degree in Food Science",
      demand: "Growing food processing industry",
      interests: ["Agriculture & Food", "Science & Research"],
      subjects: ["Agricultural Sciences", "Physical Sciences"]
    },
    {
      name: "Wine Maker",
      description: "Oversee production of wine from grapes",
      salary: "R180,000 - R700,000+",
      education: "Degree in Viticulture or Oenology",
      demand: "Important for South African wine industry",
      interests: ["Agriculture & Food"],
      subjects: ["Agricultural Sciences", "Chemistry"]
    },
    
    // Hospitality & Tourism Careers
    {
      name: "Chef",
      description: "Prepare and cook food in restaurants",
      salary: "R120,000 - R500,000+",
      education: "Culinary diploma or apprenticeship",
      demand: "Steady in growing hospitality sector",
      interests: ["Hospitality & Tourism"],
      subjects: ["Hospitality Studies", "Consumer Studies"]
    },
    {
      name: "Hotel Manager",
      description: "Oversee operations of hotels and resorts",
      salary: "R200,000 - R800,000+",
      education: "Degree in Hospitality Management",
      demand: "Important for tourism industry",
      interests: ["Hospitality & Tourism", "Business & Finance"],
      subjects: ["Hospitality Studies", "Business Studies"]
    },
    {
      name: "Tour Guide",
      description: "Lead and educate visitors about attractions",
      salary: "R80,000 - R300,000+",
      education: "Tourism qualification and specialized knowledge",
      demand: "Seasonal but important for tourism",
      interests: ["Hospitality & Tourism"],
      subjects: ["Geography", "History"]
    }
  ];

  // Grade 10-12 subject recommendations database with South African context
  const subjectRecommendations = {
    // Core subjects everyone should take (aligned with CAPS)
    core: [
      "English Home Language or First Additional Language",
      "Another South African Language (Home or First Additional)",
      "Mathematics or Mathematical Literacy",
      "Life Orientation"
    ],
    
    // University admission requirements for different programs
    universityRequirements: {
      "Engineering": "Mathematics (70%+), Physical Sciences (60%+)",
      "Medicine": "Mathematics (70%+), Physical Sciences (70%+), Life Sciences (70%+)",
      "Commerce": "Mathematics (60%+)",
      "Arts": "No specific requirements but relevant subjects recommended",
      "Science": "Mathematics (60%+), Physical Sciences (50%+)",
      "Education": "Depends on teaching subject specialization"
    }
  };

  // Form navigation
  const form = document.getElementById('assistedSelectionForm');
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  let currentStep = 0;

  // Initialize form
  showStep(currentStep);
  initializeCurrentSubjects();
  initializeInterestSelection();

  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
        
        // Generate recommendations when reaching results step
        if (currentStep === 2) {
          generateRecommendations();
        }
      }
    });
  });

  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      currentStep--;
      showStep(currentStep);
      updateProgressBar();
    });
  });

  // Show current step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
    });
  }

  // Update progress bar
  function updateProgressBar() {
    progressSteps.forEach((step, index) => {
      if (index <= currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  // Basic validation for each step
  function validateStep(stepIndex) {
    let isValid = true;
    
    if (stepIndex === 0) {
      // Validate at least 7 subjects selected (typical South African curriculum)
      const selectedSubjects = document.querySelectorAll('input[name="current-subjects"]:checked');
      if (selectedSubjects.length < 7) {
        alert('Please select at least 7 subjects (typical South African curriculum)');
        isValid = false;
      }
    }
    
    if (stepIndex === 1) {
      // Validate interests
      const selectedInterests = document.querySelectorAll('input[name="interests"]:checked');
      if (selectedInterests.length === 0) {
        alert('Please select at least one area of interest');
        isValid = false;
      } else if (selectedInterests.length > 5) {
        alert('Please select no more than 5 interest areas for more accurate recommendations');
        isValid = false;
      }
    }
    
    return isValid;
  }

  // Initialize current subject selection
  function initializeCurrentSubjects() {
    const container = document.getElementById('currentSubjectsContainer');
    
    // Group subjects by category
    const subjectsByCategory = {};
    grade9Subjects.forEach(subject => {
      if (!subjectsByCategory[subject.category]) {
        subjectsByCategory[subject.category] = [];
      }
      subjectsByCategory[subject.category].push(subject);
    });
    
    // Create sections for each category
    for (const category in subjectsByCategory) {
      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category;
      categoryTitle.style.gridColumn = '1 / -1';
      categoryTitle.style.marginTop = '20px';
      categoryTitle.style.marginBottom = '10px';
      categoryTitle.style.color = '#3328bf';
      container.appendChild(categoryTitle);
      
      subjectsByCategory[category].forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject-card';
        div.innerHTML = `
          <input type="checkbox" id="subject-${subject.name.toLowerCase().replace(/\s+/g, '-')}" 
                 name="current-subjects" value="${subject.name}">
          <label for="subject-${subject.name.toLowerCase().replace(/\s+/g, '-')}">
            <i class="${subject.icon}"></i>
            <span class="subject-name">${subject.name}</span>
          </label>
        `;
        container.appendChild(div);
      });
    }
  }
  
  // Initialize interest selection
  function initializeInterestSelection() {
    const container = document.getElementById('interestsContainer');
    
    interestCategories.forEach(interest => {
      const div = document.createElement('div');
      div.className = 'interest-card';
      div.innerHTML = `
        <input type="checkbox" id="interest-${interest.name.toLowerCase().replace(/\s+/g, '-')}" 
               name="interests" value="${interest.name.toLowerCase().replace(/\s+/g, '-')}"
               data-careers="${interest.careers.join(',')}">
        <label for="interest-${interest.name.toLowerCase().replace(/\s+/g, '-')}">
          <i class="${interest.icon}"></i>
          <span class="interest-name">${interest.name}</span>
          <span class="interest-description">${interest.description}</span>
        </label>
      `;
      container.appendChild(div);
    });
  }
  
  // Generate subject recommendations based on user input
  function generateRecommendations() {
    // Show loading state
    const resultsContainer = document.getElementById('recommendationsContainer');
    resultsContainer.innerHTML = `
      <div class="loading-results">
        <i class="fas fa-spinner fa-spin"></i>
        <p class="loading-text">Analyzing your subjects and interests to generate recommendations...</p>
      </div>
    `;
    
    // Get selected subjects
    const selectedSubjects = [];
    document.querySelectorAll('input[name="current-subjects"]:checked').forEach(checkbox => {
      selectedSubjects.push(checkbox.value);
    });
    
    // Get selected interests
    const selectedInterests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
      selectedInterests.push(checkbox.value);
    });
    
    // Simulate processing delay
    setTimeout(() => {
      // Find matching subject streams based on interests
      const matchingStreams = subjectStreams.filter(stream => {
        return stream.interests.some(interest => 
          selectedInterests.includes(interest.toLowerCase().replace(/\s+/g, '-'))
        );
      });
      
      // Calculate fit score for each stream based on selected subjects
      matchingStreams.forEach(stream => {
        let score = 50; // Base score
        // Increase score for each matching subject
        selectedSubjects.forEach(subject => {
          if (stream.subjects.includes(subject.split('(')[0].trim())) {
            score += 10;
          }
        });
        stream.fitScore = Math.min(100, score); // Cap at 100%
      });
      
      // Sort by fit score (highest first)
      matchingStreams.sort((a, b) => b.fitScore - a.fitScore);
      
      // Get top 5 most relevant streams
      const topStreams = matchingStreams.slice(0, 5);
      
      // Get careers related to selected interests
      const selectedCareers = [];
      document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        const interestCareers = checkbox.getAttribute('data-careers').split(',');
        interestCareers.forEach(career => {
          if (!selectedCareers.includes(career)) {
            selectedCareers.push(career);
          }
        });
      });
      
      // Get full career objects for selected careers
      const matchingCareers = careerOptions.filter(career => 
        selectedCareers.includes(career.name)
      );
      
      // Get 5-7 random careers from matching ones
      const recommendedCareers = [];
      const careerCount = Math.min(7, Math.max(5, matchingCareers.length));
      const shuffled = matchingCareers.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, careerCount);
      
      // Display recommendations
      displayRecommendations(topStreams, selected);
      
      // Display university requirements
      displayUniversityRequirements(topStreams);
      
      // Scroll to results
      document.querySelector('.form-step[data-step="3"]').scrollIntoView({
        behavior: 'smooth'
      });
    }, 1500);
  }
  
  // Display recommendations in the UI
  function displayRecommendations(streams, careers) {
    const container = document.getElementById('recommendationsContainer');
    const careerContainer = document.getElementById('careerPathwaysContainer');
    
    container.innerHTML = '';
    careerContainer.innerHTML = '<h2><i class="fas fa-graduation-cap"></i> Potential Career Pathways</h2>';
    
    if (streams.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No perfect matches found</h3>
          <p>We couldn't find subject combinations that match all your interests. Try adjusting your interests.</p>
        </div>
      `;
      return;
    }
    
    // Display core subjects
    const coreCard = document.createElement('div');
    coreCard.className = 'recommendation-card';
    coreCard.innerHTML = `
      <h3><i class="fas fa-book-open"></i> Core Subjects (Required for All Students)</h3>
      <p>These subjects are mandatory for the National Senior Certificate (NSC):</p>
      <ul class="subject-list">
        ${subjectRecommendations.core.map(subj => `<li>${subj}</li>`).join('')}
      </ul>
      <div class="fit-meter">
        <div class="meter-bar" style="width: 100%"></div>
      </div>
    `;
    container.appendChild(coreCard);
    
    // Display recommended streams
    streams.forEach((stream, index) => {
      const card = document.createElement('div');
      card.className = 'recommendation-card';
      card.innerHTML = `
        <h3><i class="fas fa-stream"></i> ${stream.name}</h3>
        <p>${stream.description}</p>
        <div class="fit-meter">
          <span>${stream.fitScore}% Match</span>
          <div class="meter-bar" style="width: ${stream.fitScore}%"></div>
        </div>
        <h4>Recommended Elective Subjects:</h4>
        <ul class="subject-list">
          ${stream.subjects.map(subj => `<li>${subj}</li>`).join('')}
        </ul>
      `;
      container.appendChild(card);
    });
    
    // Display career pathways
    const careerDiv = document.createElement('div');
    careerDiv.className = 'career-pathway';
    
    let careersHTML = `
      <h3><i class="fas fa-briefcase"></i> Career Options Matching Your Interests</h3>
      <div class="pathway-careers">
    `;
    
    careers.forEach(career => {
      careersHTML += `
        <div class="career-option">
          <h4>${career.name}</h4>
          <p><strong>Description:</strong> ${career.description}</p>
          <p><strong>Education:</strong> ${career.education}</p>
          <p><strong>Salary Range:</strong> ${career.salary}</p>
          <p><strong>Demand:</strong> ${career.demand}</p>
          <p><strong>Recommended Subjects:</strong> ${career.subjects.join(', ')}</p>
        </div>
      `;
    });
    
    careersHTML += `</div>`;
    careerDiv.innerHTML = careersHTML;
    careerContainer.appendChild(careerDiv);
  }
  
  // Display university requirements
  function displayUniversityRequirements(streams) {
    const container = document.getElementById('universityRequirementsContainer');
    container.innerHTML = `
      <h2><i class="fas fa-university"></i> University Admission Requirements</h2>
      <p>Important subject requirements for tertiary education in South Africa:</p>
    `;
    
    // Get unique requirements from all streams
    const allRequirements = [];
    streams.forEach(stream => {
      if (stream.universityRequirements) {
        stream.universityRequirements.forEach(req => {
          if (!allRequirements.includes(req)) {
            allRequirements.push(req);
          }
        });
      }
    });
    
    // Add general requirements
    const requirementsCard = document.createElement('div');
    requirementsCard.className = 'requirement-card';
    requirementsCard.innerHTML = `
      <h3>General University Admission Requirements</h3>
      <ul>
        <li>National Senior Certificate (NSC) with Bachelor's pass</li>
        <li>Minimum 50% in four designated NSC subjects (including English)</li>
        <li>Minimum 30% in one other subject</li>
        <li>Specific subject requirements vary by program</li>
      </ul>
    `;
    container.appendChild(requirementsCard);
    
    // Add program-specific requirements
    const programCard = document.createElement('div');
    programCard.className = 'requirement-card';
    
    let programRequirementsHTML = '<h3>Program-Specific Requirements</h3><ul>';
    
    // Add requirements from matching streams
    streams.forEach(stream => {
      if (stream.universityRequirements) {
        stream.universityRequirements.forEach(req => {
          programRequirementsHTML += `<li>${req}</li>`;
        });
      }
    });
    
    // Add general university requirements
    for (const program in subjectRecommendations.universityRequirements) {
      programRequirementsHTML += `<li><strong>${program}:</strong> ${subjectRecommendations.universityRequirements[program]}</li>`;
    }
    
    programRequirementsHTML += '</ul>';
    programCard.innerHTML = programRequirementsHTML;
    container.appendChild(programCard);
  }
  
  // Save all button handler
  document.querySelector('.save-all-btn').addEventListener('click', function() {
    // In a real app, this would generate a PDF with all recommendations
    const fileName = `Guideian_Subject_Recommendations_${new Date().toISOString().slice(0,10)}.pdf`;
    alert(`Your subject recommendations have been saved as ${fileName}`);
  });
  
  // Add animation to recommendation button
  const recommendationButton = document.querySelector('[data-step="2"] .next-btn');
  if (recommendationButton) {
    recommendationButton.addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing your profile...';
      setTimeout(() => {
        this.innerHTML = 'Get Recommendations <i class="fas fa-chart-line"></i>';
      }, 1500);
    });
  }
});