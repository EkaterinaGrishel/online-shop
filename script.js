const items = [
  {
    title: "Боди из Кружева и Тюля Enternal Love",
    description: "Боди с бюсгалтером балконет на костачках",
    tags: ["S", "M"],
    price: 5999,
    img: "./img/1.jpeg",
    rating: 4.4,
  },
  {
    title: "Боди из кружева и Тюля Loosen Heartstrings",
    description: "Чувственное боди со вставками из кружева и тюля",
    tags: ["XS", "S"],
    price: 5999,
    img: "./img/2.jpeg",
    rating: 3.1,
  },
  {
    title: "Майка c бретелями из Шелка и Модала",
    description: "Майка с широкими бретелями и глубоким круглым вырезом.",
    tags: ["S", "M", "L"],
    price: 3499,
    img: "./img/3.jpeg",
    rating: 5.0,
  },
  {
    title: "Шелковая Рубашка с Длинными Рукавами",
    description: "Рубашка из чистого шелка с длинными рукавами",
    tags: ["S", "M", "L"],
    price: 11999,
    img: "./img/4.jpeg",
    rating: 3.4,
  },
  {
    title: "Джемпер из Ультралегкого Кашемира и Модала",
    description: "Топ с длинными рукавами и вырезом «лодочка»",
    tags: ["S", "M", "L", "XL"],
    price: 3499,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Водолазка из шерсти и шелка с длинным рукавом",
    description: "Водолазка с длинным рукавом из смеси шерсти и шелка",
    tags: ["S", "M", "L"],
    price: 4999,
    img: "./img/6.jpeg",
    rating: 3.2,
  },
  {
    title: "Беби-долл из Кружева и Тюля Loosen Heartstrings",
    description: "Комбинация беби-долл с треугольными чашками.",
    tags: ["S", "M", "L"],
    price: 4999,
    img: "./img/7.jpeg",
    rating: 2.9,
  },
  {
    title: "Комбинация из шелка на тонких бретелях",
    description: "Комбинация из гладкого шелка на тонких регулируемых бретелях",
    tags: ["XS", "S", "M", "L"],
    price: 7799,
    img: "./img/8.jpeg",
    rating: 4.7,
  },
  {
    title: "Комбинация из Шёлка Lovely Day",
    description: "Комбинация из шёлкового атласа с отделкой из вышитого тюля.",
    tags: ["S", "M", "L"],
    price: 8999,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Топ из Шелкового Атласа с V-образным Вырезом",
    description: "Топ из шелкового атласа с V-образными вырезами",
    tags: ["XS", "S", "M", "L"],
    price: 4999,
    img: "./img/10.jpeg",
    rating: 2.2,
  },
  {
    title: "Топ из тонкого хлопка Supima®",
    description: "Топ на тонких бретелях из ультратонкого хлопка Supima®.",
    tags: ["S", "M", "L"],
    price: 1499,
    img: "./img/11.jpeg",
    rating: 3.7,
  },
  {
    title: "Топ из Ультратонкого Модала с кашемиром",
    description: "Топ из ультратонкого модала с кашемиром",
    tags: ["S", "M", "L"],
    price: 2499,
    img: "./img/12.jpeg",
    rating: 4.1,
  },
];


let currentState = [...items]; 
const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const sortControl = document.querySelector("#sort");


function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}


function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }

  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} P`;


  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}


function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
