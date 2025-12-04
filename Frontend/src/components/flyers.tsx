import jsPDF from "jspdf";
import "../assets/fonts/instrument-sans.js";

export function omegaFlyers() {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const margin = 40;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFillColor("#1e40af");
  doc.rect(0, 0, pageWidth, 150, "F");
  
  doc.setFillColor("#0ea972");
  doc.rect(0, 0, pageWidth, 20, "F");
  
  doc.setFillColor("#facc15");
  doc.rect(0, 20, 15, 130, "F");

  doc.setTextColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(36);
  doc.text("Omega School", margin, 70);
  
  doc.setFontSize(28);
  doc.text("Madagascar", margin, 105);

  doc.setFillColor("#facc15");
  doc.circle(pageWidth - 80, 75, 35, "F");
  doc.setFillColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(24);
  doc.text("Ω", pageWidth - 88, 85);

  let y = 190;
  doc.setFillColor("#D9D9D9");
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 100, 10, 10, "F");
  
  doc.setTextColor("#1e40af");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(18);
  doc.text("Former • Inspirer • Élever", margin + 20, y + 35);
  
  doc.setTextColor("#3A3A3A");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(13);
  doc.text(
    "Une école moderne tournée vers l'excellence",
    margin + 20,
    y + 65,
    { maxWidth: pageWidth - 2 * margin - 40 }
  );

  y = 330;
  doc.setFillColor("#0ea972");
  doc.rect(margin - 10, y, 5, 30, "F");
  
  doc.setTextColor("#0ea972");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(22);
  doc.text("Mot de la Direction", margin, y + 20);

  y += 50;
  doc.setTextColor("#3A3A3A");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(12);
  doc.text(
    "À Omega School, nous croyons que chaque enfant possède un potentiel unique. " +
    "Nous offrons un environnement éducatif moderne et stimulant, basé sur l'excellence, " +
    "la discipline, l'innovation et la bienveillance.",
    margin,
    y,
    { maxWidth: pageWidth - 2 * margin, lineHeightFactor: 1.5 }
  );

  y = 500;
  const boxWidth = (pageWidth - 2 * margin - 40) / 3;
  
  const stats = [
    { value: "100%", label: "Excellence", color: "#0ea972" },
    { value: "15+", label: "Activités", color: "#1e40af" },
    { value: "10+", label: "Enseignants", color: "#facc15" }
  ];

  stats.forEach((stat, i) => {
    const x = margin + i * (boxWidth + 20);
    doc.setFillColor("#facc15");
    doc.roundedRect(x, y, boxWidth, 90, 8, 8, "F");
    
    doc.setTextColor("#fff");
    doc.setFont("Instrument Sans", "normal");
    doc.setFontSize(32);
    doc.text(stat.value, x + boxWidth / 2, y + 45, { align: "center" });
    
    doc.setFontSize(11);
    doc.setFont("Instrument Sans", "normal");
    doc.text(stat.label, x + boxWidth / 2, y + 70, { align: "center" });
  });

  y = pageHeight - 80;
  doc.setFillColor("#1e40af");
  doc.rect(0, y, pageWidth, 80, "F");
  
  doc.setFillColor("#facc15");
  doc.circle(50, y + 40, 8, "F");
  doc.circle(pageWidth - 50, y + 40, 8, "F");
  
  doc.setTextColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(14);
  doc.text("Inscriptions ouvertes pour l'année 2024-2025", pageWidth / 2, y + 45, { align: "center" });

  doc.addPage();
  y = margin;

  doc.setFillColor("#0ea972");
  doc.rect(0, 0, pageWidth, 80, "F");
  
  doc.setFillColor("#facc15");
  doc.rect(0, 80, pageWidth, 5, "F");
  
  doc.setTextColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(28);
  doc.text("Nos Programmes", margin, 55);

  y = 120;

  doc.setFillColor("#1e40af");
  doc.roundedRect(margin - 5, y, 10, 10, 2, 2, "F");
  
  doc.setTextColor("#1e40af");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(18);
  doc.text("Cycle Collège", margin + 15, y + 8);

  y += 30;
  doc.setTextColor("#3A3A3A");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(11);

  const cycleCollege = [
    "Mathématiques",
    "Sciences & Vie de la Terre",
    "Physique-Chimie",
    "Français (orthographe & littérature)",
    "Anglais intensif",
    "Histoire-Géographie",
    "Informatique & culture numérique",
    "Éducation civique",
    "Arts plastiques & musique"
  ];

  cycleCollege.forEach((item) => {
    doc.setFillColor("");
    doc.circle(margin + 5, y + 5, 3, "F");
    
    doc.setTextColor("#3A3A3A");
    doc.text(item, margin + 20, y + 8);
    y += 20;
  });

  y += 20;
  doc.setFillColor("#D9D9D9");
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 200, 10, 10, "F");
  
  doc.setFillColor("#facc15");
  doc.roundedRect(margin, y, 8, 200, 4, 4, "F");

  doc.setTextColor("#1e40af");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(18);
  doc.text("Clubs & Activités Parascolaires", margin + 25, y + 30);

  y += 55;
  doc.setTextColor("#3A3A3A");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(11);

  const clubs = [
    "Club Robotique",
    "Club Scientifique",
    "Club Arts & Création",
    "Club Lecture",
    "Sports (basket, foot, athlétisme)",
    "Ateliers de développement personnel"
  ];

  const cols = 2;
  const colWidth = (pageWidth - 2 * margin - 50) / cols;
  
  clubs.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = margin + 25 + col * colWidth;
    const currentY = y + row * 25;
    
    doc.setFillColor("#0ea972");
    doc.circle(x + 5, currentY + 5, 2.5, "F");
    doc.text(item, x + 15, currentY + 8);
  });
  doc.addPage();

  doc.setFillColor("#1e40af");
  doc.rect(0, 0, pageWidth, 80, "F");
  
  doc.setFillColor("#0ea972");
  doc.rect(0, 80, pageWidth, 5, "F");
  
  doc.setTextColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(26);
  doc.text("Pourquoi choisir Omega School ?", margin, 55);

  y = 130;

  const reasons = [
    { icon: "✓", text: "Enseignement moderne et adapté au monde d'aujourd'hui" },
    { icon: "✓", text: "Suivi personnalisé de chaque élève" },
    { icon: "✓", text: "Approche innovante : numérique + robotique" },
    { icon: "✓", text: "Discipline et valeurs fortes" },
    { icon: "✓", text: "Forte progression des élèves" },
    { icon: "✓", text: "Équipe passionnée et expérimentée" }
  ];

  reasons.forEach((r) => {
    doc.setFillColor("#D9D9D9");
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 50, 8, 8, "F");
    
    doc.setFillColor("#0ea972");
    doc.circle(margin + 25, y + 25, 12, "F");
    doc.setTextColor("#fff");
    doc.setFont("Instrument Sans", "normal");
    doc.setFontSize(16);
    doc.text(r.icon, margin + 20, y + 31);
    
    doc.setTextColor("#3A3A3A");
    doc.setFont("Instrument Sans", "normal");
    doc.setFontSize(11);
    doc.text(r.text, margin + 50, y + 28, { maxWidth: pageWidth - 2 * margin - 70 });
    
    y += 60;
  });

  y += 30;
  doc.setFillColor("#facc15");
  doc.roundedRect(margin - 10, y - 10, pageWidth - 2 * margin + 20, 180, 15, 15, "F");

  doc.setTextColor("#1e40af");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(24);
  doc.text("Contactez-nous", margin + 10, y + 15);

  y += 45;
  doc.setTextColor("#3A3A3A");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(12);

  const contacts = [
    { text: "Campus Omega, Lot 100, Antananarivo, Madagascar" },
    { text: "+261 34 10 478 94" },
    { text: "opendevalpha@gmail.com" },
    { text: "Site web : Très bientôt - #Restez connectés" }
  ];

  contacts.forEach((c) => {
    doc.text("-", margin, y);
    doc.setFont("Instrument Sans", "normal");
    doc.text(c.text, margin + 35, y);
    y += 25;
  });

  doc.setFillColor("#1e40af");
  doc.rect(0, pageHeight - 60, pageWidth, 60, "F");
  
  doc.setTextColor("#fff");
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(16);
  doc.text("L'excellence commence ici", pageWidth / 2, pageHeight - 30, { align: "center" });
  
  doc.setFont("Instrument Sans", "normal");
  doc.setFontSize(10);
  doc.text("Omega School Madagascar © 2025", pageWidth / 2, pageHeight - 15, { align: "center" });

  doc.save("Brochure-OmegaSchool-Styled.pdf");
}