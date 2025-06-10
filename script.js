const filters = document.querySelectorAll(".filter");
const extensionslist = document.getElementById("extensions-list");
const changeIcon = document.querySelector(".icon-sun");
const body = document.body;
const header = document.getElementById("header");
const logoText = header.querySelector(".logo-text");
const iconsun = header.querySelector(".icon-sun");
const title = document.getElementById("title");
let extensionsData = [];
let currentFilter = "all";

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    extensionsData = data;
    loadExtensions();
    changeTheme();
  })
  .catch((error) => {
    console.error("خطا در بارگذاری فایل:", error);
  });

function loadExtensions() {
  // changeTheme();
  extensionslist.innerHTML = "";
  const filteredExtensions = filteredExtension(currentFilter);

  filteredExtensions.forEach((extension, idx) => {
    const extensionEl = createExtensionElement(extension);
    extensionslist.appendChild(extensionEl);

    const logo = changeIcon.querySelector(".logo");
    extensionEl.classList.toggle("light", logo.classList.contains("light"));
    extensionEl
      .querySelector(".remove")
      .classList.toggle("light", logo.classList.contains("light"));
    setTimeout(() => {
      extensionEl.classList.add("show");
    }, idx * 100); // Staggered animation
  });
}
function createExtensionElement(extension) {
  const li = document.createElement("li");
  li.classList.add("extension");

  li.innerHTML = `
    <div class="extension-info">
            <img src=${extension.logo} alt="" />
            <div class="text-info">
              <h2>${extension.name}</h2>
              <p>
                ${extension.description}
              </p>
            </div>
          </div>

          <div class="extension-actions">
            <button class="remove">Remove</button>
            <label class="switch" >
              <input type="checkbox" ${
                extension.isActive ? "checked" : ` `
              } class="active-checkbox" />
              <span class="slider"></span>
            </label>
          </div>
    `;

  const checkbox = li.querySelector(".active-checkbox");
  checkbox.addEventListener("change", function () {
    extension.isActive = this.checked;
  });
  const removeBtn = li.querySelector(".remove");
  removeBtn.addEventListener("click", function () {
    console.log("flag");
    extensionsData = extensionsData.filter((ex) => ex.name != extension.name);
    loadExtensions();
  });

  return li;
}
function filteredExtension(filter) {
  switch (filter) {
    case "active":
      return extensionsData.filter((extension) => extension.isActive);
    case "inactive":
      return extensionsData.filter((extension) => !extension.isActive);
    default:
      return extensionsData;
  }
}
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setActiveFilter(filter.getAttribute("data-filter"));
  });
});

function setActiveFilter(filter) {
  currentFilter = filter;
  filters.forEach((item) => {
    if (item.getAttribute("data-filter") === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  loadExtensions();
}

function changeTheme() {
  changeIcon.addEventListener("click", function () {
    const icon = changeIcon.querySelector(".logo");
    if (icon.classList.contains("light")) {
      icon.classList.remove("light");
      body.style.background = "var(--Dark-Gradient)";
      icon.src = "/assets/images/icon-sun.svg";
      header.classList.remove("light");
      logoText.classList.remove("light");
      iconsun.classList.remove("light");
      title.classList.remove("light");
      filters.forEach((filter) => {
        filter.classList.remove("light");
      });
      const extensionsItems = Array.from(extensionslist.children);
      extensionsItems.forEach((item) => {
        item.classList.remove("light");
        item.querySelector(".remove").classList.remove("light");
      });
    } else {
      icon.classList.add("light");
      body.style.background = "var(--Light-Gradient)";
      icon.src = "/assets/images/icon-moon.svg";
      header.classList.add("light");
      logoText.classList.add("light");
      iconsun.classList.add("light");
      title.classList.add("light");
      filters.forEach((filter) => {
        filter.classList.add("light");
      });
      const extensionsItems = Array.from(extensionslist.children);
      extensionsItems.forEach((item) => {
        item.classList.add("light");
        item.querySelector(".remove").classList.add("light");
      });
    }
  });
}
