let popupCount = 0;
const maxPopups = 8; // Set to exactly 8 popups

// Function to create a single popup
function createDefenderPopup() {
    if (popupCount >= maxPopups) return; // Stop after 8 popups

    popupCount++;
    
    const popup = document.createElement('div');
    popup.className = 'popup active';
    
    // Random position (within screen bounds)
    const randomX = Math.random() * (window.innerWidth - 520);
    const randomY = Math.random() * (window.innerHeight - 300);
    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';

    popup.innerHTML = `
        <div class="title-bar">Windows Defender Security Center</div>
        <div class="popup-content">
            <div class="alert-title">Threat Detected!</div>
            <div class="alert-desc">App: Ads.financetrack(2).dll<br>Alert level: Severe<br>Status: Active</div>
            <div class="alert-desc">Access to this PC has been blocked for security reasons. Please choose an action below to continue.</div>
            <div class="button-container">
                <button class="btn btn-deny" onclick="createDefenderPopup()">Deny</button>
                <button class="btn btn-allow" onclick="createDefenderPopup()">Allow</button>
            </div>
        </div>
        <div class="status-bar">Microsoft Defender Antivirus</div>
    `;
    
    document.body.appendChild(popup);
    
    // Play alert sound for the first few popups
    if (popupCount <= 3) {
        try {
            const alertSound = document.getElementById('alert-sound');
            alertSound.currentTime = 0;
            alertSound.play();
        } catch (error) {
            console.log("Audio error:", error);
        }
    }
}

// Create 8 popups with delays
function startSimulation() {
    for(let i = 0; i < maxPopups; i++) {
        setTimeout(() => {
            createDefenderPopup();
            
            // Show final image after the last popup
            if (i === maxPopups - 1) {
                setTimeout(() => {
                    document.getElementById('final-popup').style.display = 'block';
                }, 1000);
            }
        }, i * 400); // 400ms delay between each popup
    }
}

// Start the simulation when page loads
window.addEventListener('load', startSimulation);

// Emergency escape: Press 'Escape' key to close all popups
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => popup.remove());
        document.getElementById('final-popup').style.display = 'none';
        alert('Simulation stopped. Press OK to continue.');
    }
});
