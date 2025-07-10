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
    if (isAnimating) return;
    
    const currentQuote = quotes[currentLanguage][currentQuoteIndex];
    const foundationName = "Rev. Fr. Callistus Osiaga Foundation";
    
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
        
        // Create static version of the website's animated gradient background
        // (linear-gradient(135deg, #2193b0, #6dd5ed, #00c6fb))
        const gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0); // 135deg
        gradient.addColorStop(0, '#2193b0');
        gradient.addColorStop(0.5, '#6dd5ed');
        gradient.addColorStop(1, '#00c6fb');
        
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
        
        // --- Draw bouncing emojis in the background (like .bouncing-emojis) ---
        const emojiList = ['💰', '🤝', '❤️', '🎁', '🌟', '🙏'];
        const emojiPositions = [
            { x: 120, y: 100, size: 60, opacity: 0.6 },
            { x: 1080, y: 120, size: 60, opacity: 0.6 },
            { x: 200, y: 700, size: 60, opacity: 0.6 },
            { x: 1000, y: 650, size: 60, opacity: 0.6 },
            { x: 600, y: 80, size: 60, opacity: 0.6 },
            { x: 600, y: 750, size: 60, opacity: 0.6 },
        ];
        emojiList.forEach((emoji, i) => {
            ctx.save();
            ctx.globalAlpha = emojiPositions[i].opacity;
            ctx.font = `${emojiPositions[i].size}px Arial, sans-serif`;
            ctx.fillText(emoji, emojiPositions[i].x, emojiPositions[i].y);
            ctx.restore();
        });
        
        // --- Draw logo in a circular container with blue radial gradient and white border ---
        const logoSize = 150; // Increased from 120
        const logoX = canvas.width / 2 - logoSize / 2;
        const logoY = 60;
        // Draw blue radial gradient circle
        const grad = ctx.createRadialGradient(
            logoX + logoSize / 2, logoY + logoSize / 2, 10,
            logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2
        );
        grad.addColorStop(0, '#6dd5ed');
        grad.addColorStop(1, '#2193b0');
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        // Draw white border
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.stroke();
        ctx.clip();
        // Draw logo image
        const logoImg = new window.Image();
        logoImg.onload = function() {
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            ctx.restore();
            drawFoundationTextAndQuote();
        };
        logoImg.onerror = function() {
            ctx.restore();
            // fallback: draw initials
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 48px Segoe UI, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('CF', logoX + logoSize / 2, logoY + logoSize / 2);
            drawFoundationTextAndQuote();
        };
        logoImg.src = './asset/Callistus-image.jpg';
        // --- Draw foundation name and tagline below logo, then quote in glass morphism container ---
        function drawFoundationTextAndQuote() {
            // Foundation name
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = 'bold 36px Segoe UI, Arial, sans-serif';
            ctx.fillStyle = '#2193b0';
            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 4;
            ctx.fillText('REV. FR. CALLISTUS OSIAGA FOUNDATION', canvas.width / 2, logoY + logoSize + 20);
            // Tagline
            ctx.font = 'italic 22px Segoe UI, Arial, sans-serif';
            ctx.fillStyle = '#fff';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 2;
            ctx.fillText('...you too can be kind', canvas.width / 2, logoY + logoSize + 60);
            ctx.restore();
            // --- Glass morphism quote container ---
            const containerX = 120;
            const containerY = logoY + logoSize + 100; // Move further down below tagline
            const containerWidth = canvas.width - 240;
            const containerHeight = 320;
            // Glass background
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(containerX, containerY, containerWidth, containerHeight, 25);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fill();
            // Border
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(33,147,176,0.25)';
            ctx.stroke();
            // Box shadow (simulate)
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 32;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8;
            ctx.stroke();
            ctx.restore();
            // --- Quote text ---
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = '500 32px Segoe UI, Arial, sans-serif';
            ctx.fillStyle = '#2C3E50';
            ctx.shadowColor = 'rgba(255,255,255,0.9)';
            ctx.shadowBlur = 2;
            // Word wrap
            function wrapText(ctx, text, maxWidth) {
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
            const wrappedQuote = wrapText(ctx, currentQuote.text, containerWidth - 80);
            const lineHeight = 48;
            const quoteStartY = containerY + 50;
            wrappedQuote.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, quoteStartY + i * lineHeight);
            });
            // Author
            ctx.font = 'italic 24px Segoe UI, Arial, sans-serif';
            ctx.fillStyle = '#2193b0';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 2;
            ctx.fillText(`— ${currentQuote.author}`, canvas.width / 2, quoteStartY + wrappedQuote.length * lineHeight + 20);
            ctx.restore();
            // --- Website URL at bottom ---
            ctx.save();
            ctx.font = '16px Segoe UI, Arial, sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.shadowBlur = 0;
            ctx.textAlign = 'center';
            ctx.fillText('callistusfoundation.org', canvas.width / 2, canvas.height - 30);
            ctx.restore();
            // --- Done, share image ---
            canvas.toBlob((blob) => {
                shareImageWithNativeAPI(blob, currentQuote, foundationName);
            }, 'image/png');
        }
        return; // prevent old logo code from running
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