#!/bin/bash

# Script to optimize images for web performance
# Requires ImageMagick: brew install imagemagick

echo "🖼️  Starting image optimization..."

# Directory containing project images
IMG_DIR="public/images/projects"

# Create a backup directory if it doesn't exist
BACKUP_DIR="${IMG_DIR}/original"
mkdir -p "$BACKUP_DIR"

# Process each image
for img in "$IMG_DIR"/*.{jpg,jpeg,png}; do
  # Skip if file doesn't exist
  [ -e "$img" ] || continue
  
  filename=$(basename "$img")
  name="${filename%.*}"
  ext="${filename##*.}"
  
  echo "Processing: $filename"
  
  # Backup original if not already backed up
  if [ ! -f "$BACKUP_DIR/$filename" ]; then
    cp "$img" "$BACKUP_DIR/"
    echo "  ✓ Backed up to $BACKUP_DIR"
  fi
  
  # Get current file size
  original_size=$(du -h "$img" | cut -f1)
  
  # Optimize based on file type
  if [[ "$ext" == "png" ]]; then
    # Convert PNG to WebP for better compression
    magick "$img" -strip -quality 80 -resize "1200x800>" "${IMG_DIR}/${name}.webp"
    echo "  ✓ Created WebP version: ${name}.webp"
    
    # Also optimize PNG
    magick "$img" -strip -quality 85 -resize "1200x800>" "$img"
  else
    # Optimize JPG
    magick "$img" -strip -quality 80 -resize "1200x800>" "$img"
    
    # Create WebP version
    magick "$img" -strip -quality 80 "${IMG_DIR}/${name}.webp"
    echo "  ✓ Created WebP version: ${name}.webp"
  fi
  
  # Get new file size
  new_size=$(du -h "$img" | cut -f1)
  echo "  📊 Size: $original_size → $new_size"
done

echo ""
echo "✅ Image optimization complete!"
echo "💡 Don't forget to update image references to use .webp format"
