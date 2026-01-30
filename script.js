// Dark mode toggle functionality
function initDarkModeToggle() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    
    // Set initial theme
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.innerHTML = '<span class="material-icons-outlined">dark_mode</span>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        // Update CSS variables for the button
        updateThemeToggleStyle(isDark);
    });
    
    // Initial style update
    updateThemeToggleStyle(document.body.classList.contains("dark-mode"));
}

function updateThemeToggleStyle(isDark) {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return;
    
    if (isDark) {
        themeToggle.style.backgroundColor = "#1e293b";
        themeToggle.style.borderColor = "#334155";
        themeToggle.innerHTML = '<span class="material-icons-outlined" style="color: #fbbf24;">light_mode</span>';
    } else {
        themeToggle.style.backgroundColor = "#ffffff";
        themeToggle.style.borderColor = "#e2e8f0";
        themeToggle.innerHTML = '<span class="material-icons-outlined" style="color: #64748b;">dark_mode</span>';
    }
}

// Simulate API data loading
function simulateDataLoading() {
    // Add loading states to cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const valueElement = card.querySelector('.stat-value');
        if (valueElement) {
            valueElement.dataset.original = valueElement.textContent;
            valueElement.textContent = '...';
        }
    });
    
    // Simulate API delay
    setTimeout(() => {
        statCards.forEach(card => {
            const valueElement = card.querySelector('.stat-value');
            if (valueElement && valueElement.dataset.original) {
                valueElement.textContent = valueElement.dataset.original;
            }
        });
    }, 1000);
}

// Add interactive functionality to buttons
function initInteractiveButtons() {
    // Claim buttons
    const claimButtons = document.querySelectorAll('.claim-btn, .promo-btn, .travel-btn, .doctor-btn, .check-score-btn');
    claimButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show success message based on button type
                let message = '';
                if (this.classList.contains('claim-btn')) {
                    message = 'Fuel discount claimed successfully!';
                } else if (this.classList.contains('promo-btn')) {
                    message = 'Application submitted successfully!';
                } else if (this.classList.contains('travel-btn')) {
                    message = 'Travel insurance purchased successfully!';
                } else if (this.classList.contains('doctor-btn')) {
                    message = 'Connecting you with a doctor...';
                } else if (this.classList.contains('check-score-btn')) {
                    message = 'Credit score: 750 (Excellent)';
                }
                
                if (message) {
                    showToast(message);
                }
            }, 1500);
        });
    });
    
    // Bill card actions
    const billActions = document.querySelectorAll('.bill-action');
    billActions.forEach(action => {
        action.addEventListener('click', function() {
            const billCard = this.closest('.bill-card');
            const billName = billCard.querySelector('.font-semibold').textContent;
            const billAmount = billCard.querySelector('.bill-amount').textContent;
            
            showToast(`Opening details for ${billName}: ${billAmount}`);
        });
    });
    
    // Service card actions
    const serviceActions = document.querySelectorAll('.service-action, .deal-action');
    serviceActions.forEach(action => {
        action.addEventListener('click', function() {
            const card = this.closest('.service-card, .deal-card');
            const title = card.querySelector('.service-title, .deal-title').textContent;
            
            showToast(`Exploring ${title}...`);
        });
    });
}

// Toast notification system
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #0f172a;
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideUp 0.3s ease;
    `;
    
    // Add dark mode support
    if (document.body.classList.contains('dark-mode')) {
        toast.style.background = '#1e293b';
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add CSS animations for toast
function addToastAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Bottom navigation interaction
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const navCenter = document.querySelector('.nav-center');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            const label = this.querySelector('.nav-label').textContent;
            showToast(`Navigating to ${label}...`);
        });
    });
    
    if (navCenter) {
        navCenter.addEventListener('click', function() {
            showToast('Quick actions menu opening...');
            
            // Create quick actions modal
            const modal = document.createElement('div');
            modal.className = 'quick-actions-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Quick Actions</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-actions">
                        <button class="action-btn">
                            <span class="material-icons-outlined">send</span>
                            <span>Send Money</span>
                        </button>
                        <button class="action-btn">
                            <span class="material-icons-outlined">payments</span>
                            <span>Pay Bill</span>
                        </button>
                        <button class="action-btn">
                            <span class="material-icons-outlined">receipt</span>
                            <span>View Statement</span>
                        </button>
                        <button class="action-btn">
                            <span class="material-icons-outlined">contact_support</span>
                            <span>Get Help</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                background: white;
                border-radius: 20px;
                padding: 24px;
                max-width: 300px;
                width: 90%;
                animation: slideUp 0.3s ease;
            `;
            
            if (document.body.classList.contains('dark-mode')) {
                modalContent.style.background = '#1e293b';
                modalContent.style.color = 'white';
            }
            
            document.body.appendChild(modal);
            
            // Close modal on click outside or close button
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('close-modal')) {
                    modal.remove();
                }
            });
            
            // Action button handlers
            modal.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const actionText = this.querySelector('span:last-child').textContent;
                    showToast(`${actionText} selected`);
                    modal.remove();
                });
            });
            
            // Add animation styles if not already present
            if (!document.querySelector('#modal-animations')) {
                const animationStyle = document.createElement('style');
                animationStyle.id = 'modal-animations';
                animationStyle.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(animationStyle);
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDarkModeToggle();
    simulateDataLoading();
    addToastAnimations();
    initInteractiveButtons();
    initNavigation();
    
    // Add some initial demo data updates
    setTimeout(() => {
        // Update some numbers to show dynamic data
        const moneyIn = document.querySelector('.stat-card:nth-child(3) .stat-value');
        const moneyOut = document.querySelector('.stat-card:nth-child(4) .stat-value');
        
        if (moneyIn && moneyOut) {
            // Simulate updated values
            const newMoneyIn = Math.floor(Math.random() * 500) + 800;
            const newMoneyOut = Math.floor(Math.random() * 500) + 1800;
            
            moneyIn.textContent = `$${newMoneyIn}`;
            moneyOut.textContent = `$${newMoneyOut}`;
        }
    }, 2000);
});