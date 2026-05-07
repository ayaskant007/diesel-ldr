import os
from PIL import Image

def process_images():
    base_dir = r"c:\Users\ayask\Downloads\Innovatrix\diesel-ldr\public\images\products"
    
    # Grid Image
    grid_path = os.path.join(base_dir, "WhatsApp Image 2026-05-07 at 22.58.01.jpeg")
    if os.path.exists(grid_path):
        img = Image.open(grid_path)
        width, height = img.size
        # 4 columns, 2 rows
        col_w = width // 4
        row_h = height // 2
        
        idx = 1
        for r in range(2):
            for c in range(4):
                left = c * col_w
                top = r * row_h
                right = left + col_w
                bottom = top + row_h
                
                cropped = img.crop((left, top, right, bottom))
                cropped.save(os.path.join(base_dir, f"beauty_{idx}.jpg"))
                idx += 1
        print("Grid split into 8 images.")

    # Content Images to Crop (right side content)
    right_crops = [
        ("Screenshot 2026-05-08 005607.png", "hoodie_1.jpg", 0.3), # crop out left 30%
        ("Screenshot 2026-05-08 005643.png", "jeans_1.jpg", 0.28),
        ("Screenshot 2026-05-08 005740.png", "tee_1.jpg", 0.0), # Assuming t-shirt doesn't need crop based on layout? Let's check. Actually standard crop out left 25%? Wait, let's keep all 0.28.
        ("Screenshot 2026-05-08 005800.png", "tee_2.jpg", 0.0), 
        ("Screenshot 2026-05-08 005815.png", "tee_3.jpg", 0.0),
        ("Screenshot 2026-05-08 005832.png", "hoodie_2.jpg", 0.0),
    ]
    
    # Left Crops (perfume with text on right)
    left_crops = [
        ("WhatsApp Image 2026-05-07 at 22.59.24.jpeg", "perfume_velvet.jpg", 0.45) # Keep left 55%
    ]

    for fname, outname, left_factor in right_crops:
        path = os.path.join(base_dir, fname)
        if os.path.exists(path):
            img = Image.open(path)
            w, h = img.size
            if left_factor > 0:
                crop = img.crop((int(w*left_factor), 0, w, h))
            else:
                crop = img.crop((int(w*0.28), 0, w, h))
            crop.convert('RGB').save(os.path.join(base_dir, outname))
            print(f"Cropped {fname} to {outname}")

    for fname, outname, right_factor in left_crops:
        path = os.path.join(base_dir, fname)
        if os.path.exists(path):
            img = Image.open(path)
            w, h = img.size
            crop = img.crop((0, 0, int(w*(1.0-right_factor)), h))
            crop.convert('RGB').save(os.path.join(base_dir, outname))
            print(f"Cropped {fname} to {outname}")
            
    # Copy uncropped images with better names
    import shutil
    mapping = {
        "Screenshot 2026-05-08 005658.png": "jeans_2.jpg",
        "Screenshot 2026-05-08 005724.png": "perfume_born_to_die.jpg", # Centered text, no crop needed
        "WhatsApp Image 2026-05-07 at 22.58.46.jpeg": "perfume_highway.jpg" # Centered text
    }
    
    for fname, outname in mapping.items():
        path = os.path.join(base_dir, fname)
        if os.path.exists(path):
            print(f"Copying {fname} to {outname} (converting to jpeg)")
            Image.open(path).convert('RGB').save(os.path.join(base_dir, outname))

if __name__ == '__main__':
    process_images()
