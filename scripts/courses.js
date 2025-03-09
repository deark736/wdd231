/* courses.js */
const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      completed: true
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      completed: true
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      completed: false
    }
  ];
  
  function displayCourses(filter) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
  
    // Filter the courses
    let filteredCourses = [];
    if (filter === 'All') {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter(course => course.subject === filter);
    }
  
    // Create a card for each course
    filteredCourses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('course-card');
      // Mark completed courses differently
      if (course.completed) {
        card.classList.add('completed');
      }
  
      card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p>Credits: ${course.credits}</p>
      `;
      cardsContainer.appendChild(card);
    });
  
    // Calculate total credits for the filtered set
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
  }
  
  // Handle filter button clicks
  document.getElementById('allBtn').addEventListener('click', () => {
    displayCourses('All');
  });
  document.getElementById('cseBtn').addEventListener('click', () => {
    displayCourses('CSE');
  });
  document.getElementById('wddBtn').addEventListener('click', () => {
    displayCourses('WDD');
  });
  
  // Initial load: show all courses
  displayCourses('All');
  