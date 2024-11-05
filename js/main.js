import { isMeetingWithinWorkHours } from './functions.js';
import { similarComments } from './data.js';
const comments = similarComments();
console.log(comments);

console.log(isMeetingWithinWorkHours('8:00', '10:00', '8:00', 120));
console.log(isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120));
console.log(isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90));
console.log(isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90));
console.log(isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900));
