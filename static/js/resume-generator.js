document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const previewContent = document.getElementById('previewContent');
    const downloadButton = document.getElementById('downloadResume');

    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateResumePreview();
    });

    downloadButton.addEventListener('click', downloadResumePDF);

    function generateResumePreview() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;

        const previewHTML = `
            <h3>${fullName}</h3>
            <p>Email: ${email}</p>
            
            <h4>Education</h4>
            <p>${education}</p>
            
            <h4>Experience</h4>
            <p>${experience}</p>
            
            <h4>Skills</h4>
            <p>${skills}</p>
        `;

        previewContent.innerHTML = previewHTML;
        resumePreview.style.display = 'block';
    }

    function downloadResumePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;

        doc.text('Resume', 10, 10);
        doc.text(`Name: ${fullName}`, 10, 20);
        doc.text(`Email: ${email}`, 10, 30);
        doc.text('Education:', 10, 40);
        doc.text(education, 10, 50);
        doc.text('Experience:', 10, 70);
        doc.text(experience, 10, 80);
        doc.text('Skills:', 10, 100);
        doc.text(skills, 10, 110);

        doc.save(`${fullName}_resume.pdf`);
    }
});