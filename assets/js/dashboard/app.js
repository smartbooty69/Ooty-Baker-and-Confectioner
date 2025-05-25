document.querySelectorAll('.sidebar-submenu').forEach(e => {
    e.querySelector('.sidebar-menu-dropdown').onclick = (event) => {
        event.preventDefault()
        e.querySelector('.sidebar-menu-dropdown .dropdown-icon').classList.toggle('active')

        let dropdown_content = e.querySelector('.sidebar-menu-dropdown-content')
        let dropdown_content_lis = dropdown_content.querySelectorAll('li')

        let active_height = dropdown_content_lis[0].clientHeight * dropdown_content_lis.length

        dropdown_content.classList.toggle('active')

        dropdown_content.style.height = dropdown_content.classList.contains('active') ? active_height + 'px' : '0'
    }
})



// Get all the <a> elements within the sidebar-menu
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

// Loop through each <a> element and attach an event listener
// JavaScript (script.js)

// Function to handle sidebar menu item click
function handleSidebarItemClick(event) {
  // Prevent default link behavior
  event.preventDefault();

  // Get the text content of the clicked menu item
  const menuItemText = this.querySelector('span').textContent;

  // Set the main title to the text content of the clicked menu item
  document.querySelector('.main-title').textContent = menuItemText;

  // Get the corresponding section ID from the href attribute
  const sectionId = this.getAttribute('href').substr(1);
  
  // Remove the .hidden class from the corresponding section and hide other sections
  const allSections = document.querySelectorAll('section');
  allSections.forEach(sec => {
      if (sec.id === sectionId) {
          sec.classList.remove('hidden');
      } else {
          sec.classList.add('hidden');
      }
  });

  // Remove the .active class from all sidebar menu items
  const sidebarItems = document.querySelectorAll('.sidebar-menu a');
  sidebarItems.forEach(item => {
      item.classList.remove('active');
  });

  // Add the .active class to the clicked sidebar menu item
  this.classList.add('active');
}

// Get all sidebar menu items
const sidebarItems = document.querySelectorAll('.sidebar-menu a');

// Attach click event listeners to each sidebar menu item
sidebarItems.forEach(item => {
  item.addEventListener('click', handleSidebarItemClick);
});






// DARK MODE TOGGLE
let darkmode_toggle = document.querySelector('#darkmode-toggle')

darkmode_toggle.onclick = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.toggle('dark')
    darkmode_toggle.querySelector('.darkmode-switch').classList.toggle('active')
    setDarkChart(document.querySelector('body').classList.contains('dark'))
}

let overlay = document.querySelector('.overlay')
let sidebar = document.querySelector('.sidebar')

document.querySelector('#mobile-toggle').onclick = () => {
    sidebar.classList.toggle('active')
    overlay.classList.toggle('active')
}

document.querySelector('#sidebar-close').onclick = () => {
    sidebar.classList.toggle('active')
    overlay.classList.toggle('active')
}

// Get the logout button element
const logoutButton = document.getElementById('logout');

// Add event listener to the logout button
logoutButton.addEventListener('click', function(event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Perform logout actions here (e.g., clearing session storage, revoking tokens)

    // Redirect the user to index.html
    window.location.href = "../index.html";
});





// Get the first modal
var addbusinessinquiriesModal = document.getElementById("add-business-inquiries");

// Get the button that opens the first modal
var addbusinessinquiriesBtn = document.getElementById("myBtn");

// Get the <span> element that closes the first modal
var addbusinessinquiriesCloseSpan = addbusinessinquiriesModal.getElementsByClassName("close")[0];

// When the user clicks on the button, open the first modall
addbusinessinquiriesBtn.onclick = function() {
  addbusinessinquiriesModal.style.display = "block";
}

// When the user clicks on <span> (x) in the first modal, close it
addbusinessinquiriesCloseSpan.onclick = function() {
  addbusinessinquiriesModal.style.display = "none";
}

// When the user clicks anywhere outside of the first modal, close it
window.onclick = function(event) {
  if (event.target == addbusinessinquiriesModal) {
    addbusinessinquiriesModal.style.display = "none";
  }
}





// Get the second modal
var fullbusinessinquiriesDetailModal = document.getElementById("full-business-inquiries-detail");

// Get the button that opens the second modal
var showDataBtn = document.getElementById("show-data-button");

// Get the <span> element that closes the second modal
var fullbusinessinquiriesDetailCloseSpan = fullbusinessinquiriesDetailModal.getElementsByClassName("close")[0];

// When the user clicks on the button, open the second modal
showDataBtn.onclick = function() {
  fullbusinessinquiriesDetailModal.style.display = "block";
}

// When the user clicks on <span> (x) in the second modal, close it
fullbusinessinquiriesDetailCloseSpan.onclick = function() {
  fullbusinessinquiriesDetailModal.style.display = "none";
}

// When the user clicks anywhere outside of the second modal, close it
window.onclick = function(event) {
  if (event.target == fullbusinessinquiriesDetailModal) {
    fullbusinessinquiriesDetailModal.style.display = "none";
  }
}


// Get the renew modal
var renewproductDetailModal = document.getElementById("renew-product");

// Get the button that opens the second modal
var renewBtn = document.getElementById("renew-product-button");

// Get the <span> element that closes the second modal
var renewproductDetailCloseSpan = renewproductDetailModal.getElementsByClassName("close")[0];

// When the user clicks on the button, open the second modal
renewBtn.onclick = function() {
  renewproductDetailModal.style.display = "block";
}

// When the user clicks on <span> (x) in the second modal, close it
renewproductDetailCloseSpan.onclick = function() {
  renewproductDetailModal.style.display = "none";
}

// When the user clicks anywhere outside of the second modal, close it
window.onclick = function(event) {
  if (event.target == renewproductDetailModal) {
    renewproductDetailModal.style.display = "none";
  }
}


// Function to submit the add business-inquiries form
function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the form data
    const formData = new FormData(event.target);
  
    // You can access form data using the FormData API like formData.get('fieldName')
    const businessinquiriesName = formData.get('businessinquiriesName');
    const joinDate = formData.get('joinDate');
    const businessinquiriesproduct = formData.get('businessinquiriesproduct');
    const businessinquiriesPhone = formData.get('businessinquiriesPhone');
    const businessinquiriesEmail = formData.get('businessinquiriesEmail');
    const businessinquiriesAge = formData.get('businessinquiriesAge');
    const businessinquiriesAddress = formData.get('businessinquiriesAddress');
    const businessinquiriesGender = formData.get('businessinquiriesGender');
  
    // Now you can use these variables (businessinquiriesId, businessinquiriesName, joinDate, businessinquiriesproduct)
    // in your code. For example, you might want to add the new business-inquiries to a table:
    addbusinessinquiries(businessinquiriesId, businessinquiriesName, joinDate, businessinquiriesproduct, businessinquiriesPhone, businessinquiriesEmail, businessinquiriesAge, businessinquiriesAddress, businessinquiriesGender);
  
    // Close the modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


document.getElementById('exp-btn').addEventListener('click', function() {
  var sendButton = document.createElement('div');
  sendButton.innerHTML = `
      <div class="send-container">
          <button class="send">
              <div class="wrapper">
                  <i class="fa-regular fa-paper-plane"></i>
              </div>
              <span>Send</span>
          </button>
      </div>
  `;

  var displayTable = document.getElementById('display-table');
  displayTable.parentNode.insertBefore(sendButton, displayTable.nextSibling);

  // Remove the "Add business-inquiries" button
  var addbusinessinquiriesButton = document.getElementById('myBtn');
  addbusinessinquiriesButton.parentNode.removeChild(addbusinessinquiriesButton);

  // Disable the "Expiring" button
  this.disabled = true;
  document.getElementById('all-btn').disabled = false;
});

document.getElementById('all-btn').addEventListener('click', function() {
  var sendButton = document.querySelector('.send-container');
  var addbusinessinquiriesButton = document.getElementById('myBtn');

  // If the "Send" button exists, remove it
  if (sendButton) {
      sendButton.parentNode.removeChild(sendButton);
  }

  // If the "Add business-inquiries" button doesn't exist, create it
  if (!addbusinessinquiriesButton) {
      addbusinessinquiriesButton = document.createElement('button');
      addbusinessinquiriesButton.setAttribute('class', 'btn btn-outline');
      addbusinessinquiriesButton.setAttribute('id', 'myBtn');
      addbusinessinquiriesButton.textContent = 'Add business-inquiries';

      var boxHeaderButtonDiv = document.querySelector('.box-header-button');
      boxHeaderButtonDiv.appendChild(addbusinessinquiriesButton);
  }

  // Enable the "Expiring" button
  document.getElementById('exp-btn').disabled = false;
  this.disabled = true;

  // Get the first modal
  var addbusinessinquiriesModal = document.getElementById("add-business-inquiries");

  // Get the button that opens the first modal
  var addbusinessinquiriesBtn = document.getElementById("myBtn");

  // Get the <span> element that closes the first modal
  var addbusinessinquiriesCloseSpan = addbusinessinquiriesModal.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the first modal
  addbusinessinquiriesBtn.onclick = function() {
    addbusinessinquiriesModal.style.display = "block";
  }

  // When the user clicks on <span> (x) in the first modal, close it
  addbusinessinquiriesCloseSpan.onclick = function() {
    addbusinessinquiriesModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the first modal, close it
  window.onclick = function(event) {
    if (event.target == addbusinessinquiriesModal) {
      addbusinessinquiriesModal.style.display = "none";
    }
  }

});





