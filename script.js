const events = [
  {
    id: "eden",
    title: "Начало истории человечества",
    date: "Около 4026 до н. э.",
    place: "Эдем",
    era: "Ранняя история",
    description: "Сотворение первых людей и начало человеческой истории согласно библейскому повествованию.",
    map: { x: 130, y: 340, label: "Эдем" }
  },
  {
    id: "flood",
    title: "Всемирный потоп",
    date: "Около 2370 до н. э.",
    place: "Регион Арарата",
    era: "Ранняя история",
    description: "Период потопа и последующего расселения народов после дней Ноя.",
    map: { x: 220, y: 300, label: "Арарат" }
  },
  {
    id: "abraham",
    title: "Путь Авраама",
    date: "Около 1943 до н. э.",
    place: "Ур - Харран - Ханаан",
    era: "Патриархи",
    description: "Переход Авраама в землю Ханаан и начало особой линии библейской истории.",
    map: { x: 290, y: 220, label: "Харран" }
  },
  {
    id: "exodus",
    title: "Исход из Египта",
    date: "1513 до н. э.",
    place: "Египет - Синай",
    era: "Израиль",
    description: "Освобождение израильтян из Египта и путь к земле обетованной.",
    map: { x: 370, y: 245, label: "Синай" }
  },
  {
    id: "kingdom",
    title: "Объединенное царство",
    date: "Около 1077-997 до н. э.",
    place: "Иерусалим",
    era: "Израиль",
    description: "Период правления Саула, Давида и Соломона, укрепление столицы в Иерусалиме.",
    map: { x: 470, y: 210, label: "Иерусалим" }
  },
  {
    id: "exile",
    title: "Вавилонский плен",
    date: "607 до н. э.",
    place: "Иерусалим - Вавилон",
    era: "Пророки",
    description: "Разрушение Иерусалима и переселение народа в Вавилон.",
    map: { x: 590, y: 168, label: "Вавилон" }
  },
  {
    id: "return",
    title: "Возвращение из плена",
    date: "537 до н. э.",
    place: "Вавилон - Иерусалим",
    era: "Пророки",
    description: "Возвращение иудеев на родину и восстановление поклонения в Иерусалиме.",
    map: { x: 520, y: 198, label: "Возвращение" }
  },
  {
    id: "jesus",
    title: "Служение Иисуса Христа",
    date: "29-33 н. э.",
    place: "Галилея и Иудея",
    era: "I век",
    description: "Проповедническое служение Иисуса и ключевые события, повлиявшие на мировую историю.",
    map: { x: 625, y: 235, label: "Галилея" }
  },
  {
    id: "pentecost",
    title: "Пятидесятница",
    date: "33 н. э.",
    place: "Иерусалим",
    era: "I век",
    description: "Начало христианского собрания в первом веке.",
    map: { x: 690, y: 260, label: "33 н.э." }
  },
  {
    id: "paul",
    title: "Миссионерские путешествия Павла",
    date: "47-61 н. э.",
    place: "Малая Азия - Греция - Рим",
    era: "I век",
    description: "Широкая проповедническая деятельность апостола Павла по всему Средиземноморью.",
    map: { x: 780, y: 312, label: "Рим" }
  }
];

const eraFilter = document.getElementById("eraFilter");
const searchInput = document.getElementById("searchInput");
const timeline = document.getElementById("timeline");
const mapPoints = document.getElementById("mapPoints");

const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventPlace = document.getElementById("eventPlace");
const eventDescription = document.getElementById("eventDescription");
const eventEra = document.getElementById("eventEra");

let activeId = null;

function uniqueEras(data) {
  return [...new Set(data.map((item) => item.era))];
}

function populateEraFilter() {
  uniqueEras(events).forEach((era) => {
    const option = document.createElement("option");
    option.value = era;
    option.textContent = era;
    eraFilter.append(option);
  });
}

function getFilteredEvents() {
  const era = eraFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return events.filter((item) => {
    const eraOk = era === "all" || item.era === era;
    const queryOk = !query || `${item.title} ${item.date} ${item.place} ${item.description}`.toLowerCase().includes(query);
    return eraOk && queryOk;
  });
}

function setActive(eventItem) {
  activeId = eventItem.id;
  eventTitle.textContent = eventItem.title;
  eventDate.textContent = eventItem.date;
  eventPlace.textContent = eventItem.place;
  eventDescription.textContent = eventItem.description;
  eventEra.textContent = eventItem.era;

  document.querySelectorAll(".event-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === eventItem.id);
  });

  document.querySelectorAll(".map-point").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === eventItem.id);
  });
}

function renderTimeline(list) {
  timeline.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.textContent = "По заданному фильтру события не найдены.";
    empty.className = "event-meta";
    timeline.append(empty);
    return;
  }

  list.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "event-item";
    btn.dataset.id = item.id;
    btn.type = "button";
    btn.style.animationDelay = `${index * 35}ms`;
    btn.innerHTML = `<p class="event-title">${item.title}</p><p class="event-meta">${item.date} · ${item.place}</p>`;
    btn.addEventListener("click", () => setActive(item));
    timeline.append(btn);
  });

  const nextActive = list.find((item) => item.id === activeId) || list[0];
  setActive(nextActive);
}

function renderMapPoints(list) {
  mapPoints.innerHTML = "";

  list.forEach((item) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "map-point");
    g.dataset.id = item.id;
    g.setAttribute("tabindex", "0");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", item.map.x);
    circle.setAttribute("cy", item.map.y);
    circle.setAttribute("r", 8);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", item.map.x + 12);
    label.setAttribute("y", item.map.y + 4);
    label.textContent = item.map.label;

    g.append(circle, label);
    g.addEventListener("click", () => setActive(item));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(item);
      }
    });

    mapPoints.append(g);
  });
}

function refresh() {
  const filtered = getFilteredEvents();
  renderTimeline(filtered);
  renderMapPoints(filtered);
}

eraFilter.addEventListener("change", refresh);
searchInput.addEventListener("input", refresh);

populateEraFilter();
refresh();
