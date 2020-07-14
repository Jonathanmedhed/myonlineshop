import { Product, Shop, User, Transaction } from "./Objects";

const userDummy = new User(
  1,
  true,
  new Date(),
  "User@hmail.com",
  [],
  "../../img/id.jpeg",
  "Caracas",
  "John Doe",
  "password",
  "../../img/woman-sm.jpg",
  null,
  [],
  [],
  [],
  [],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  []
);

const product = new Product(
  1,
  true,
  new Date(),
  "product@gmail.com",
  [{ user: userDummy, stars: 5, comment: "Thanks!" }],
  "Samsung Galaxy S12",
  ["../../img/galaxy1.jpg", "../../img/galaxy2.jpg"],
  500,
  20,
  30,
  null,
  [{ amazon: "amazon.com" }],
  ["cellphone", "mobile", "samsung", "galaxy"],
  "mobile",
  null,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);

const shop = new Shop(
  1,
  true,
  "https://goo.gl/maps/WewCfyQWCy5kPcdU8",
  new Date(),
  "shop@hmail.com",
  [],
  [userDummy, userDummy, userDummy, userDummy, userDummy],
  "Shop",
  ["../../img/shop1.jpeg"],
  [],
  [
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("May 1, 2020 03:24:00") },
    { product: product, date: new Date("May 5, 2020 03:24:00") },
    { product: product, date: new Date("May 9, 2020 03:24:00") },
    { product: product, date: new Date("May 15, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 20, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("June 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
  ],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [],
  ["cellphone", "mobile"],
  "mobile",
  null,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);

const transaction = new Transaction(
  1,
  null,
  "7/5/2020",
  1,
  true,
  [],
  null,
  null,
  5,
  100
);

const user = new User(
  1,
  true,
  new Date(),
  "User@hmail.com",
  [],
  "../../img/id.jpeg",
  "Caracas",
  "John Doe",
  "password",
  "../../img/woman-sm.jpg",
  null,

  [product, product, product],
  [],
  [
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("May 1, 2020 03:24:00") },
    { product: product, date: new Date("May 5, 2020 03:24:00") },
    { product: product, date: new Date("May 9, 2020 03:24:00") },
    { product: product, date: new Date("May 15, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 20, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("June 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
  ],
  [],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  []
);

/**********************************************************************************************************
 * Products
 **********************************************************************************************************/

const product1 = new Product(
  1,
  true,
  new Date(),
  "product@gmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "Samsung Galaxy S12",
  ["../../img/galaxy1.jpg", "../../img/galaxy2.jpg"],
  500,
  20,
  30,
  shop,
  [{ amazon: "amazon.com" }],
  ["cellphone", "mobile", "samsung", "galaxy"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);
const product2 = new Product(
  1,
  true,
  new Date(),
  "product@gmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "iphone 11",
  ["../../img/iphone1.jpg", "../../img/iphone2.jpg"],
  20,
  shop,
  [{ amazon: "amazon.com" }],
  ["cellphone", "mobile", "iphone"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);
const product3 = new Product(
  1,
  true,
  new Date(),
  "product@gmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "iphone 11",
  ["../../img/xperia1.jpeg", "../../img/xperia2.jpeg"],
  20,
  shop,
  [{ amazon: "amazon.com" }],
  ["cellphone", "mobile", "xperia", "sony"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);

/**********************************************************************************************************
 * Shops
 **********************************************************************************************************/

const shop1 = new Shop(
  1,
  true,
  "https://goo.gl/maps/WewCfyQWCy5kPcdU8",

  new Date(),
  "shop@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  [user, user, user],
  "Shop",
  ["../../img/shop1.jpeg"],
  [product, product2, product3],
  [product, product2, product3],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction, transaction],
  ["cellphone", "mobile"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);
const shop2 = new Shop(
  1,
  true,
  "https://goo.gl/maps/WewCfyQWCy5kPcdU8",

  new Date(),
  "shop@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  [user, user, user],
  "Shop2",
  ["../../img/shop2.jpeg"],
  [product, product, product],
  [product, product2, product3],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction, transaction],
  ["cellphone", "mobile"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);
const shop3 = new Shop(
  1,
  true,
  "https://goo.gl/maps/WewCfyQWCy5kPcdU8",

  new Date(),
  "shop@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  [user, user, user],
  "Shop3",
  ["../../img/shop3.jpeg"],
  [product, product, product],
  [product, product2, product3],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction, transaction],
  ["cellphone", "mobile"],
  "mobile",
  user,
  [userDummy, userDummy, userDummy, userDummy, userDummy]
);

/**********************************************************************************************************
 * Transaction
 **********************************************************************************************************/

const transaction1 = new Transaction(
  1,
  user,
  "7/5/2020",
  false,
  true,
  1,
  true,
  [product, product, product],
  shop,
  user,
  5,
  100
);
const transaction2 = new Transaction(
  1,
  user,
  "7/5/2020",
  true,
  false,
  1,
  true,
  [product, product, product],
  shop,
  user,
  5,
  100
);
const transaction3 = new Transaction(
  1,
  user,
  "7/5/2020",
  true,
  true,
  1,
  true,
  [product, product, product],
  shop,
  user,
  5,
  100
);

/**********************************************************************************************************
 * Users
 **********************************************************************************************************/
const user1 = new User(
  1,
  true,
  new Date(),
  "User@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "../../img/id.jpeg",
  "Caracas",
  "John Doe",
  "password",
  "../../img/woman-sm.jpg",
  [product, product, product],
  [product, product, product],
  [
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("January 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("February 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("March 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("April 17, 2020 03:24:00") },
    { product: product, date: new Date("May 1, 2020 03:24:00") },
    { product: product, date: new Date("May 5, 2020 03:24:00") },
    { product: product, date: new Date("May 9, 2020 03:24:00") },
    { product: product, date: new Date("May 15, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 17, 2020 03:24:00") },
    { product: product, date: new Date("May 20, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("May 29, 2020 03:24:00") },
    { product: product, date: new Date("June 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("July 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("August 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("September 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("November 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date("December 17, 2020 03:24:00") },
    { product: product, date: new Date() },
    { product: product, date: new Date() },
    { product: product, date: new Date() },
    { product: product, date: new Date() },
    { product: product, date: new Date() },
    { product: product, date: new Date() },
  ],
  [shop, shop],
  [shop],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction]
);
const user2 = new User(
  1,
  true,
  new Date(),
  "User@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "../../img/id.jpeg",
  "Caracas",
  "Jose Doe",
  "password",
  "../../img/woman-sm.jpg",
  [product, product, product],
  [product, product, product],
  [shop, shop],
  [shop],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction]
);
const user3 = new User(
  1,
  true,
  new Date(),
  "User@hmail.com",
  [{ user: user, stars: 5, comment: "Thanks!" }],
  "../../img/id.jpeg",
  "Caracas",
  "Maria Doe",
  "password",
  "../../img/woman-sm.jpg",
  [product, product, product],
  [product, product, product],
  [shop, shop],
  [shop],
  [
    {
      amazon: "amazon.com",
      facebook: "facebook.com",
      twitter: "twitter.com",
      linkedin: "linked.com",
      instagram: "insta.com",
    },
  ],
  [transaction, transaction]
);

export const products = [product, product, product];
export const shops = [shop1, shop2, shop3];
export const users = [user1, user2, user3];
export const transactions = [transaction1, transaction2, transaction3];
