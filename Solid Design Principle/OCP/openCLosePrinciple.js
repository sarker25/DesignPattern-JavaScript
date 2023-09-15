let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  sm: "small",
  md: "medium",
  lg: "large",
});

class Product {
  constructor(name, size, color, price) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.price = price;
  }
}
// old approach
// TODO:  ** state space explotion ** will occur
class ProductFilter {
  constructor() {}
  filterByColor(products, color) {
    return products.filter((pro) => pro.color === color);
  }
  filterBysize(products, size) {
    return products.filter((pro) => pro.size === size);
  }
  filterBySizeAndColor(products, color, size) {
    return products.filter((pro) => {
      pro.size === size && pro.color === color;
    });
  }
}

//  new approach

// specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }
  isSatisfied(item) {
    return item.color === this.color;
  }
}
class SizeSpecification {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}
class PriceSpecification {
  constructor(price) {
    this.price = price;
  }
  isSatisfied(item) {
    return item.price === this.price;
  }
}

let apple = new Product("Apple", Size.sm, Color.red, 150);
let orange = new Product("Orange", Size.md, Color.green, 120);
let lemon = new Product("Orange", Size.md, Color.red, 80);
console.log(apple);
let pf = new ProductFilter();
const products = [apple, orange, lemon];

console.log("======== old way =========");
for (let product of pf.filterByColor(products, Color.red)) {
  console.log(`* ${product.name} color is red`);
}
console.log("\n");

console.log("======== new way =========");

class BetterFilter {
  filter(items, spec) {
    return items.filter((item) => spec.isSatisfied(item));
  }
}
const bf = new BetterFilter();

for (let pro of bf.filter(products, new ColorSpecification(Color.red))) {
  console.log(`* : ${pro.name} is ${pro.color}`);
}

console.log("======== combinators way(and) =========");

class AndCombinators {
  constructor(...specs) {
    this.specs = specs;
  }
  isSatisfied(item) {
    return this.specs.every((spec) => spec.isSatisfied(item));
  }
}

const andComb = new AndCombinators(
  new ColorSpecification(Color.red),
  new SizeSpecification(Size.md)
);

for (let product of bf.filter(products, andComb)) {
  console.log(`* : ${product.name} is ${product.color} and ${product.size}`);
}
