const colors = Object.freeze({
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
});
const sizes = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
  // state space explosion
}

let apple = new Product('apple', colors.green, sizes.small);
let tree = new Product('tree', colors.green, sizes.large);
let house = new Product('house', colors.blue, sizes.large);

let products = [apple, tree, house];

let pF = new ProductFilter();
console.log('the old method');
for (let p of pF.filterByColor(products, colors.green)) {
  console.log(`${p.name} is green`);
}

// the new method

class ColorSpecication {
  constructor(color) {
    this.color = color;
  }
  isSatisfied(item) {
    return item.color === this.color;
  }
}
class SizeSpecication {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

class AndSpecification {
  constructor(...spec) {
    this.spec = spec;
  }

  isSatisfied(item) {
    return this.spec.every((x) => x.isSatisfied(item));
  }
}

let bf = new BetterFilter();

console.log(`the new method `);
// for (let p of bf.filter(products, new ColorSpecication(colors.green))) {
//   console.log(`${p.name} is green `);
// }

let spec = new AndSpecification(
  new ColorSpecication(colors.green),
  new SizeSpecication(sizes.large)
);
console.log('products', products);
console.log('spec', spec);
for (let p of bf.filter(products, spec)) {
  console.log(`${p.name} is green and large `);
}
