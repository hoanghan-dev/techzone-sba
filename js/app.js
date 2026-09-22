/**
 * TechZone Modern E-Commerce - Global Application Logic
 * Shared across all customer and admin pages.
 */

// Format currency to Vietnamese Dong
function formatVND(amount) {
  if (isNaN(amount) || amount === null) return "0₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(amount).replace("₫", "") + "₫";
}

// Format readable date
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Toast Notification Engine
function showToast(message, type = "success", duration = 3500) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container-custom";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `custom-toast toast-${type}`;
  
  let icon = "bi-check-circle-fill text-success";
  if (type === "danger" || type === "error") icon = "bi-x-circle-fill text-danger";
  if (type === "warning") icon = "bi-exclamation-triangle-fill text-warning";
  if (type === "info") icon = "bi-info-circle-fill text-primary";

  toast.innerHTML = `
    <i class="bi ${icon} fs-5"></i>
    <div class="flex-grow-1 fs-6">${message}</div>
    <button type="button" class="btn-close btn-close-sm" aria-label="Close"></button>
  `;

  const closeBtn = toast.querySelector(".btn-close");
  closeBtn.addEventListener("click", () => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
}

// Update Cart Badge across headers
function updateCartBadge() {
  const badgeElements = document.querySelectorAll(".cart-counter");
  if (!badgeElements.length) return;

  const cart = JSON.parse(localStorage.getItem("techzone_cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  badgeElements.forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline-block" : "none";
  });
}

// User Session Management
function getCurrentUser() {
  const user = localStorage.getItem("techzone_user");
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      return CURRENT_USER;
    }
  }
  // Default to mock logged in user for seamless demonstration
  localStorage.setItem("techzone_user", JSON.stringify(CURRENT_USER));
  return CURRENT_USER;
}

function setCurrentUser(user) {
  localStorage.setItem("techzone_user", JSON.stringify(user));
  updateUserUI();
}

function logoutUser() {
  localStorage.removeItem("techzone_user");
  showToast("Đã đăng xuất thành công", "info");
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

function updateUserUI() {
  const user = getCurrentUser();
  const authDropdown = document.getElementById("user-auth-menu");
  if (!authDropdown) return;

  if (user) {
    authDropdown.innerHTML = `
      <div class="dropdown">
        <a class="nav-action-btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-circle fs-5"></i>
          <span>${user.fullname || user.username}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
          <li><h6 class="dropdown-header">Tài khoản: ${user.username} (${user.role})</h6></li>
          ${user.role === 'Admin' ? '<li><a class="dropdown-item text-primary fw-bold" href="../admin/dashboard.html"><i class="bi bi-speedometer2 me-2"></i>Admin Dashboard</a></li><li><hr class="dropdown-divider"></li>' : ''}
          <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>Hồ sơ cá nhân</a></li>
          <li><a class="dropdown-item" href="orders.html"><i class="bi bi-bag-check me-2"></i>Đơn mua của tôi</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="logoutUser()"><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a></li>
        </ul>
      </div>
    `;
  } else {
    authDropdown.innerHTML = `
      <div class="d-flex gap-2">
        <a href="login.html" class="nav-action-btn">
          <i class="bi bi-box-arrow-in-right fs-5"></i>
          <span>Đăng nhập</span>
        </a>
        <a href="register.html" class="btn btn-outline-primary btn-sm px-3 rounded-pill fw-semibold">
          Đăng ký
        </a>
      </div>
    `;
  }
}

// Global Header Search Listener
function initHeaderSearch() {
  const searchForms = document.querySelectorAll(".header-search form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[name='txtSearch']");
      if (input && input.value.trim()) {
        const query = encodeURIComponent(input.value.trim());
        // Determine correct relative path depending on current page level
        const isPagesDir = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/admin/");
        const targetUrl = isPagesDir ? `products.html?search=${query}` : `pages/products.html?search=${query}`;
        window.location.href = targetUrl;
      }
    });
  });
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  updateUserUI();
  initHeaderSearch();
});
