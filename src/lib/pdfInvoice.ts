/**
 * Client-Side PDF Invoice Generator for VITRAG Tableware & Gifting
 * Generates valid standard PDF-1.4 documents without heavy external dependencies.
 */

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: string;
  status: string;
  customerName?: string;
  customerCompany?: string;
  gstin?: string;
}

export function generateInvoicePdf(invoice: InvoiceData): Blob {
  const customerName = invoice.customerName || "Corporate Patron";
  const customerCompany = invoice.customerCompany || "Luxury Hospitality Client";
  const gstin = invoice.gstin || "33AAAPV1234F1Z8";

  // Build PDF stream text
  const streamLines = [
    "BT",
    "/F1 22 Tf",
    "50 730 Td (VITRAG TABLEWARE & GIFTING) Tj",
    "/F2 9 Tf",
    "0 -18 Td (Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai, Tamil Nadu 600001) Tj",
    "0 -13 Td (GSTIN: " + gstin + " | Email: pranathwork@gmail.com | Phone: +91 63691 42027) Tj",
    "/F1 16 Tf",
    "0 -36 Td (TAX INVOICE / RECEIPT) Tj",
    "/F2 10 Tf",
    "0 -22 Td (Invoice Number: " + invoice.invoiceNumber + "          Date: " + invoice.date + ") Tj",
    "0 -16 Td (Billed To: " + customerName + " - " + customerCompany + ") Tj",
    "0 -16 Td (Payment Destination: UPI 9840610405@pthdfc / HDFC Corporate) Tj",
    "0 -16 Td (Status: " + invoice.status.toUpperCase() + " / VERIFIED) Tj",
    "/F1 12 Tf",
    "0 -30 Td (DESCRIPTION                                                        AMOUNT) Tj",
    "/F2 10 Tf",
    "0 -20 Td (" + invoice.description + "                    INR " + invoice.amount + ") Tj",
    "0 -16 Td (Complimentary Fragile Transit Insurance Included                         INR 0.00) Tj",
    "0 -16 Td (Luxury Burgundy Gift Packaging Included                                   INR 0.00) Tj",
    "/F1 12 Tf",
    "0 -28 Td (TOTAL PAID: INR " + invoice.amount + ") Tj",
    "/F2 9 Tf",
    "0 -28 Td (Important Notice: Unboxing video required for transit breakage replacement claim.) Tj",
    "0 -14 Td (Thank you for partnering with VITRAG Tableware & Gifting, Chennai.) Tj",
    "ET",
  ];

  const streamContent = streamLines.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  const pdfParts = [
    "%PDF-1.4\n",
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj\n",
    `4 0 obj << /Length ${streamLength} >> stream\n`,
    streamContent,
    "\nendstream endobj\n",
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj\n",
    "6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
  ];

  // Calculate object offsets
  let offset = 0;
  const offsets: number[] = [0];
  
  // Header
  offset += Buffer.byteLength(pdfParts[0], "utf-8");
  
  for (let i = 1; i < pdfParts.length; i++) {
    offsets.push(offset);
    offset += Buffer.byteLength(pdfParts[i], "utf-8");
  }

  const xrefOffset = offset;
  let xref = `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }

  const trailer = `trailer << /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  
  const fullContent = pdfParts.join("") + xref + trailer;
  return new Blob([fullContent], { type: "application/pdf" });
}

export function downloadInvoicePdf(invoice: InvoiceData) {
  const blob = generateInvoicePdf(invoice);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Vitrag-Invoice-${invoice.invoiceNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
