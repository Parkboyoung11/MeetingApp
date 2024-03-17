// Sample userlist array to store registered users
let userlist = [
    {"Single ID": "admin", "Password": "!Anhthu28519"},
];

// Định nghĩa hàm clearMainContent trước
function clearMainContent() {
    document.querySelector('main').innerHTML = '';
}
// Thêm biến cờ để theo dõi trạng thái của bảng
let userListVisible = false;

// Thay đổi hàm changeMenu trong file script.js
function changeMenu(menuNumber) {
    // Check if the user is logged in before accessing other menus
    if (!isLoggedIn()) {
        alert('Đăng nhập rồi làm gì thì làm bạn ơi');
        return;
    }

    // Check if the user is "admin" before accessing the "User list" menu
    let currentUser = getCurrentUser();
    if (menuNumber === 4 && currentUser && currentUser["Single ID"] === "admin") {
        // Logic to handle displaying user list only for "admin"
        userListVisible = !userListVisible;
        displayUserList();
    } else if (menuNumber === 2) { // Show create meeting page
        window.location.href = 'meeting.html';
    } else {
        // Clear main content if other menu is selected
        clearMainContent();

        // Show pop-up for non-admin users trying to access "User list" menu
        if (menuNumber === 4 && currentUser && currentUser["Single ID"] !== "admin") {
            alert('Học giỏi lên rồi làm Admin để được xem nhé :v');
        }
    }
}

// Thêm hàm getCurrentUser để lấy thông tin về người dùng hiện tại
function getCurrentUser() {
    if (isLoggedIn()) {
        let singleID = document.querySelector('.welcome-section p').innerText.split(' ')[1];
        return userlist.find(u => u["Single ID"] === singleID);
    }
    return null;
}
// Thêm hàm deleteUser để xóa người dùng
function deleteUser(index) {
    // Prompt user for confirmation
    if (confirm('Bạn có chắc muốn xóa người dùng này không?')) {
        // Remove user from the userlist array
        userlist.splice(index, 1);
        // Redisplay the updated user list
        displayUserList();
    }
}


// Thêm hàm displayUserList trong file script.js
function displayUserList() {
    clearMainContent();

    // Check if the user list should be visible
    if (userListVisible) {
        // Create user list table
        let userListTable = document.createElement('table');
        userListTable.innerHTML = '<tr><th>No</th><th>Single ID</th><th>Password</th><th>User level</th></tr>';

        // Populate user list table with registered users
        for (let i = 0; i < userlist.length; i++) {
            let user = userlist[i];
            let row = userListTable.insertRow();
            row.insertCell(0).innerText = i + 1;
            row.insertCell(1).innerText = user["Single ID"];
            row.insertCell(2).innerText = user["Password"];
            // Create a select element for "User level"
            let userLevelCell = row.insertCell(3);
            let userLevelSelect = document.createElement('select');
            userLevelSelect.innerHTML = '<option value="User">User</option><option value="Admin">Admin</option>';
            userLevelSelect.value = user["User level"];
            userLevelCell.appendChild(userLevelSelect);

        
            // Create "Edit", "Save", and "Delete" buttons
            let actionCell = row.insertCell(4);
            let editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = function () {
                // Enable the select list for editing
                userLevelSelect.disabled = false;
            };
            actionCell.appendChild(editButton);

            let saveButton = document.createElement('button');
            saveButton.innerText = 'Save';
            saveButton.onclick = function () {
                // Save the changes to "User level"
                user["User level"] = userLevelSelect.value;
                // Disable the select list after saving
                userLevelSelect.disabled = true;
            };
            // Initially disable the select list
            userLevelSelect.disabled = true;
            actionCell.appendChild(saveButton);

            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function () {
            // Call the deleteUser function when the "Delete" button is clicked
            deleteUser(i);
            };
            actionCell.appendChild(deleteButton);    
        }

        // Append user list table to main content
        document.querySelector('main').appendChild(userListTable);
    }
}

function register() {
    // Logic to handle registration
    let singleID = document.getElementById('singleID').value;
    let password = document.getElementById('password').value;

    if (singleID && password) {
        // Create user object
        let user = {
            No: userlist.length + 1,
            "Single ID": singleID,
            "Password": password,
            "User level": "User" // Default user level
        };

        // Add user to userlist
        userlist.push(user);

        // Clear input fields
        document.getElementById('singleID').value = '';
        document.getElementById('password').value = '';

        // Display success message
        alert('Đăng ký thành công!');
        console.log('User registered:', user);

        // After registering, update the user list table
        displayUserList();
    } else {
        alert('Vui lòng nhập Single ID và Password để đăng ký.');
    }
}

function login() {
    // Logic to handle login
    let singleID = document.getElementById('singleID').value;
    let password = document.getElementById('password').value;

    if (singleID && password) {
        // Check if user exists in userlist
        let user = userlist.find(u => u["Single ID"] === singleID && u["Password"] === password);

        if (user) {
            // Hide login section
            document.querySelector('.login-section').style.display = 'none';

            // Create welcome section
            let welcomeSection = document.createElement('div');
            welcomeSection.className = 'welcome-section';

            // Show welcome message
            let welcomeMessage = document.createElement('p');
            welcomeMessage.innerText = 'Welcome ' + singleID;
            welcomeSection.appendChild(welcomeMessage);

            // Show exit button
            let exitButton = document.createElement('button');
            exitButton.innerText = 'Thoát';
            exitButton.onclick = function() {
                // Reset login section
                document.querySelector('.login-section').style.display = 'block';
                welcomeSection.remove();
            };
            welcomeSection.appendChild(exitButton);

            // Append welcome section to body
            document.body.appendChild(welcomeSection);

            alert('Đăng nhập thành công!');
        } else {
            alert('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
        }
    } else {
        alert('Vui lòng nhập Single ID và Password để đăng nhập.');
    }
}

// Function to check if the user is logged in
function isLoggedIn() {
    // Implement logic to check if the user is logged in
    // Example: return true if logged in, false otherwise
    return document.querySelector('.welcome-section') !== null;
}
