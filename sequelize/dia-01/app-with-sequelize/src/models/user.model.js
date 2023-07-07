const sara = await User.create({
  fullName: 'Sara Silva Santos',
  email: 'sara.ss@trybe.com',
});

console.log(sara instanceof User); // true
console.log(sara.name); // "Sara Silva Santos"