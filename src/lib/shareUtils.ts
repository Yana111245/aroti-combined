// Share utilities for Aroti insights
export interface ShareableContent {
  title: string;
  content: string;
  type: 'tarot' | 'horoscope' | 'numerology';
  keywords?: string[];
  image?: string;
}

// Web Share API with fallback
export const shareContent = async (content: ShareableContent): Promise<boolean> => {
  const shareText = formatShareText(content);
  
  // Try Web Share API first (mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: content.title,
        text: shareText,
        url: window.location.origin,
      });
      return true;
    } catch (error) {
      console.log('Web Share API failed:', error);
    }
  }
  
  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Generate shareable image using Canvas API
export const generateShareImage = async (content: ShareableContent): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }
  
  // Instagram story dimensions
  canvas.width = 1080;
  canvas.height = 1920;
  
  // Celestial gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'hsl(235, 35%, 7%)');
  gradient.addColorStop(1, 'hsl(240, 30%, 9%)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle stars
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Title
  ctx.fillStyle = 'hsl(230, 8%, 96%)';
  ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(content.title, canvas.width / 2, 200);
  
  // Content
  ctx.fillStyle = 'hsl(230, 10%, 68%)';
  ctx.font = '32px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';
  
  // Wrap text
  const words = content.content.split(' ');
  let line = '';
  let y = 300;
  const maxWidth = canvas.width - 100;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, canvas.width / 2, y);
      line = words[i] + ' ';
      y += 40;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, canvas.width / 2, y);
  
  // Keywords (if available)
  if (content.keywords && content.keywords.length > 0) {
    y += 80;
    ctx.fillStyle = 'hsl(20, 55%, 58%)';
    ctx.font = '28px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';
    
    const keywordText = content.keywords.join(' • ');
    ctx.fillText(keywordText, canvas.width / 2, y);
  }
  
  // Aroti branding
  ctx.fillStyle = 'hsl(230, 10%, 68%)';
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';
  ctx.fillText('Aroti', canvas.width / 2, canvas.height - 100);
  
  return canvas.toDataURL('image/png');
};

// Download shareable image
export const downloadShareImage = async (content: ShareableContent): Promise<void> => {
  try {
    const dataUrl = await generateShareImage(content);
    const link = document.createElement('a');
    link.download = `aroti-${content.type}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to generate share image:', error);
  }
};

// Format text for sharing
const formatShareText = (content: ShareableContent): string => {
  let text = `🔮 ${content.title}\n\n${content.content}`;
  
  if (content.keywords && content.keywords.length > 0) {
    text += `\n\n✨ ${content.keywords.join(' • ')}`;
  }
  
  text += `\n\nDiscover your daily insights with Aroti ✨`;
  
  return text;
};

// Check if Web Share API is supported
export const isWebShareSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};
