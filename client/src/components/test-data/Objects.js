export function Product(
  _id,
  active,
  date,
  email,
  feedback,
  name,
  pics,
  price,
  quantity,
  quantity_sold,
  shop,
  social,
  tags,
  type,
  user,
  visits
) {
  this._id = _id;
  this.active = active;
  this.date = date;
  this.email = email;
  this.feedback = feedback;
  this.name = name;
  this.pics = pics;
  this.price = price;
  this.quantity = quantity;
  this.quantity_sold = quantity_sold;
  this.shop = shop;
  this.social = social;
  this.tags = tags;
  this.type = type;
  this.user = user;
  this.visits = visits;
}

export function Shop(
  _id,
  active,
  address,
  date,
  email,
  feedback,
  followers,
  name,
  pics,
  products,
  products_sold,
  social,
  transactions,
  tags,
  type,
  user,
  visits
) {
  this._id = _id;
  this.active = active;
  this.address = address;
  this.date = date;
  this.email = email;
  this.feedback = feedback;
  this.followers = followers;
  this.name = name;
  this.pics = pics;
  this.products = products;
  this.products_sold = products_sold;
  this.social = social;
  this.transactions = transactions;
  this.tags = tags;
  this.type = type;
  this.user = user;
  this.visits = visits;
}

export function Transaction(
  _id,
  buyer,
  date,
  delivered,
  in_transit,
  paid,
  products,
  shop,
  seller,
  tax,
  total
) {
  this._id = _id;
  this.buyer = buyer;
  this.date = date;
  this.delivered = delivered;
  this.in_transit = in_transit;
  this.paid = paid;
  this.products = products;
  this.shop = shop;
  this.seller = seller;
  this.tax = tax;
  this.total = total;
}

export function User(
  _id,
  active,
  date,
  email,
  feedback,
  id_document,
  location,
  name,
  password,
  pic,
  products,
  products_bought,
  products_sold,
  shops_followed,
  shops_owned,
  social,
  transaction
) {
  this._id = _id;
  this.active = active;
  this.date = date;
  this.email = email;
  this.feedback = feedback;
  this.id_document = id_document;
  this.location = location;
  this.name = name;
  this.password = password;
  this.pic = pic;
  this.products = products;
  this.products_bought = products_bought;
  this.products_sold = products_sold;
  this.shops_followed = shops_followed;
  this.shops_owned = shops_owned;
  this.social = social;
  this.transaction = transaction;
}
