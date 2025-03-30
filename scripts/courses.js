const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    completed: true,
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    certificate: 'Web and Computer Programming',
    technology: ['Python']
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    completed: true,
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on, with students participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    certificate: 'Web and Computer Programming',
    technology: ['HTML', 'CSS']
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    completed: true,
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    certificate: 'Web and Computer Programming',
    technology: ['Python']
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    completed: true,
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    certificate: 'Web and Computer Programming',
    technology: ['C#']
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    completed: true,
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    certificate: 'Web and Computer Programming',
    technology: ['HTML', 'CSS', 'JavaScript']
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Web Frontend Development I',
    credits: 2,
    completed: false,
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    certificate: 'Web and Computer Programming',
    technology: ['HTML', 'CSS', 'JavaScript']
  }
];

function displayCourses(filter) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';

  let filteredCourses = [];
  if (filter === 'All') {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter(course => course.subject === filter);
  }

  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
    `;
    cardsContainer.appendChild(card);

    card.addEventListener('click', () => {
      displayCourseDetails(course);
    });
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById('totalCredits').textContent = totalCredits;
}

function displayCourseDetails(course) {
  const courseDetails = document.getElementById('course-details');
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  document.getElementById('closeModal').addEventListener("click", () => {
      courseDetails.close();
  });

  courseDetails.addEventListener('click', (event) => {
      if (event.target === courseDetails) {
          courseDetails.close();
      }
  });
}

document.getElementById('allBtn').addEventListener('click', () => {
  displayCourses('All');
});
document.getElementById('cseBtn').addEventListener('click', () => {
  displayCourses('CSE');
});
document.getElementById('wddBtn').addEventListener('click', () => {
  displayCourses('WDD');
});

displayCourses('All');