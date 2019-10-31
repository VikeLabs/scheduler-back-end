const fs = require('fs');

console.log('Reading file...');
const raw = fs.readFileSync('example.json');
console.log('Converting file...');
const data = JSON.parse(raw);
console.log('Done reading file');

const courses = [];
console.log('Parsing course information...');
data.forEach(course => {
	courses.push({
		title: course.course_title,
		subject: course.subject,
		code: course.course_code,
		term: course.term
	});
});

console.log('Done parsing course information');
const output = JSON.stringify(courses);
console.log('Saving parsed data...');
fs.writeFileSync('courses.json', output);
console.log('Done!');
