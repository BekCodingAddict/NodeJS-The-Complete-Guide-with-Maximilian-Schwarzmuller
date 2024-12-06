const person = {
  name: "Max",
  age: 23,
  greed() {
    console.log("Hi,I am " + this.name);
  },
};

// const printName = (person) => {
//   console.log(person.name);
// };
const printName = ({ name }) => {
  console.log(name);
};

printName(person);

const hobbies = ["Sport", "Movie"];
const [Sprot, Movie] = hobbies;
console.log(Sprot, Movie);
