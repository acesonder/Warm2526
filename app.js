// Winter Warming Room Application
// Minimal JavaScript with AJAX functionality

// Global state
let currentRole = null;

// Role selection
function selectRole(role) {
    currentRole = role;
    showDashboard(role);
}

// Show dashboard based on role
function showDashboard(role) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('dashboard-section').classList.add('active');
    
    // Update dashboard title
    const titleMap = {
        'client': 'Client Dashboard',
        'staff': 'Staff Dashboard',
        'admin': 'Administrator Dashboard'
    };
    document.getElementById('dashboard-title').textContent = titleMap[role] || 'Dashboard';
    
    // Load content via AJAX
    loadDashboardContent(role);
}

// Logout function
function logout() {
    currentRole = null;
    document.getElementById('dashboard-section').classList.remove('active');
    document.getElementById('login-section').classList.add('active');
    document.getElementById('dynamic-content').innerHTML = '<div class="loading">Loading...</div>';
}

// AJAX content loader
function loadDashboardContent(role) {
    const contentArea = document.getElementById('dynamic-content');
    contentArea.innerHTML = '<div class="loading">Loading...</div>';
    
    // Simulate AJAX call with setTimeout (in production, this would be a real AJAX request)
    setTimeout(() => {
        const content = getContentForRole(role);
        contentArea.innerHTML = content;
        
        // After content is loaded, attach event listeners if needed
        attachEventListeners(role);
    }, 500);
}

// Get content based on role
function getContentForRole(role) {
    const contentMap = {
        'client': getClientContent(),
        'staff': getStaffContent(),
        'admin': getAdminContent()
    };
    return contentMap[role] || '<p>No content available</p>';
}

// Client dashboard content
function getClientContent() {
    return `
        <div class="card">
            <h3>Welcome to the Winter Warming Room</h3>
            <div class="alert alert-info">
                <strong>Notice:</strong> Please check in at the front desk upon arrival.
            </div>
            <p>We're here to provide a safe and warm environment during cold weather.</p>
        </div>
        
        <div class="card-grid">
            <div class="stat-card">
                <h4>18°F</h4>
                <p>Outside Temperature</p>
            </div>
            <div class="stat-card">
                <h4>72°F</h4>
                <p>Room Temperature</p>
            </div>
            <div class="stat-card">
                <h4>24/7</h4>
                <p>Open Hours</p>
            </div>
        </div>
        
        <div class="card">
            <h3>Available Services</h3>
            <ul class="info-list">
                <li>☕ Hot beverages and snacks available</li>
                <li>🛏️ Warm sleeping areas</li>
                <li>🚿 Shower facilities (by appointment)</li>
                <li>🩺 Basic medical assistance</li>
                <li>📱 Phone charging stations</li>
                <li>👕 Winter clothing donations</li>
            </ul>
        </div>
        
        <div class="card">
            <h3>Need Assistance?</h3>
            <p>Our staff is here to help. Please speak with any staff member for:</p>
            <ul class="info-list">
                <li>Social services referrals</li>
                <li>Housing assistance information</li>
                <li>Mental health support</li>
                <li>Job placement resources</li>
            </ul>
            <button class="action-btn success mt-20" onclick="requestAssistance()">Request Assistance</button>
        </div>
    `;
}

// Staff dashboard content
function getStaffContent() {
    return `
        <div class="card">
            <h3>Staff Dashboard</h3>
            <div class="alert alert-success">
                <strong>Status:</strong> All systems operational. Current capacity: 45/60
            </div>
        </div>
        
        <div class="card-grid">
            <div class="stat-card">
                <h4>45</h4>
                <p>Current Occupancy</p>
            </div>
            <div class="stat-card">
                <h4>60</h4>
                <p>Total Capacity</p>
            </div>
            <div class="stat-card">
                <h4>12</h4>
                <p>Staff On Duty</p>
            </div>
        </div>
        
        <div class="card">
            <h3>Quick Actions</h3>
            <button class="action-btn" onclick="checkInClient()">Check In Client</button>
            <button class="action-btn" onclick="checkOutClient()">Check Out Client</button>
            <button class="action-btn success" onclick="dispenseSupplies()">Dispense Supplies</button>
            <button class="action-btn" onclick="scheduleAppointment()">Schedule Appointment</button>
        </div>
        
        <div class="card">
            <h3>Recent Activity</h3>
            <ul class="info-list">
                <li>Client check-in: John D. - 2:30 PM</li>
                <li>Supply request: Blankets (qty: 3) - 2:15 PM</li>
                <li>Appointment scheduled: Medical - 1:45 PM</li>
                <li>Client check-out: Sarah M. - 1:30 PM</li>
                <li>Emergency alert resolved - 12:45 PM</li>
            </ul>
        </div>
        
        <div class="card">
            <h3>Inventory Alerts</h3>
            <div class="alert alert-warning">
                <strong>Low Stock:</strong> Blankets (15 remaining), Winter coats (8 remaining)
            </div>
            <button class="action-btn" onclick="viewInventory()">View Full Inventory</button>
            <button class="action-btn success" onclick="requestSupplies()">Request Supplies</button>
        </div>
    `;
}

// Admin dashboard content
function getAdminContent() {
    return `
        <div class="card">
            <h3>Administrator Dashboard</h3>
            <div class="alert alert-info">
                <strong>System Status:</strong> All services running normally
            </div>
        </div>
        
        <div class="card-grid">
            <div class="stat-card">
                <h4>245</h4>
                <p>Total Clients (Week)</p>
            </div>
            <div class="stat-card">
                <h4>$12,450</h4>
                <p>Weekly Budget</p>
            </div>
            <div class="stat-card">
                <h4>18</h4>
                <p>Staff Members</p>
            </div>
            <div class="stat-card">
                <h4>95%</h4>
                <p>Satisfaction Rate</p>
            </div>
        </div>
        
        <div class="card">
            <h3>System Management</h3>
            <button class="action-btn" onclick="manageStaff()">Manage Staff</button>
            <button class="action-btn" onclick="viewReports()">View Reports</button>
            <button class="action-btn" onclick="manageBudget()">Manage Budget</button>
            <button class="action-btn success" onclick="configureSettings()">System Settings</button>
        </div>
        
        <div class="card">
            <h3>Facility Management</h3>
            <button class="action-btn" onclick="viewOccupancy()">View Occupancy</button>
            <button class="action-btn" onclick="manageInventory()">Inventory Management</button>
            <button class="action-btn" onclick="scheduleShifts()">Schedule Shifts</button>
            <button class="action-btn" onclick="maintenanceLog()">Maintenance Log</button>
        </div>
        
        <div class="card">
            <h3>Weekly Statistics</h3>
            <ul class="info-list">
                <li>Total check-ins this week: 245</li>
                <li>Average daily occupancy: 52 clients</li>
                <li>Meals served: 735</li>
                <li>Showers provided: 156</li>
                <li>Clothing items distributed: 89</li>
                <li>Social service referrals: 42</li>
            </ul>
        </div>
        
        <div class="card">
            <h3>Alerts & Notifications</h3>
            <div class="alert alert-warning">
                <strong>Maintenance Required:</strong> HVAC system scheduled for inspection on Friday
            </div>
            <div class="alert alert-info">
                <strong>Volunteer Event:</strong> Community donation drive this weekend
            </div>
            <button class="action-btn" onclick="viewAllAlerts()">View All Alerts</button>
        </div>
    `;
}

// Event listener attachment
function attachEventListeners(role) {
    // Additional event listeners can be attached here if needed
    console.log(`Dashboard loaded for role: ${role}`);
}

// Action functions (simulated AJAX calls)
function requestAssistance() {
    makeAjaxCall('request-assistance', { role: currentRole }, (response) => {
        alert('Assistance request submitted. A staff member will be with you shortly.');
    });
}

function checkInClient() {
    makeAjaxCall('check-in', { role: currentRole }, (response) => {
        alert('Client checked in successfully.');
    });
}

function checkOutClient() {
    makeAjaxCall('check-out', { role: currentRole }, (response) => {
        alert('Client checked out successfully.');
    });
}

function dispenseSupplies() {
    makeAjaxCall('dispense-supplies', { role: currentRole }, (response) => {
        alert('Supplies dispensed and logged.');
    });
}

function scheduleAppointment() {
    makeAjaxCall('schedule-appointment', { role: currentRole }, (response) => {
        alert('Appointment scheduled successfully.');
    });
}

function viewInventory() {
    makeAjaxCall('view-inventory', { role: currentRole }, (response) => {
        alert('Loading inventory details...');
    });
}

function requestSupplies() {
    makeAjaxCall('request-supplies', { role: currentRole }, (response) => {
        alert('Supply request submitted to administration.');
    });
}

function manageStaff() {
    makeAjaxCall('manage-staff', { role: currentRole }, (response) => {
        alert('Opening staff management panel...');
    });
}

function viewReports() {
    makeAjaxCall('view-reports', { role: currentRole }, (response) => {
        alert('Loading reports...');
    });
}

function manageBudget() {
    makeAjaxCall('manage-budget', { role: currentRole }, (response) => {
        alert('Opening budget management...');
    });
}

function configureSettings() {
    makeAjaxCall('configure-settings', { role: currentRole }, (response) => {
        alert('Opening system settings...');
    });
}

function viewOccupancy() {
    makeAjaxCall('view-occupancy', { role: currentRole }, (response) => {
        alert('Loading occupancy data...');
    });
}

function manageInventory() {
    makeAjaxCall('manage-inventory', { role: currentRole }, (response) => {
        alert('Opening inventory management...');
    });
}

function scheduleShifts() {
    makeAjaxCall('schedule-shifts', { role: currentRole }, (response) => {
        alert('Opening shift scheduler...');
    });
}

function maintenanceLog() {
    makeAjaxCall('maintenance-log', { role: currentRole }, (response) => {
        alert('Loading maintenance log...');
    });
}

function viewAllAlerts() {
    makeAjaxCall('view-alerts', { role: currentRole }, (response) => {
        alert('Loading all alerts...');
    });
}

// Generic AJAX call function
function makeAjaxCall(endpoint, data, callback) {
    // In production, this would be a real XMLHttpRequest or fetch call
    // For demonstration, we simulate the AJAX call
    console.log(`AJAX Call to: ${endpoint}`, data);
    
    // Simulate network delay
    setTimeout(() => {
        const response = {
            success: true,
            message: `Action ${endpoint} completed successfully`,
            data: data
        };
        callback(response);
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Winter Warming Room Application Initialized');
});
