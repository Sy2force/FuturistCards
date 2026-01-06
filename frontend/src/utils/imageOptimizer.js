// Image optimization utilities

/**
 * Compress and resize image file
 * @param {File} file - The image file to process
 * @param {Object} options - Compression options
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 800,
    maxHeight = 600,
    quality = 0.8,
    format = 'jpeg'
  } = options;

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: `image/${format}`,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        },
        `image/${format}`,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validate image file
 * @param {File} file - Image file to validate
 * @returns {Object} - Validation result
 */
export const validateImageFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Format not supported. Use JPG, PNG or WebP' 
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File is too large (max 5MB)' 
    };
  }

  return { isValid: true };
};

/**
 * Generate image preview URL
 * @param {File} file - Image file
 * @returns {string} - Preview URL
 */
export const generateImagePreview = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Cleanup preview URL
 * @param {string} url - Preview URL to cleanup
 */
export const cleanupPreview = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Convert image to WebP format
 * @param {File} file - Image file to convert
 * @param {number} quality - Compression quality (0-1)
 * @returns {Promise<File>} - WebP file
 */
export const convertToWebP = (file, quality = 0.8) => {
  return compressImage(file, { 
    format: 'webp', 
    quality,
    maxWidth: 1200,
    maxHeight: 900
  });
};

/**
 * Create multiple image sizes (responsive images)
 * @param {File} file - Original image file
 * @returns {Promise<Object>} - Object containing different sizes
 */
export const createResponsiveImages = async (file) => {
  const sizes = {
    thumbnail: { maxWidth: 150, maxHeight: 150, quality: 0.7 },
    small: { maxWidth: 400, maxHeight: 300, quality: 0.8 },
    medium: { maxWidth: 800, maxHeight: 600, quality: 0.8 },
    large: { maxWidth: 1200, maxHeight: 900, quality: 0.85 }
  };

  const results = {};

  for (const [sizeName, options] of Object.entries(sizes)) {
    results[sizeName] = await compressImage(file, options);
  }

  return results;
};
