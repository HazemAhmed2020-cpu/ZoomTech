from PIL import Image

def remove_white_background(img_path, output_path, tolerance=50):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Change all white (also shades of white) pixels to transparent
        # item is (R, G, B, A)
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_background("assets/images/profile.png", "assets/images/profile_transparent.png")
