import pdfplumber


# Function to extract text from PDF file
def extract_text_from_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to search for skills in the text
def search_skills(text, skills):
    found_skills = []
    for skill in skills:
        if skill.lower() in text.lower():
            found_skills.append(skill)
    return found_skills

# Main function to handle file upload, skill input, and skill search
def process_resume():
    # Upload the resume
    pdf_file_path = input("Enter the path to the PDF resume file: ")

    # Extract text from the resume
    text = extract_text_from_pdf(pdf_file_path)

    # Ask user for skills to search for
    num_skills = int(input("How many different skills are you looking for in the resume? "))
    skills = [input("Enter skill {}: ".format(i+1)) for i in range(num_skills)]
    
    # Search for skills in the resume text
    found_skills = search_skills(text, skills)

    return found_skills

if __name__ == "__main__":
    found_skills = process_resume()
    print('Found skills:', found_skills)
