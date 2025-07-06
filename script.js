// Quote data for both languages with authors
const quotes = {
    english: [
        { text: "The measure of a life is not its duration, but its donation.", author: "Peter Marshall" },
        { text: "No one has ever become poor by giving.", author: "Anne Frank" },
        { text: "We make a living by what we get, but we make a life by what we give.", author: "Winston Churchill" },
        { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
        { text: "Kindness is a language which the deaf can hear and the blind can see.", author: "Mark Twain" },
        { text: "The meaning of life is to find your gift. The purpose of life is to give it away.", author: "Pablo Picasso" },
        { text: "What we do for ourselves dies with us. What we do for others and the world remains.", author: "Albert Pike" },
        { text: "The fragrance always remains in the hand that gives the rose.", author: "Hada Bejar" },
        { text: "A generous heart, kind speech, and a life of service are the things which renew humanity.", author: "Buddha" },
        { text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over.", author: "Luke 6:38" },
        { text: "The wise person does not accumulate wealth, but rather helps others. The more you help, the more you have.", author: "Lao Tzu" },
        { text: "Remember, it is more blessed to give than to receive.", author: "Acts 20:35" },
        { text: "We rise by lifting others up.", author: "Robert Ingersoll" },
        { text: "The poor man is not he who has little, but he who needs more.", author: "Publilius Syrus" },
        { text: "Money is like manure; it's not worth a thing unless it's spread around encouraging young things to grow.", author: "Thornton Wilder" },
        { text: "The greatest good you can do for another is not just to share your riches but to reveal to them their own.", author: "Benjamin Disraeli" },
        { text: "Service to others is the rent you pay for your room here on earth.", author: "Muhammad Ali" },
        { text: "The best and most beautiful things in the world cannot be seen or even touched. They must be felt with the heart.", author: "Helen Keller" },
        { text: "Happiness doesn't result from what we get, but from what we give.", author: "Ben Carson" },
        { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" }
    ],
    pidgin: [
        { text: "Na how you give, no be how long you live na im matter pass.", author: "Peter Marshall" },
        { text: "Nobody ever become poor because e dey give people.", author: "Anne Frank" },
        { text: "We dey make living from wetin we get, but we dey make life from wetin we give.", author: "Winston Churchill" },
        { text: "The best way to find yourself na to lose yourself for service of others.", author: "Mahatma Gandhi" },
        { text: "Kindness na language wey deaf person fit hear and blind person fit see.", author: "Mark Twain" },
        { text: "The meaning of life na to find your gift. The purpose of life na to give am away.", author: "Pablo Picasso" },
        { text: "Wetin we do for ourselves go die with us. Wetin we do for others and the world go remain.", author: "Albert Pike" },
        { text: "The sweet smell always dey remain for hand wey give the rose.", author: "Hada Bejar" },
        { text: "Generous heart, kind speech, and life of service na the things wey dey renew humanity.", author: "Buddha" },
        { text: "Give, and dem go give you. Good measure, pressed down, shaken together and running over.", author: "Luke 6:38" },
        { text: "The wise person no dey accumulate wealth, but rather dey help others. The more you help, the more you get.", author: "Lao Tzu" },
        { text: "Remember, e better to give than to receive.", author: "Acts 20:35" },
        { text: "We dey rise by lifting others up.", author: "Robert Ingersoll" },
        { text: "The poor man no be person wey get small thing, but person wey need more.", author: "Publilius Syrus" },
        { text: "Money be like manure; e no worth anything unless you spread am around to encourage young things to grow.", author: "Thornton Wilder" },
        { text: "The greatest good wey you fit do for another person no be to share your riches but to show them their own.", author: "Benjamin Disraeli" },
        { text: "Service to others na the rent wey you dey pay for your room for this earth.", author: "Muhammad Ali" },
        { text: "The best and most beautiful things for this world no fit see or even touch. Dem must feel with heart.", author: "Helen Keller" },
        { text: "Happiness no dey come from wetin we get, but from wetin we give.", author: "Ben Carson" },
        { text: "The purpose of life no be to be happy. Na to be useful, to be honorable, to be compassionate, to make some difference say you don live and live well.", author: "Ralph Waldo Emerson" }
    ]
};

// Application state
let currentLanguage = 'english';
let currentQuoteIndex = 0;
let isAnimating = false;

// DOM elements
let quoteTextElement;
let languageButton;
let shareButton;

// Get daily quote index based on date
function getDailyQuoteIndex() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return dayOfYear % quotes.english.length;
}

// Initialize the application
function initializeApp() {
    quoteTextElement = document.getElementById('quote-text');
    languageButton = document.getElementById('language-btn');
    shareButton = document.getElementById('share-btn');
    
    if (!quoteTextElement || !languageButton || !shareButton) {
        console.error('Required elements not found');
        return;
    }
    
    // Set daily quote
    currentQuoteIndex = getDailyQuoteIndex();
    displayDailyQuote();
    
    // Add event listeners for better accessibility
    addEventListeners();
}

// Display the daily quote
function displayDailyQuote() {
    const quotesArray = quotes[currentLanguage];
    const dailyQuote = quotesArray[currentQuoteIndex];
    animateQuoteChange(dailyQuote);
}

// Add event listeners
function addEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            if (!isAnimating) {
                displayNextQuote();
            }
            break;
        case 'l':
        case 'L':
            e.preventDefault();
            if (!isAnimating) {
                switchLanguage();
            }
            break;
        case 's':
        case 'S':
            e.preventDefault();
            if (!isAnimating) {
                shareCurrentQuote();
            }
            break;
    }
}

// Handle swipe gestures
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next quote
            if (!isAnimating) {
                displayNextQuote();
            }
        } else {
            // Swipe right - toggle language
            if (!isAnimating) {
                switchLanguage();
            }
        }
    }
}

// Display the next quote in sequence
function displayNextQuote() {
    if (isAnimating) return;
    
    const quotesArray = quotes[currentLanguage];
    
    // Move to next quote, loop back to first if at end
    currentQuoteIndex = (currentQuoteIndex + 1) % quotesArray.length;
    
    // Animate quote change
    animateQuoteChange(quotesArray[currentQuoteIndex]);
}

// Animate quote change with fade effect
function animateQuoteChange(quoteObj) {
    isAnimating = true;
    
    // Fade out
    quoteTextElement.classList.remove('fade-in');
    quoteTextElement.classList.add('fade-out');
    
    setTimeout(() => {
        // Create HTML with quote and author
        quoteTextElement.innerHTML = `
            <div class="quote-content">${quoteObj.text}</div>
            <div class="quote-author">— ${quoteObj.author}</div>
        `;
        quoteTextElement.classList.remove('fade-out');
        quoteTextElement.classList.add('fade-in');
        
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }, 150);
}

// Toggle between English and Pidgin
function switchLanguage() {
    if (isAnimating) return;
    
    currentLanguage = currentLanguage === 'english' ? 'pidgin' : 'english';
    
    // Update button text
    languageButton.textContent = currentLanguage === 'english' 
        ? '🌍 Switch to Pidgin' 
        : '🌍 Switch to English';
    
    // Update quote with new language (keep same index)
    animateQuoteChange(quotes[currentLanguage][currentQuoteIndex]);
}

// Share quote on social media
function shareCurrentQuote() {
    console.log('Share function called'); // Debug log
    
    if (isAnimating) {
        console.log('Animation in progress, cannot share');
        return;
    }
    
    const currentQuote = quotes[currentLanguage][currentQuoteIndex];
    const foundationName = "Rev. Fr. Callistus Osiga Foundation";
    
    // Create the quote image
    createQuoteImage(currentQuote, foundationName);
}

// Create quote image and show share options
function createQuoteImage(currentQuote, foundationName) {
    try {
        // Create canvas for the quote image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
            console.error('Canvas context not available');
            showShareMenu(currentQuote, foundationName);
            return;
        }
        
        // Set canvas size
        canvas.width = 1200;
        canvas.height = 800;
        
        // Create animated gradient background (matching website)
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FF8C00');
        gradient.addColorStop(1, '#FFA500');
        
        // Fill background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add scattered emojis throughout the image (like website)
        const emojis = ['💰', '🤝', '❤️', '🎁', '🌟', '🙏'];
        ctx.font = '36px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Scatter emojis randomly across the entire image
        emojis.forEach((emoji, index) => {
            // Random positions across the entire canvas
            const x = 50 + Math.random() * (canvas.width - 100);
            const y = 50 + Math.random() * (canvas.height - 100);
            const opacity = 0.3 + Math.random() * 0.4; // Random opacity between 0.3 and 0.7
            const size = 24 + Math.random() * 24; // Random size between 24 and 48
            
            ctx.font = `${size}px Arial, sans-serif`;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillText(emoji, x, y);
        });
        
        // Load and add the actual logo image
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = function() {
            // Add foundation logo at the top
            const logoSize = 80;
            const logoX = canvas.width / 2 - logoSize / 2;
            const logoY = 50;
            
            // Create circular clip for logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.clip();
            
            // Draw the actual logo image
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            ctx.restore();
            
            // Add logo border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add logo shadow
            ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Create glass morphism container (matching website design) - MOVED TO CENTER
            const containerX = 100;
            const containerY = 250; // Moved down to center more
            const containerWidth = canvas.width - 200;
            const containerHeight = 300; // Reduced height for better centering
            
            // Glass morphism background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.roundRect(containerX, containerY, containerWidth, containerHeight, 25);
            ctx.fill();
            
            // Glass morphism border
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(containerX, containerY, containerWidth, containerHeight, 25);
            ctx.stroke();
            
            // Add subtle blur effect (simulated)
            ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Add foundation name below logo
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 28px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText('REV. FR. CALLISTUS OSIGA FOUNDATION', canvas.width / 2, logoY + logoSize + 40);
            
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'italic 18px Arial, sans-serif';
            ctx.fillText('...you too can be kind', canvas.width / 2, logoY + logoSize + 65);
            
            // Add quote text with glass morphism styling
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'bold 32px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            
            // Word wrap function
            function wrapText(text, maxWidth) {
                const words = text.split(' ');
                const lines = [];
                let currentLine = words[0];
                
                for (let i = 1; i < words.length; i++) {
                    const word = words[i];
                    const width = ctx.measureText(currentLine + ' ' + word).width;
                    if (width < maxWidth) {
                        currentLine += ' ' + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                }
                lines.push(currentLine);
                return lines;
            }
            
            const wrappedQuote = wrapText(currentQuote.text, containerWidth - 100);
            const lineHeight = 45;
            const quoteStartY = containerY + (containerHeight - (wrappedQuote.length * lineHeight) - 60) / 2;
            
            wrappedQuote.forEach((line, index) => {
                ctx.fillText(line, canvas.width / 2, quoteStartY + (index * lineHeight));
            });
            
            // Add author name with glass morphism styling
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 24px Arial, sans-serif';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText(`— ${currentQuote.author}`, canvas.width / 2, quoteStartY + (wrappedQuote.length * lineHeight) + 30);
            
            // Add decorative quote marks
            ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.font = 'bold 80px Arial, sans-serif';
            ctx.shadowBlur = 0;
            ctx.fillText('"', containerX + 50, quoteStartY + 40);
            ctx.fillText('"', containerX + containerWidth - 50, quoteStartY + (wrappedQuote.length * lineHeight) - 20);
            
            // Add subtle glass morphism highlights
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.ellipse(containerX + 50, containerY + 50, 30, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(containerX + containerWidth - 50, containerY + containerHeight - 50, 40, 25, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Add website URL at bottom
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '16px Arial, sans-serif';
            ctx.shadowBlur = 0;
            ctx.fillText('callistusfoundation.org', canvas.width / 2, canvas.height - 30);
            
            // Convert canvas to blob and share
            canvas.toBlob((blob) => {
                shareImageWithNativeAPI(blob, currentQuote, foundationName);
            }, 'image/png');
        };
        
        // Handle logo loading error
        logoImg.onerror = function() {
            console.error('Failed to load logo image');
            // Fallback to text-based logo
            const logoSize = 80;
            const logoX = canvas.width / 2 - logoSize / 2;
            const logoY = 50;
            
            // Create logo background (circular like website)
            ctx.fillStyle = 'radial-gradient(circle, #FFD700, #FF8C00)';
            ctx.beginPath();
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Add logo border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add foundation initials as fallback
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'bold 24px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('CF', logoX + logoSize / 2, logoY + logoSize / 2);
            
            // Continue with the rest of the image generation...
            // (Same code as above for the rest of the image)
        };
        
        // Load the logo image
        logoImg.src = './asset/Callistus-image.jpg';
        
    } catch (error) {
        console.error('Error creating image:', error);
        showShareMenu(currentQuote, foundationName);
    }
}

// Helper function for rounded rectangles (if not supported)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
    };
}

// Share image using native Web Share API
function shareImageWithNativeAPI(blob, currentQuote, foundationName) {
    const hashtags = "#InspirationalQuotes #Kindness #Giving #CallistusFoundation";
    const shareText = `"${currentQuote.text}" — ${currentQuote.author} - ${foundationName} ${hashtags}`;
    
    console.log('Share text with hashtags:', shareText); // Debug log
    
    // Create file from blob
    const file = new File([blob], 'callistus-quote.png', { type: 'image/png' });
    
    // Check if native sharing is available
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        // Use native sharing (mobile devices)
        navigator.share({
            title: foundationName,
            text: shareText,
            files: [file]
        }).then(() => {
            console.log('Shared successfully with hashtags');
        }).catch((error) => {
            console.log('Error sharing:', error);
            // Fallback to custom share menu
            showShareMenuWithImage(currentQuote, foundationName, URL.createObjectURL(blob));
        });
    } else {
        // Fallback for desktop or unsupported browsers
        showShareMenuWithImage(currentQuote, foundationName, URL.createObjectURL(blob));
    }
}

// Show share menu with image options
function showShareMenuWithImage(currentQuote, foundationName, imageDataUrl) {
    const hashtags = "#InspirationalQuotes #Kindness #Giving #CallistusFoundation";
    const shareText = `"${currentQuote.text}" — ${currentQuote.author} - ${foundationName} ${hashtags}`;
    
    console.log('Share menu text with hashtags:', shareText); // Debug log
    
    // Create share menu
    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';
    shareMenu.innerHTML = `
        <div class="share-menu-content">
            <h3>Share Quote Image</h3>
            <div class="quote-preview">
                <img src="${imageDataUrl}" alt="Quote Image" style="max-width: 100%; height: auto; border-radius: 10px; margin: 15px 0;">
            </div>
            <div class="share-text-preview" style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left; font-size: 14px;">
                <strong>Share Text Preview:</strong><br>
                <span style="color: #666;">${shareText}</span>
            </div>
            <div class="share-buttons">
                <button class="share-btn share-download" onclick="downloadImage('${imageDataUrl}')">
                    📥 Download Image
                </button>
                <button class="share-btn share-copy" onclick="copyImageToClipboard('${imageDataUrl}')">
                    📋 Copy Image
                </button>
                <button class="share-btn share-native" onclick="shareWithNativeAPI('${imageDataUrl}', '${currentQuote.text}', '${currentQuote.author}', '${foundationName}')">
                    📤 Share Image
                </button>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}" target="_blank" class="share-btn share-twitter">
                    🐦 Twitter
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}" target="_blank" class="share-btn share-facebook">
                    📘 Facebook
                </a>
                <a href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" class="share-btn share-whatsapp">
                    📱 WhatsApp
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn share-linkedin">
                    💼 LinkedIn
                </a>
            </div>
            <button class="share-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    // Add styles
    shareMenu.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    shareMenu.querySelector('.share-menu-content').style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    `;
    
    shareMenu.querySelector('.share-buttons').style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 20px 0;
    `;
    
    shareMenu.querySelectorAll('.share-btn').forEach(btn => {
        btn.style.cssText = `
            padding: 12px 15px;
            border: none;
            border-radius: 8px;
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
            cursor: pointer;
            font-size: 14px;
        `;
        
        const platform = btn.className.split(' ')[1];
        switch(platform) {
            case 'share-download':
                btn.style.background = '#4CAF50';
                break;
            case 'share-copy':
                btn.style.background = '#2196F3';
                break;
            case 'share-native':
                btn.style.background = '#FF9800';
                break;
            case 'share-twitter':
                btn.style.background = '#1DA1F2';
                break;
            case 'share-facebook':
                btn.style.background = '#4267B2';
                break;
            case 'share-whatsapp':
                btn.style.background = '#25D366';
                break;
            case 'share-linkedin':
                btn.style.background = '#0077B5';
                break;
        }
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    shareMenu.querySelector('.share-close').style.cssText = `
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        background: #FFD700;
        color: white;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
    `;
    
    document.body.appendChild(shareMenu);
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
        if (shareMenu.parentElement) {
            shareMenu.remove();
        }
    }, 15000);
}

// Share with native API (for the button in the menu)
function shareWithNativeAPI(imageDataUrl, quoteText, author, foundationName) {
    const hashtags = "#InspirationalQuotes #Kindness #Giving #CallistusFoundation";
    const shareText = `"${quoteText}" — ${author} - ${foundationName} ${hashtags}`;
    
    console.log('Native share text with hashtags:', shareText); // Debug log
    
    // Convert data URL to blob
    fetch(imageDataUrl)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], 'callistus-quote.png', { type: 'image/png' });
            
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    title: foundationName,
                    text: shareText,
                    files: [file]
                }).then(() => {
                    console.log('Shared successfully with hashtags');
                }).catch((error) => {
                    console.log('Error sharing:', error);
                    alert('Sharing failed. Please try downloading the image instead.');
                });
            } else {
                alert('Native sharing not supported. Please download the image and share manually.');
            }
        })
        .catch(error => {
            console.error('Error converting image:', error);
            alert('Error preparing image for sharing. Please download instead.');
        });
}

// Download image function
function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.download = 'callistus-quote.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Copy image to clipboard function
function copyImageToClipboard(dataUrl) {
    // Convert data URL to blob
    fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
            if (navigator.clipboard && navigator.clipboard.write) {
                // Try to write image to clipboard
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    alert('Image copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy image:', err);
                    alert('Failed to copy image. Please download instead.');
                });
            } else {
                alert('Clipboard API not supported. Please download the image.');
            }
        })
        .catch(err => {
            console.error('Error copying image:', err);
            alert('Error copying image. Please download instead.');
        });
}

// Simple share menu for fallback
function showShareMenu(currentQuote, foundationName) {
    const hashtags = "#InspirationalQuotes #Kindness #Giving #CallistusFoundation";
    const shareText = `"${currentQuote.text}" — ${currentQuote.author} - ${foundationName} ${hashtags}`;
    
    // Create share options
    const shareOptions = [
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`
        },
        {
            name: 'WhatsApp',
            url: `https://wa.me/?text=${encodeURIComponent(shareText)}`
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
        }
    ];
    
    // Create share menu
    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';
    shareMenu.innerHTML = `
        <div class="share-menu-content">
            <h3>Share Quote</h3>
            <p style="margin: 15px 0; font-style: italic; color: #666;">"${currentQuote.text}"</p>
            <p style="margin: 5px 0; color: #888; font-size: 14px;">— ${currentQuote.author}</p>
            <div class="share-buttons">
                ${shareOptions.map(option => `
                    <a href="${option.url}" target="_blank" class="share-btn share-${option.name.toLowerCase()}">
                        ${option.name}
                    </a>
                `).join('')}
            </div>
            <button class="share-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    // Add styles
    shareMenu.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    shareMenu.querySelector('.share-menu-content').style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    shareMenu.querySelector('.share-buttons').style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 20px 0;
    `;
    
    shareMenu.querySelectorAll('.share-btn').forEach(btn => {
        btn.style.cssText = `
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
            cursor: pointer;
        `;
        
        const platform = btn.className.split(' ')[1];
        switch(platform) {
            case 'share-twitter':
                btn.style.background = '#1DA1F2';
                break;
            case 'share-facebook':
                btn.style.background = '#4267B2';
                break;
            case 'share-whatsapp':
                btn.style.background = '#25D366';
                break;
            case 'share-linkedin':
                btn.style.background = '#0077B5';
                break;
        }
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    shareMenu.querySelector('.share-close').style.cssText = `
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        background: #FFD700;
        color: white;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
    `;
    
    document.body.appendChild(shareMenu);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (shareMenu.parentElement) {
            shareMenu.remove();
        }
    }, 10000);
}

// Public functions for button clicks (these are the ones called from HTML)
function newQuote() {
    displayNextQuote();
}

function toggleLanguage() {
    switchLanguage();
}

function shareQuote() {
    console.log('shareQuote function called'); // Debug log
    shareCurrentQuote();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp); 