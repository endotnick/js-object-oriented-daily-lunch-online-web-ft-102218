// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

const Neighborhood = (() => { 
  let = neighborhoodId = 0;
  return class {
    constructor(name) {
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }    
    
    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }
  };
})();

const Customer = (() => { 
  let customerId = 0;
  return class {
    constructor ( name, neighborhoodId) {
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      this.id = ++customerId;
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
  };
})();

const Meal = (() => { 
  let mealId= 0;
  
  return class {
    constructor (title, price) {
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
    } 
    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
      const customers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(customers)];
    } 
    
    static byPrice() {
      return store.meals.sort((a,b) => b.price - a.price);
    } 
  };
})();

const Delivery = (() => { 
  let deliveryId = 0;

  return class {
    constructor(mealId, neighborhoodId, customerId) {
      this.mealId = mealId; 
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId; 
      this.id = ++deliveryId;
      store.deliveries.push(this);
    }
    
    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }
    
    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }
    
    customer() {
      return store.customers.find(customer => customer.id === this.customerId);
    }
  };
})();
  