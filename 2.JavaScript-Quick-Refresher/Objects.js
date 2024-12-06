const person = {
  name: "Max",
  age: 23,
  greed() {
    console.log("Hi,I am " + this.name);
  },
};

const hobbies = ["Sport", "Cooking"];
hobbies.push("Programming");

// const copyedArray = hobbies.slice();
const copyedArray = [...hobbies];

// console.log(hobbies.map((hobby) => console.log("Hobby:" + hobby)));
// console.log(person.greed());

//Rest Operator
const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));

console.log(Object.keys(per));
