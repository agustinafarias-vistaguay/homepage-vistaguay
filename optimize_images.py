import os
from PIL import Image

def optimize_image(filepath):
    if "-origin" in filepath:
        return

    filename = os.path.basename(filepath)
    ext = os.path.splitext(filename)[1].lower()

    # 1. SEGURIDAD TOTAL: Los PNG ni se tocan
    if ext == '.png':
        return

    orig_size = os.path.getsize(filepath)
    max_target = 200 * 1024  # Regla madre: 200 KB

    # 2. REGLA MADRE: Si ya pesa <= 200 KB, se ignora
    if orig_size <= max_target:
        print(f"Skipping {filename} (ya es liviana: {orig_size / 1024:.1f} KB)")
        return

    print(f"Optimizing {filepath} ({orig_size / 1024:.1f} KB)...")
    
    with Image.open(filepath) as img:
        img.load()
        temp_path = filepath + ".tmp"
        
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        is_hero = "fondo" in filename.lower()
        max_w = 1920 if is_hero else 1280
        
        current_img = img
        if current_img.width > max_w:
            new_h = int(current_img.height * (max_w / current_img.width))
            current_img = current_img.resize((max_w, new_h), Image.Resampling.LANCZOS)

        quality = 85
        while True:
            current_img.save(temp_path, format='JPEG', quality=quality, optimize=True)
            temp_size = os.path.getsize(temp_path)
            
            if temp_size <= max_target:
                break
                
            if quality > 50:
                quality -= 5
            else:
                # Mantiene un piso estricto de 1000px para no perder nitidez visual
                new_w = int(current_img.width * 0.90)
                if new_w < 1000:
                    break
                new_h = int(current_img.height * 0.90)
                current_img = current_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    if os.path.exists(temp_path):
        try:
            os.replace(temp_path, filepath)
            print(f"  ✓ {filename} optimizada con éxito: {os.path.getsize(filepath) / 1024:.1f} KB\n")
        except PermissionError:
            print(f"  ❌ Cierre la vista previa de {filename} e intente nuevamente.\n")

def main():
    images_dir = "images"
    if not os.path.exists(images_dir):
        return 
        
    for root, dirs, files in os.walk(images_dir):
        for filename in files:
            if filename.lower().endswith(('.jpg', '.jpeg')):
                optimize_image(os.path.join(root, filename))

if __name__ == "__main__":
    main()