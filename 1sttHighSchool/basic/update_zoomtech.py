import os

def update_files():
    base_dir = r"E:\HazemEducation\1sttHighSchool\basic"
    files_to_update = ["index.html", "chatbot.js", "questions.js"]
    
    for filename in files_to_update:
        path = os.path.join(base_dir, filename)
        if not os.path.exists(path): continue
        
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Global replace of zomTech to ZoomTech
        content = content.replace("zomTech", "ZoomTech")
        content = content.replace("zomtech", "ZoomTech")
        
        # Specific HTML update for the profile image and name
        if filename == "index.html":
            old_hero = '''            <div class="hero-image">
                <img src="assets/images/profile_edited.png" alt="ZoomTech Profile" class="floating-img profile-img" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            </div>'''
            
            new_hero = '''            <div class="hero-image floating-img" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <img src="assets/images/profile_edited.png" alt="ZoomTech Profile" class="profile-img" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; max-width: 350px;">
                <div class="profile-name" style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9)); padding: 10px 30px; border-radius: 50px; border: 1px solid var(--secondary); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4); font-weight: bold; font-size: 1.3rem; color: #fff; text-align: center;">
                    المهندس/ حازم احمد اسماعيل
                </div>
            </div>'''
            content = content.replace(old_hero, new_hero)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
            
    print("Files updated successfully.")

if __name__ == "__main__":
    update_files()
