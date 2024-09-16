import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

document.getElementById('generateResume')?.addEventListener('click', async () => {
    // Retrieve form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Create resume content
    const resumeContent = `
        <h1>Name:</h1>
        <p>${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h2>Education:</h2>
        <p>${education}</p>
        <h2>Experience:</h2>
        <p>${experience}</p>
        <h2>Skills:</h2>
        <p>${skills}</p>
    `;

    // Update the resume preview div
    const resumeDiv = document.getElementById('resumeContent')!;
    resumeDiv.innerHTML = resumeContent;
    document.getElementById('resumePreview')?.classList.remove('hidden');

    // Convert HTML content to canvas
    const canvas = await html2canvas(resumeDiv);
    const imgData = canvas.toDataURL('image/png');

    // Generate a PDF
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 0); // Adjust position and size as needed

    const pdfFileName = `${name.replace(/\s+/g, '_')}-resume.pdf`; // Replace spaces with underscores
    pdf.save(pdfFileName);

    // Generate a unique path and create a shareable link
    const uniquePath = `resume-${Math.random().toString(36).substr(2, 9)}`;
    const shareableLink = `${window.location.origin}/${uniquePath}`;

    const resumeLinkElement = document.getElementById('resumeLink') as HTMLAnchorElement;
    resumeLinkElement.href = shareableLink;
    resumeLinkElement.textContent = shareableLink;
    document.getElementById('generatedLink')?.classList.remove('hidden');
});
