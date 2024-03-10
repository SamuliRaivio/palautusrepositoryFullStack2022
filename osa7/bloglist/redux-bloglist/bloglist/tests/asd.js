const x = { x: "x", y: "y", z: "a" };

if (x["z"]) {
  console.log("yes");
}

x.c = "asd";

console.log(x);

console.log(x.hasOwnProperty("x"));
console.log(x["t"] === undefined);
