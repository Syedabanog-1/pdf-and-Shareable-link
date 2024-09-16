"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = __importDefault(require("jspdf"));
const html2canvas_1 = __importDefault(require("html2canvas"));
document.getElementById('generateResume')?.addEventListener('click', async () => {
    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
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
    const resumeDiv = document.getElementById('resumeContent');
    resumeDiv.innerHTML = resumeContent;
    document.getElementById('resumePreview')?.classList.remove('hidden');
    // Convert HTML content to canvas
    const canvas = await (0, html2canvas_1.default)(resumeDiv);
    const imgData = canvas.toDataURL('image/png');
    // Generate a PDF
    const pdf = new jspdf_1.default();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 0); // Adjust position and size as needed
    const pdfFileName = `${name.replace(/\s+/g, '_')}-resume.pdf`; // Replace spaces with underscores
    pdf.save(pdfFileName);
    // Generate a unique path and create a shareable link
    const uniquePath = `resume-${Math.random().toString(36).substr(2, 9)}`;
    const shareableLink = `${window.location.origin}/${uniquePath}`;
    const resumeLinkElement = document.getElementById('resumeLink');
    resumeLinkElement.href = shareableLink;
    resumeLinkElement.textContent = shareableLink;
    document.getElementById('generatedLink')?.classList.remove('hidden');
});
