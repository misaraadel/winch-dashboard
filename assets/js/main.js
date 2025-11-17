$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
      $(".scroll-top-button").fadeIn();
    } else {
      $(".scroll-top-button").fadeOut();
    }
  });

  $(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });

  $(".scroll-top-button").on('click', function () {
    $('html , body').animate({
      scrollTop: 0
    }, 100);
  });

  $('.hamburger').click(function(){
    $('.hamburger').toggleClass('active');
    $('.side-nav').toggleClass('active-nav');
    $('body').toggleClass('overflowNone')
  });

  $(".show-pass").on('click', function(event) {
    event.preventDefault();
    
    $(this).toggleClass("active");
  });
  
  $(".show_hide_password .show-pass").on('click', function(event) {
    event.preventDefault();
    if($(this).siblings("input").attr("type") == "text"){
      $(this).siblings("input").attr('type', 'password');
    }else if($(this).siblings("input").attr("type") == "password"){
      $(this).siblings("input").attr('type', 'text');
    }
  });

  // Tab buttons switch
  $('#home-tab').on('shown.bs.tab', function (e) {
    $('.add-job-btn').fadeOut(200, function() {
      $('.add-employee-btn').fadeIn(200);
    });
  });

  $('#profile-tab').on('shown.bs.tab', function (e) {
    $('.add-employee-btn').fadeOut(200, function() {
      $('.add-job-btn').fadeIn(200);
    });
  });

  // Job Role Powers - Select All & Cancel All
  $('#selectAllBtn').on('click', function(e) {
    e.preventDefault();
    $('.radio-check').prop('checked', true);
    
    // Add active class
    $(this).removeClass('gray-btn').addClass('dark-btn');
    $('#cancelAllBtn').removeClass('dark-btn').addClass('gray-btn');
  });

  $('#cancelAllBtn').on('click', function(e) {
    e.preventDefault();
    $('.radio-check').prop('checked', false);
    
    // Add active class
    $(this).removeClass('gray-btn').addClass('dark-btn');
    $('#selectAllBtn').removeClass('dark-btn').addClass('gray-btn');
  });

  // Header checkbox - select/deselect children
  $('.header-checkbox').on('change', function() {
    const targetId = $(this).data('target');
    const isChecked = $(this).is(':checked');
    
    $('#' + targetId).find('.radio-check').prop('checked', isChecked);
    
    // Update Select All / Cancel All button states
    updateSelectButtons();
  });

  // Child checkboxes - update header checkbox state
  $('.card-body .radio-check').on('change', function() {
    const cardBody = $(this).closest('.collapse');
    const cardBodyId = cardBody.attr('id');
    const headerCheckbox = $('.header-checkbox[data-target="' + cardBodyId + '"]');
    
    const totalCheckboxes = cardBody.find('.radio-check').length;
    const checkedCheckboxes = cardBody.find('.radio-check:checked').length;
    
    headerCheckbox.prop('checked', totalCheckboxes === checkedCheckboxes);
    
    // Update Select All / Cancel All button states
    updateSelectButtons();
  });

  // Function to update Select All / Cancel All button states
  function updateSelectButtons() {
    const totalCheckboxes = $('.radio-check').length;
    const checkedCheckboxes = $('.radio-check:checked').length;
    
    if (checkedCheckboxes === totalCheckboxes && totalCheckboxes > 0) {
      // All checked - Select All is active
      $('#selectAllBtn').removeClass('gray-btn').addClass('dark-btn');
      $('#cancelAllBtn').removeClass('dark-btn').addClass('gray-btn');
    } else if (checkedCheckboxes === 0) {
      // None checked - both gray
      $('#selectAllBtn').removeClass('dark-btn').addClass('gray-btn');
      $('#cancelAllBtn').removeClass('dark-btn').addClass('gray-btn');
    } else {
      // Some checked - Cancel All is active
      $('#selectAllBtn').removeClass('dark-btn').addClass('gray-btn');
      $('#cancelAllBtn').removeClass('gray-btn').addClass('dark-btn');
    }
  }

  // Prevent checkbox click from toggling accordion
  $('.wrapper').on('click', function(e) {
    e.stopPropagation();
  });

  // Image Upload Preview
  $('#imageUpload').on('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        $('#imagePreview').attr('src', e.target.result);
        $('#imagePreview').css('opacity', '1');
      };
      
      reader.readAsDataURL(file);
    }
  });

  function readURL(input, previewId, noneDataId) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $(previewId).css('background-image', 'url(' + e.target.result + ')');
        $(previewId).hide();
        $(previewId).fadeIn(650);
        $(noneDataId).hide();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  // ربط الأحداث مع المعرفات المختلفة
  $("#imageUpload").change(function() {
    readURL(this, '#imagePreview', '#noneData');
  });

  // Initialize Flatpickr for date inputs
  if (typeof flatpickr !== 'undefined') {
    flatpickr(".flatpickr-input", {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "F j, Y",
      allowInput: true,
      theme: "light"
    });
  }

  // Employee Table - Select All
  $('.table-header-checkbox').on('change', function() {
    const isChecked = $(this).is(':checked');
    $('.employee-checkbox').prop('checked', isChecked);
    toggleBulkButtons();
  });

  // Employee Table - Individual checkbox
  $('.employee-checkbox').on('change', function() {
    const totalCheckboxes = $('.employee-checkbox').length;
    const checkedCheckboxes = $('.employee-checkbox:checked').length;
    
    $('.table-header-checkbox').prop('checked', totalCheckboxes === checkedCheckboxes);
    toggleBulkButtons();
  });

  // Function to show/hide bulk action buttons
  function toggleBulkButtons() {
    const checkedCheckboxes = $('.employee-checkbox:checked').length;
    
    if (checkedCheckboxes > 0) {
      $('.flex-data-button').fadeIn(300);
    } else {
      $('.flex-data-button').fadeOut(300);
    }
  }

  // Job Roles Table - Select All
  $('.job-header-checkbox').on('change', function() {
    const isChecked = $(this).is(':checked');
    $('.job-role-checkbox').prop('checked', isChecked);
    toggleJobRoleButtons();
  });

  // Job Roles Table - Individual checkbox
  $('.job-role-checkbox').on('change', function() {
    const totalCheckboxes = $('.job-role-checkbox').length;
    const checkedCheckboxes = $('.job-role-checkbox:checked').length;
    
    $('.job-header-checkbox').prop('checked', totalCheckboxes === checkedCheckboxes);
    toggleJobRoleButtons();
  });

  // Function to show/hide job role bulk action buttons
  function toggleJobRoleButtons() {
    const checkedCheckboxes = $('.job-role-checkbox:checked').length;
    
    if (checkedCheckboxes > 0) {
      $('#profile .flex-data-button').fadeIn(300);
    } else {
      $('#profile .flex-data-button').fadeOut(300);
    }
  }

  var swiper = new Swiper(".swiper-header", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  var swiper = new Swiper(".swiper-brands", {
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
      slidesPerView: 2,
      spaceBetween: 18,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 18,
      },
    },
  });

  var swiper = new Swiper(".swiper-team", {
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
      slidesPerView: 3,
      spaceBetween: 18,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 18,
      },
    },
  });

  var swiper = new Swiper(".swiper-review", {
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
    },
  });
  
  var swiper = new Swiper(".swiper-products", {
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 18,
      },
    },
  });

  $("[data-fancybox]").fancybox({
    selector: '[data-fancybox="images"]',
    loop: true
  });

});

// Custom number input controls
function incrementValue() {
  var input = document.getElementById('DaysNo');
  var currentValue = parseInt(input.value) || 0;
  input.value = currentValue + 1;
}

function decrementValue() {
  var input = document.getElementById('DaysNo');
  var currentValue = parseInt(input.value) || 0;
  var minValue = parseInt(input.getAttribute('min')) || 0;
  if (currentValue > minValue) {
    input.value = currentValue - 1;
  }
}

// Growth Chart with Filters
if (document.getElementById('growthChart')) {
  const ctx = document.getElementById('growthChart').getContext('2d');
  
  // Data for different methods and time periods
  const chartData = {
    stripe: {
      '3M': {
        labels: ['Oct', 'Nov', 'Dec'],
        data: [60, 75, 100]
      },
      '6M': {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [40, 50, 60, 65, 75, 100]
      },
      '9M': {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [40, 35, 30, 40, 50, 60, 65, 75, 100]
      },
      'Year': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [50, 70, 15, 40, 35, 30, 40, 50, 60, 65, 75, 100]
      }
    },
    paypal: {
      '3M': {
        labels: ['Oct', 'Nov', 'Dec'],
        data: [45, 60, 85]
      },
      '6M': {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [30, 40, 50, 45, 60, 85]
      },
      '9M': {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [35, 30, 25, 30, 40, 50, 45, 60, 85]
      },
      'Year': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [40, 60, 20, 35, 30, 25, 30, 40, 50, 45, 60, 85]
      }
    },
    visa: {
      '3M': {
        labels: ['Oct', 'Nov', 'Dec'],
        data: [55, 70, 95]
      },
      '6M': {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [45, 55, 65, 55, 70, 95]
      },
      '9M': {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [50, 45, 40, 45, 55, 65, 55, 70, 95]
      },
      'Year': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [55, 75, 25, 50, 45, 40, 45, 55, 65, 55, 70, 95]
      }
    }
  };

  let currentMethod = 'stripe';
  let currentPeriod = 'Year';

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(52, 199, 89, 0.3)');
  gradient.addColorStop(1, 'rgba(52, 199, 89, 0)');

  const growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData[currentMethod][currentPeriod].labels,
      datasets: [{
        label: 'Growth',
        data: chartData[currentMethod][currentPeriod].data,
        borderColor: '#34c759',
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#34c759',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#141414',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#808080',
            font: {
              size: 12
            }
          },
          grid: {
            color: '#f0f0f0',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#808080',
            font: {
              size: 12
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });

  // Function to update chart
  function updateChart(method, period) {
    currentMethod = method;
    currentPeriod = period;
    
    growthChart.data.labels = chartData[method][period].labels;
    growthChart.data.datasets[0].data = chartData[method][period].data;
    growthChart.update();
  }

  // Method select filter
  $('.method-select').on('change', function() {
    const method = $(this).val();
    updateChart(method, currentPeriod);
  });

  // Time filter buttons
  $('.time-btn').on('click', function() {
    $('.time-btn').removeClass('active');
    $(this).addClass('active');
    
    const period = $(this).text().trim();
    updateChart(currentMethod, period);
  });
}



const countries = [
  { name: "السعودية", code: "+966", flag: "https://flagcdn.com/sa.svg" },
  { name: "مصر", code: "+20", flag: "https://flagcdn.com/eg.svg" },
  { name: "فلسطين", code: "+970", flag: "https://flagcdn.com/ps.svg" },
  { name: "الأردن", code: "+962", flag: "https://flagcdn.com/jo.svg" },
  { name: "الكويت", code: "+965", flag: "https://flagcdn.com/kw.svg" },
  { name: "الإمارات", code: "+971", flag: "https://flagcdn.com/ae.svg" },
  { name: "قطر", code: "+974", flag: "https://flagcdn.com/qa.svg" },
  { name: "البحرين", code: "+973", flag: "https://flagcdn.com/bh.svg" },
  { name: "عمان", code: "+968", flag: "https://flagcdn.com/om.svg" },
  { name: "اليمن", code: "+967", flag: "https://flagcdn.com/ye.svg" },
  { name: "المغرب", code: "+212", flag: "https://flagcdn.com/ma.svg" },
  { name: "تونس", code: "+216", flag: "https://flagcdn.com/tn.svg" },
  { name: "الجزائر", code: "+213", flag: "https://flagcdn.com/dz.svg" },
  { name: "السودان", code: "+249", flag: "https://flagcdn.com/sd.svg" },
  { name: "العراق", code: "+964", flag: "https://flagcdn.com/iq.svg" },
  { name: "لبنان", code: "+961", flag: "https://flagcdn.com/lb.svg" },
  { name: "سوريا", code: "+963", flag: "https://flagcdn.com/sy.svg" },
  { name: "تركيا", code: "+90", flag: "https://flagcdn.com/tr.svg" },
];

const selectedBtn = document.getElementById("selected-country");
const countryDropdown = document.getElementById("country-dropdown");
const countryList = document.getElementById("country-list");
const dialCode = document.getElementById("dial-code");
const searchInput = document.getElementById("country-search");

if (selectedBtn && countryDropdown && countryList) {
  // فتح/غلق القائمة
  selectedBtn.addEventListener("click", () => {
    countryDropdown.classList.toggle("hidden");
    searchInput.value = "";
    renderCountries(countries);
  });

  // عرض الدول
  function renderCountries(list) {
    countryList.innerHTML = "";
    list.forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${c.flag}" alt=""> ${c.name} <span>${c.code}</span>`;
      li.addEventListener("click", () => {
        selectedBtn.querySelector("img").src = c.flag;
        dialCode.textContent = c.code;
        countryDropdown.classList.add("hidden");
      });
      countryList.appendChild(li);
    });
  }

  renderCountries(countries);

  // البحث
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim();
    const filtered = countries.filter(
      (c) => c.name.includes(val) || c.code.includes(val)
    );
    renderCountries(filtered);
  });

  // غلق القائمة لما تضغط بره
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".country-select")) {
      countryDropdown.classList.add("hidden");
    }
  });
}
