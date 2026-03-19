from PIL import Image, ImageDraw
import sys

# Create frames
frames = []
for i in range(10):
    img = Image.new('RGB', (100, 100), color=(i*25, 100, 200))
    d = ImageDraw.Draw(img)
    d.text((20, 40), f"Frame {i}", fill=(255, 255, 255))
    frames.append(img)

# Save as GIF
frames[0].save('test_anim.gif', save_all=True, append_images=frames[1:], duration=100, loop=0)
print("GIF created successfully.")
