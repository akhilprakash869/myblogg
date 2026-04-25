import re

file_path = '/home/akhilprakash/Documents/myblog/content/posts/amruthavarshini-review.mdx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update Malayalam Headers
content = re.sub(r'11\. വരു തിരുവോണമേ', '11. വരൂ, തിരുവോണമേ', content)
content = re.sub(r'15\. ഊട്ടടിയൻ', '15. ഊട്ടുടിയൻ', content)
content = re.sub(r'19\. കാലമിനിയുമുരുളും, വിഷു വരും(?![\.])', '19. കാലമിനിയുമുരുളും, വിഷു വരും....', content)

# Update English Headers
content = re.sub(r'### 11\. Varu Thiruvoname', '### 11. Varoo, Thiruvoname', content)
content = re.sub(r'### 15\. Oottadiyan', '### 15. Oottudiyan', content)
content = re.sub(r'### 19\. Kalaminiyumurulum, Vishu Varum \([^)]+\)', '### 19. Kalaminiyumurulum, Vishu Varum.... (Time Will Roll On, Vishu Will Come)', content)
# Ensure Budham Sharanam Gachami is perfectly consistent.
content = re.sub(r'### 26\. Buddham Sharanam Gachami', '### 26. Buddham Sharanam Gachami', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Titles updated successfully!')
