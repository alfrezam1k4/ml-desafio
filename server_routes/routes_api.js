const express = require("express"),
  router = express.Router(),
  request = require("request");
app = express();

const getItems = (products, categories) => {
  const data = {};
  const items = [];
  const author = { name: "Alfredo", lastName: "Zamora" };
  const categoriesArray = [];

  categories.path_from_root.map((category) => {
    categoriesArray.push(category.name);
  });
  data.author = author;
  data.categories = categoriesArray;

  products.map(async (product, index) => {
    let item = {};
    item.id = product.id;
    item.title = product.title;
    item.price = {
      currency: product.currency_id,
      amount: product.price,
    };
    item.picture = product.thumbnail;

    item.condition = product.condition;
    item.free_shipping = product.shipping.free_shipping;
    item.address = product.address.state_name;

    items.push(item);
  });

  data.items = items;
  return { ...data };
};

router.get("/items/:item_id", (req, res) => {
  let param = req.params.item_id ? req.params.item_id : "";
  let data = {};
  let product = {};

  const author = { name: "Alfredo", lastName: "Zamora" };
  const item = {};
  request.get(
    "https://api.mercadolibre.com/items/" + param,
    (_err, _res, _data) => {
      data = JSON.parse(_data);

      product.author = author;
      item.id = data.id;
      item.title = data.title;
      item.price = {
        currency: data.currency_id,
        amount: data.price,
      };
      product.item = item;

      product.picture = JSON.parse(_data).pictures[0].url;

      product.condition = data.condition;
      product.free_shipping = data.shipping.free_shipping;
      product.sold_quantity = data.sold_quantity;

      request.get(
        "https://api.mercadolibre.com/items/" + param + "/description",
        (_err, _res, _data) => {
          var description = JSON.parse(_data);

          if (description.plain_text == "") {
            product.description = description.text;
          } else {
            product.description = description.plain_text;
          }

          request.get(
            "https://api.mercadolibre.com/categories/" + data.category_id,
            function (_err, _res, _data) {
              const categories = [];

              JSON.parse(_data).path_from_root.map((category) => {
                categories.push(category.name);
              });
              return res.json({ product, categories });
            }
          );
        }
      );
    }
  );
});

router.get("/items", (req, res) => {
  const param = req.query.q ? req.query.q : "";
  let products;

  request.get(
    "https://api.mercadolibre.com/sites/MLA/search?limit=4&q=" + param,
    (_err, _res, _data) => {
      var data = JSON.parse(_data);

      products = data.results;
      if (products.length > 0)
        request.get(
          "https://api.mercadolibre.com/categories/" + products[0].category_id,
          function (_err, _res, _data) {
            let categories = JSON.parse(_data);

            return res.json(getItems(products, categories));
          }
        );
    }
  );
});

module.exports = router;
