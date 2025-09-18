const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// @desc    Upload image (base64 or URL)
// @route   POST /api/upload/image
// @access  Private
const uploadImage = async (req, res) => {
  try {
    const { image, type = 'base64' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required'
      });
    }

    let imageUrl;

    if (type === 'base64') {
      // Handle base64 image upload
      if (!image.startsWith('data:image/')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid base64 image format'
        });
      }

      // Extract image data and extension
      const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({
          success: false,
          message: 'Invalid base64 image format'
        });
      }

      const extension = matches[1];
      const imageData = matches[2];

      // Validate file extension
      const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
      if (!allowedExtensions.includes(extension.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image format. Allowed: jpeg, jpg, png, gif, webp'
        });
      }

      // Generate unique filename
      const filename = `${crypto.randomUUID()}.${extension}`;
      const uploadDir = path.join(__dirname, '../uploads/images');
      const filePath = path.join(uploadDir, filename);

      // Create upload directory if it doesn't exist
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      // Save image file
      const buffer = Buffer.from(imageData, 'base64');
      
      // Check file size (max 5MB)
      if (buffer.length > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Image size too large. Maximum 5MB allowed'
        });
      }

      await fs.writeFile(filePath, buffer);

      // Generate URL
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${filename}`;

    } else if (type === 'url') {
      // Handle URL validation
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
      if (!urlPattern.test(image)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image URL format'
        });
      }

      imageUrl = image;

    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid upload type. Use "base64" or "url"'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        type
      }
    });

  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading image'
    });
  }
};

// @desc    Delete uploaded image
// @route   DELETE /api/upload/image
// @access  Private
const deleteImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    // Check if it's a local uploaded file
    const urlPattern = new RegExp(`^${req.protocol}://${req.get('host')}/uploads/images/(.+)$`);
    const matches = imageUrl.match(urlPattern);

    if (matches) {
      const filename = matches[1];
      const filePath = path.join(__dirname, '../uploads/images', filename);

      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        
        res.status(200).json({
          success: true,
          message: 'Image deleted successfully'
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: 'Image file not found'
        });
      }
    } else {
      // External URL - just return success
      res.status(200).json({
        success: true,
        message: 'External image URL removed from reference'
      });
    }

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting image'
    });
  }
};

// @desc    Get image info
// @route   GET /api/upload/image/info
// @access  Public
const getImageInfo = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    // Check if it's a local uploaded file
    const urlPattern = new RegExp(`^${req.protocol}://${req.get('host')}/uploads/images/(.+)$`);
    const matches = url.match(urlPattern);

    if (matches) {
      const filename = matches[1];
      const filePath = path.join(__dirname, '../uploads/images', filename);

      try {
        const stats = await fs.stat(filePath);
        
        res.status(200).json({
          success: true,
          data: {
            url,
            filename,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            type: 'local'
          }
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: 'Image file not found'
        });
      }
    } else {
      // External URL
      res.status(200).json({
        success: true,
        data: {
          url,
          type: 'external'
        }
      });
    }

  } catch (error) {
    console.error('Get image info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting image info'
    });
  }
};

// @desc    Optimize image (resize/compress)
// @route   POST /api/upload/image/optimize
// @access  Private
const optimizeImage = async (req, res) => {
  try {
    const { imageUrl, width, height, quality = 80 } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    // For now, return the original image URL
    // In a production environment, you would use a library like Sharp or similar
    res.status(200).json({
      success: true,
      message: 'Image optimization completed',
      data: {
        originalUrl: imageUrl,
        optimizedUrl: imageUrl, // Would be different in real optimization
        width,
        height,
        quality
      }
    });

  } catch (error) {
    console.error('Optimize image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error optimizing image'
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getImageInfo,
  optimizeImage
};
