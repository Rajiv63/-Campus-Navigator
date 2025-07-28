// Knowledge Base
const campusKnowledge = {
  library: {
    location: 'Central Library is in Block A, Ground Floor',
    hours: '8:00 AM - 10:00 PM',
    services: 'Books, computers, study rooms, printing'
  },
  cafeteria: {
    location: 'Main Cafeteria is in Block B, First Floor',
    hours: '7:00 AM - 9:00 PM',
    services: 'Meals, snacks, beverages'
  },
  admin: {
    location: 'Admin Office is in Block C, Second Floor',
    hours: '9:00 AM - 5:00 PM',
    services: 'Admissions, student records'
  },
  labs: {
    location: 'Computer Labs are in Block D',
    hours: '8:00 AM - 8:00 PM',
    services: 'Computers, software, printing'
  },
  bus: {
    schedule: 'Every 15 mins from 8:00 AM to 8:00 PM',
    routes: 'Main Gate → Library → Cafeteria → Labs → Admin'
  }
};

// Facilities data
const facilities = [
  { name: 'Central Library', status: 'open', capacity: '85% occupied', info: 'Study rooms available' },
  { name: 'Main Cafeteria', status: 'open', capacity: '60% occupied', info: 'Short wait times' },
  { name: 'Computer Lab 1', status: 'busy', capacity: '95% occupied', info: '2 computers available' },
  { name: 'Computer Lab 2', status: 'open', capacity: '45% occupied', info: 'Many computers available' },
  { name: 'Admin Office', status: 'open', capacity: 'Low traffic', info: 'All services available' },
  { name: 'Main Auditorium', status: 'closed', capacity: 'Event in progress', info: 'Seminar until 3:00 PM' },
  { name: 'Parking Lot A', status: 'busy', capacity: '90% full', info: 'Limited spots' },
  { name: 'Parking Lot B', status: 'open', capacity: '65% full', info: 'Plenty of space' }
];

// Initialize
function init() {
  renderFacilities();
  setInterval(updateFacilities, 30000);
}
window.onload = init;

// Tabs
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

// Chatbot
function sendQuickMessage(message) {
  document.getElementById('chatInput').value = message;
  sendMessage();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  input.value = '';
  setTimeout(() => {
    const response = generateAIResponse(message);
    addMessage(response, 'bot');
  }, 1000);
}

function addMessage(text, sender) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `message ${sender}-message`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function generateAIResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes('library')) return `📚 ${campusKnowledge.library.location}\n${campusKnowledge.library.hours}\n${campusKnowledge.library.services}`;
  if (msg.includes('cafeteria') || msg.includes('food')) return `🍽️ ${campusKnowledge.cafeteria.location}\n${campusKnowledge.cafeteria.hours}\n${campusKnowledge.cafeteria.services}`;
  if (msg.includes('admin')) return `🏢 ${campusKnowledge.admin.location}\n${campusKnowledge.admin.hours}\n${campusKnowledge.admin.services}`;
  if (msg.includes('lab')) return `💻 ${campusKnowledge.labs.location}\n${campusKnowledge.labs.hours}\n${campusKnowledge.labs.services}`;
  if (msg.includes('bus')) return `🚌 ${campusKnowledge.bus.schedule}\n${campusKnowledge.bus.routes}`;
  if (msg.includes('events') || msg.includes('today')) return `📅 Events Today:\n• Tech Talk - 2 PM\n• Study Group - 4 PM\n• Sports Meet - 6 PM`;
  return `I can help with:\n• Campus directions\n• Facility info\n• Bus schedule\n• Events\nAsk anything!`;
}

// Navigation
function navigateTo(location) {
  const map = document.getElementById('mapContainer');
  map.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <h3>🗺️ Navigating to ${location}</h3>
      <p>📍 From: Main Gate<br>🎯 To: ${location}<br>🚶 Time: ${Math.floor(Math.random() * 10 + 2)} min<br>📏 Distance: ${Math.floor(Math.random() * 400 + 100)} m</p>
      <small>Coming soon: Real-time GPS with Google Maps</small>
    </div>`;
}

// Facilities
function renderFacilities() {
  const grid = document.getElementById('facilitiesGrid');
  grid.innerHTML = '';
  facilities.forEach(facility => {
    const card = document.createElement('div');
    card.className = 'facility-card';
    const statusClass = facility.status === 'open' ? 'status-open' : facility.status === 'closed' ? 'status-closed' : 'status-busy';
    card.innerHTML = `
      <div class="facility-name">${facility.name}</div>
      <div class="facility-status ${statusClass}">${facility.status.toUpperCase()}</div>
      <div class="facility-info"><strong>Capacity:</strong> ${facility.capacity}<br><strong>Info:</strong> ${facility.info}</div>`;
    grid.appendChild(card);
  });
}

function updateFacilities() {
  facilities.forEach(facility => {
    const random = Math.floor(Math.random() * 100);
    facility.capacity = `${random}% occupied`;
    facility.status = random > 90 ? 'busy' : random < 30 ? 'open' : Math.random() > 0.8 ? 'busy' : 'open';
  });
  renderFacilities();
}
