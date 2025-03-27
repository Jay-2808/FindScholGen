from flask import Flask, render_template, request, jsonify
import sqlite3
import json

app = Flask(__name__)

# Database initialization
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Create users table
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY, 
                  name TEXT, 
                  email TEXT, 
                  education_level TEXT, 
                  interests TEXT)''')
    
    # Create scholarships table
    c.execute('''CREATE TABLE IF NOT EXISTS scholarships
                 (id INTEGER PRIMARY KEY,
                  name TEXT,
                  amount REAL,
                  eligibility TEXT,
                  deadline DATE)''')
    
    conn.commit()
    conn.close()

# Sample data insertion
def insert_sample_data():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Sample scholarships
    scholarships = [
        ('STEM Excellence Scholarship', 5000, 'STEM students with 3.5+ GPA', '2024-12-31'),
        ('Diversity in Tech Grant', 7500, 'Underrepresented groups in tech', '2024-11-15'),
        ('Community Leadership Award', 3000, 'Active community volunteers', '2024-10-20')
    ]
    
    c.executemany('''INSERT OR IGNORE INTO scholarships 
                     (name, amount, eligibility, deadline) 
                     VALUES (?, ?, ?, ?)''', scholarships)
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    # Fetch user scholarships and stats
    return render_template('dashboard.html')

@app.route('/search-scholarships')
def search_scholarships():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    scholarships = c.execute('SELECT * FROM scholarships').fetchall()
    conn.close()
    
    return render_template('scholarship-search.html', scholarships=scholarships)

@app.route('/generate-resume', methods=['GET', 'POST'])
def generate_resume():
    # Resume generation logic
    return render_template('resume-generator.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == '__main__':
    init_db()
    insert_sample_data()
    app.run(debug=True)