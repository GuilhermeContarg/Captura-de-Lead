
import { Lead } from "../types";

export const exportToCSV = (leads: Lead[], filename: string) => {
  const headers = [
    "Business Name",
    "Legal Name",
    "Email",
    "Phone",
    "Has WhatsApp",
    "Website",
    "Address",
    "Niche",
    "Relevance Score",
    "Confidence"
  ];

  const rows = leads.map(lead => [
    `"${lead.businessName.replace(/"/g, '""')}"`,
    `"${(lead.legalName || "").replace(/"/g, '""')}"`,
    lead.email,
    lead.phone,
    lead.hasWhatsApp ? "Yes" : "No",
    lead.website,
    `"${lead.address.replace(/"/g, '""')}"`,
    lead.niche,
    lead.relevanceScore,
    lead.confidence
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
