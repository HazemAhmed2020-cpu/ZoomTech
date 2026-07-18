from PIL import Image, ImageDraw

def process_corners(input_path, output_path, bg_color=(15, 23, 42, 255), threshold=240):
    # Open the original image
    img = Image.open(input_path).convert("RGBA")
    
    # We will use ImageDraw.floodfill.
    # The image has a frame, so filling from the corners should only affect the outside.
    # White is usually close to (255, 255, 255, 255).
    width, height = img.size
    
    # Coordinates for corners
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    # floodfill replaces colors connected to the seed point
    # We use a threshold for the white background matching
    for corner in corners:
        ImageDraw.floodfill(img, corner, bg_color, thresh=15)
        
    img.save(output_path, "PNG")

if __name__ == "__main__":
    input_file = r"C:\Users\PC\.gemini\antigravity\brain\aa68548f-86ca-47ef-b371-ade8ccd66c9d\media__1784333639996.png"
    output_file = r"E:\HazemEducation\1sttHighSchool\basic\assets\images\profile_edited.png"
    process_corners(input_file, output_file)
