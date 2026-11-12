// FoodCompare demo data. Replace this with API data when backend integrations are available.
const foodItems = [
  {
    id: 1, name: "Farmhouse Pizza", restaurant: "Oven Story Pizza", category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80",
    rating: "4.5", badge: "Popular choice",
    platforms: [
      { name: "Swiggy", key: "swiggy", food: 279, delivery: 25, fee: 8, discount: 50, coupon: "FLAT50", url: "https://www.swiggy.com/" },
      { name: "Zomato", key: "zomato", food: 259, delivery: 30, fee: 10, discount: 35, coupon: "SAVE35", url: "https://www.zomato.com/" },
      { name: "Magicpin", key: "magicpin", food: 269, delivery: 20, fee: 8, discount: 30, coupon: "MAGIC30", url: "https://magicpin.in/" }
    ]
  },
  {
    id: 2, name: "Classic Veg Burger", restaurant: "Burger Farm", category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    rating: "4.3", badge: "Great value",
    platforms: [
      { name: "Swiggy", key: "swiggy", food: 169, delivery: 25, fee: 8, discount: 25, coupon: "TASTY25", url: "https://www.swiggy.com/" },
      { name: "Zomato", key: "zomato", food: 159, delivery: 20, fee: 10, discount: 35, coupon: "ZOM35", url: "https://www.zomato.com/" },
      { name: "Magicpin", key: "magicpin", food: 179, delivery: 15, fee: 8, discount: 20, coupon: "MAGIC20", url: "https://magicpin.in/" }
    ]
  },
  {
    id: 3, name: "Veg Dum Biryani", restaurant: "Biryani By Kilo", category: "Biryani",
    //image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
    rating: "4.6", badge: "Top rated",
    platforms: [
      { name: "Swiggy", key: "swiggy", food: 229, delivery: 20, fee: 8, discount: 30, coupon: "BIRYANI30", url: "https://www.swiggy.com/" },
      { name: "Zomato", key: "zomato", food: 219, delivery: 25, fee: 10, discount: 20, coupon: "RICE20", url: "https://www.zomato.com/" },
      { name: "Magicpin", key: "magicpin", food: 239, delivery: 15, fee: 8, discount: 45, coupon: "MAGIC45", url: "https://magicpin.in/" }
    ]
  },
  {
    id: 4, name: "Masala Dosa", restaurant: "South Junction", category: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
    rating: "4.4", badge: "Local favourite",
    platforms: [
      { name: "Swiggy", key: "swiggy", food: 119, delivery: 20, fee: 8, discount: 15, coupon: "DOSA15", url: "https://www.swiggy.com/" },
      { name: "Zomato", key: "zomato", food: 109, delivery: 25, fee: 10, discount: 10, coupon: "SOUTH10", url: "https://www.zomato.com/" },
      { name: "Magicpin", key: "magicpin", food: 125, delivery: 15, fee: 8, discount: 25, coupon: "MAGIC25", url: "https://magicpin.in/" }
    ]
  }
];

const foodGrid = document.getElementById("foodGrid");
const foodSearch = document.getElementById("foodSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const resultCount = document.getElementById("resultCount");
const resultsTitle = document.getElementById("resultsTitle");
const emptyState = document.getElementById("emptyState");
const activePlan = document.getElementById("activePlan");
const freeNotice = document.getElementById("freeNotice");
const plusNotice = document.getElementById("plusNotice");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");


// Calculate the illustrative payable amount for one delivery platform.
function calculateTotal(platform) {
  return platform.food + platform.delivery + platform.fee - platform.discount;
}

function getBestPlatform(item) {
  return [...item.platforms].sort((a, b) => calculateTotal(a) - calculateTotal(b))[0];
}

function renderFoodCards(items) {
  const isPlus = activePlan.value === "plus";
  foodGrid.innerHTML = "";
  resultCount.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
  emptyState.hidden = items.length > 0;
  foodGrid.hidden = items.length === 0;
  freeNotice.hidden = isPlus;
  plusNotice.hidden = !isPlus;
  historyPanel.hidden = !isPlus;
  if (isPlus) renderHistory();

  items.forEach((item) => {
    const best = [...item.platforms].sort((a, b) => {
      const aValue = isPlus ? calculateTotal(a) : a.food - a.discount;
      const bValue = isPlus ? calculateTotal(b) : b.food - b.discount;
      return aValue - bValue;
    })[0];

    const platformRows = item.platforms.map((platform) => {
      const discountedFood = platform.food - platform.discount;
      const shownPrice = isPlus ? calculateTotal(platform) : discountedFood;
      const detail = isPlus
        ? `<small>Food ₹${platform.food} · Coupon −₹${platform.discount}</small>
           <small class="fee-detail">Delivery ₹${platform.delivery} · Platform fee ₹${platform.fee}</small>`
        : `<small>Food ₹${platform.food} · Coupon ${platform.coupon} (−₹${platform.discount})</small>`;
      return `
        <div class="platform-price ${isPlus ? "full-breakdown" : "free-breakdown"}">
          <span class="platform-name">
            <span class="mini-logo logo-${platform.key}">${platform.name[0]}</span>
            ${platform.name}
          </span>
          <span class="price-details">
            <strong>₹${shownPrice}</strong>
            ${detail}
            ${isPlus ? '<small class="price-caption">Final payable estimate</small>' : '<small class="price-caption">Food price after coupon</small>'}
          </span>
        </div>`;
    }).join("");

    const bestPrice = isPlus ? calculateTotal(best) : best.food - best.discount;
    const card = document.createElement("article");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="food-badge">${item.badge}</span>
      </div>
      <div class="food-info">
        <div class="food-meta">
          <span class="food-category">${item.category}</span>
          <span class="food-rating"><i class="bi bi-star-fill"></i> ${item.rating}</span>
        </div>
        <h4>${item.name}</h4>
        <div class="restaurant-name">${item.restaurant}</div>
        <div class="platform-prices">${platformRows}</div>
        <div class="food-card-bottom">
          <span class="best-total">${isPlus ? "Best final bill" : "Best food price"} <strong>₹${bestPrice}</strong></span>
          <button type="button" data-item-id="${item.id}">View ${isPlus ? "full deal" : "coupon"} <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>`;
    foodGrid.appendChild(card);
  });
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem("foodcomparePlusHistory") || "[]");
  } catch {
    return [];
  }
}

function saveHistory(item, platform) {
  const history = readHistory();
  history.unshift({
    name: item.name,
    restaurant: item.restaurant,
    platform: platform.name,
    total: calculateTotal(platform),
    savedAt: new Date().toLocaleString()
  });
  localStorage.setItem("foodcomparePlusHistory", JSON.stringify(history.slice(0, 8)));
  renderHistory();
}

function renderHistory() {
  const history = readHistory();
  historyList.innerHTML = history.length
    ? history.map((entry) => `
      <div class="history-item">
        <div><strong>${entry.name}</strong><small>${entry.restaurant} · ${entry.platform} · ${entry.savedAt}</small></div>
        <b>₹${entry.total}</b>
      </div>`).join("")
    : '<p class="history-empty">Your comparison history will appear here when you view a Plus deal.</p>';
}

function getFilteredItems() {
  const searchText = foodSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;

  let filtered = foodItems.filter((item) => {
    const matchesText = `${item.name} ${item.restaurant} ${item.category}`.toLowerCase().includes(searchText);
    const matchesCategory = category === "all" || item.category === category;
    return matchesText && matchesCategory;
  });

  if (sortSelect.value === "low") {
    filtered.sort((a, b) => {
      const priceA = activePlan.value === "plus" ? calculateTotal(getBestPlatform(a)) : getBestPlatform(a).food - getBestPlatform(a).discount;
      const priceB = activePlan.value === "plus" ? calculateTotal(getBestPlatform(b)) : getBestPlatform(b).food - getBestPlatform(b).discount;
      return priceA - priceB;
    });
  } else if (sortSelect.value === "saving") {
    filtered.sort((a, b) => {
      const savingA = Math.max(...a.platforms.map(calculateTotal)) - calculateTotal(getBestPlatform(a));
      const savingB = Math.max(...b.platforms.map(calculateTotal)) - calculateTotal(getBestPlatform(b));
      return savingB - savingA;
    });
  }
  return filtered;
}

function updateResults() {
  const filtered = getFilteredItems();
  resultsTitle.firstChild.textContent = foodSearch.value.trim()
    ? `Results for "${foodSearch.value.trim()}" `
    : "Popular food deals ";
  renderFoodCards(filtered);
}

activePlan.addEventListener("change", () => {
  sortSelect.value = "recommended";
  updateResults();
});
document.getElementById("clearHistory").addEventListener("click", () => {
  localStorage.removeItem("foodcomparePlusHistory");
  renderHistory();
});

document.getElementById("searchButton").addEventListener("click", updateResults);
foodSearch.addEventListener("input", updateResults);
categoryFilter.addEventListener("change", updateResults);
sortSelect.addEventListener("change", updateResults);
updateResults();

document.querySelectorAll(".quick-search button").forEach((button) => {
  button.addEventListener("click", () => {
    foodSearch.value = button.dataset.search;
    updateResults();
    document.getElementById("compare").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("clearSearch").addEventListener("click", () => {
  foodSearch.value = "";
  categoryFilter.value = "all";
  sortSelect.value = "recommended";
  updateResults();
});

// Show only food and coupon details on Free; show every fee on Plus.
foodGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-item-id]");
  if (!button) return;

  const item = foodItems.find((food) => food.id === Number(button.dataset.itemId));
  if (!item) return;

  const isPlus = activePlan.value === "plus";
  const best = [...item.platforms].sort((a, b) => {
    const aValue = isPlus ? calculateTotal(a) : a.food - a.discount;
    const bValue = isPlus ? calculateTotal(b) : b.food - b.discount;
    return aValue - bValue;
  })[0];

  if (isPlus) {
    const breakdown = item.platforms.map((platform) =>
      `${platform.name}: Food ₹${platform.food} + Delivery ₹${platform.delivery} + Platform fee ₹${platform.fee} - ${platform.coupon} (₹${platform.discount}) = ₹${calculateTotal(platform)}`
    ).join("\n");
    saveHistory(item, best);
    const choice = confirm(
      `${item.name} — ${item.restaurant}\n\nFULL BILL COMPARISON\n${breakdown}\n\nBest final bill: ${best.name} at ₹${calculateTotal(best)}.\n\nPress OK to open ${best.name}.`
    );
    if (choice) window.open(best.url, "_blank", "noopener,noreferrer");
  } else {
    const couponDetails = item.platforms.map((platform) =>
      `${platform.name}: Food ₹${platform.food} - ${platform.coupon} (₹${platform.discount}) = ₹${platform.food - platform.discount}`
    ).join("\n");
    const choice = confirm(
      `${item.name} — ${item.restaurant}\n\nFREE PLAN: FOOD + COUPON ONLY\n${couponDetails}\n\nDelivery and platform fees are not included in Free.\nUpgrade to Plus to compare the full final bill.\n\nPress OK to open ${best.name}.`
    );
    if (choice) window.open(best.url, "_blank", "noopener,noreferrer");
  }
});

// Location modal: browser location permission or manual city/pincode.
const locationModal = document.getElementById("locationModal");
const locationLabel = document.getElementById("locationLabel");
const locationHelp = document.getElementById("locationHelp");
const manualLocation = document.getElementById("manualLocation");

function openLocationModal() {
  locationModal.hidden = false;
  manualLocation.focus();
}
function closeLocationModal() {
  locationModal.hidden = true;
}

document.getElementById("locationTrigger").addEventListener("click", openLocationModal);
document.getElementById("locationTrigger").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") openLocationModal();
});
document.getElementById("heroLocationBtn").addEventListener("click", openLocationModal);
document.getElementById("closeLocation").addEventListener("click", closeLocationModal);
locationModal.addEventListener("click", (event) => {
  if (event.target === locationModal) closeLocationModal();
});

function setLocation(label) {
  locationLabel.textContent = label;
  locationHelp.textContent = `Location set to ${label}. Demo results are shown for preview.`;
  closeLocationModal();
}

document.getElementById("saveLocation").addEventListener("click", () => {
  const value = manualLocation.value.trim();
  if (value.length < 3) {
    locationHelp.textContent = "Please enter a valid city, area or pincode.";
    return;
  }
  setLocation(value);
});

manualLocation.addEventListener("keydown", (event) => {
  if (event.key === "Enter") document.getElementById("saveLocation").click();
});

document.getElementById("detectLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationHelp.textContent = "Location detection is not supported. Please enter your area manually.";
    return;
  }

  locationHelp.textContent = "Requesting location permission...";
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      locationHelp.textContent = "Location detected. Looking up your area...";

      // Reverse geocoding is optional and uses a public demo endpoint.
      // For production, use a provider with an API key and suitable terms.
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        if (!response.ok) throw new Error("Could not look up address");
        const data = await response.json();
        const address = data.address || {};
        const area = address.suburb || address.neighbourhood || address.city_district || address.town || address.city || address.village;
        const city = address.city || address.town || address.state_district || address.state;
        const label = [area, city].filter(Boolean).join(", ") || "Current location";
        setLocation(label);
      } catch (error) {
        setLocation(`Current location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
      }
    },
    (error) => {
      const messages = {
        1: "Location permission was denied. You can enter your area manually.",
        2: "Your location could not be determined. Please enter it manually.",
        3: "Location request timed out. Please try again or enter it manually."
      };
      locationHelp.textContent = messages[error.code] || "Could not detect location. Please enter it manually.";
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
});

// Mobile navigation
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");
mobileMenu.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  mobileMenu.setAttribute("aria-expanded", String(open));
  mobileMenu.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    mobileMenu.setAttribute("aria-expanded", "false");
    mobileMenu.innerHTML = '<i class="bi bi-list"></i>';
  });
});

// Reveal elements on scroll.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();
renderFoodCards(foodItems);


// Pricing buttons preselect the plan in the contact form.
const contactPlan = document.getElementById("contactPlan");
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    contactPlan.value = button.dataset.plan === "plus" ? "FoodCompare Plus" : "Free";
  });
});

// Contact form validation and success feedback (front-end only).
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName");
  const email = document.getElementById("contactEmail");
  const plan = document.getElementById("contactPlan");
  const fields = [name, email, plan];

  fields.forEach((field) => field.classList.remove("invalid"));
  let valid = true;

  if (name.value.trim().length < 2) {
    name.classList.add("invalid");
    valid = false;
  }
  if (email.value.trim() === "" || !email.checkValidity()) {
    email.classList.add("invalid");
    valid = false;
  }
  if (!plan.value) {
    plan.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    contactMessage.textContent = "Please enter a valid name, email and select a plan.";
    contactMessage.className = "contact-message error";
    return;
  }

  contactMessage.textContent = `Thank you, ${name.value.trim()}! Your ${plan.value} request has been recorded in this demo.`;
  contactMessage.className = "contact-message success";
  contactForm.reset();
});
