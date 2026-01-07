import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import MarginSettings from './components/MarginSettings';
import ProcessButton from './components/ProcessButton';
import ProgressBar from './components/ProgressBar';
import InfoSection from './components/InfoSection';
import SuccessModal from './components/SuccessModal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [marginType, setMarginType] = useState('tpp-default');
  const [customValue, setCustomValue] = useState('375');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleFileSelect = async (file) => {
    try {
      setSelectedFile(file);
      
      // Read and load PDF
      const arrayBuffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer);
      setPdfDoc(doc);
      
      // Set file info
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const pageCount = doc.getPageCount();
      setFileInfo({
        name: file.name,
        size: fileSizeMB,
        pages: pageCount
      });
    } catch (error) {
      alert('Error loading PDF: ' + error.message);
      handleRemoveFile();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPdfDoc(null);
    setFileInfo(null);
    setProgress(0);
    setProgressText('');
  };

  const calculateMargin = (pageWidth) => {
    if (marginType === 'tpp-default') {
      return Math.round(pageWidth * 0.3);
    } else if (marginType === 'custom-pixels') {
      const value = parseFloat(customValue);
      if (isNaN(value) || value < 0) {
        throw new Error('Please enter a valid pixel value (positive number)');
      }
      return Math.round(value);
    } else if (marginType === 'custom-percentage') {
      const value = parseFloat(customValue);
      if (isNaN(value) || value < 0 || value > 100) {
        throw new Error('Please enter a valid percentage (0-100)');
      }
      return Math.round(pageWidth * (value / 100));
    }
    return 0;
  };

  const processPDF = async () => {
    if (!pdfDoc) return;

    try {
      setIsProcessing(true);
      setProgress(10);
      setProgressText('Starting process...');

      // Get first page dimensions
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width: originalWidth } = firstPage.getSize();

      // Calculate margin
      const marginPixels = calculateMargin(originalWidth);
      const newWidth = originalWidth + marginPixels;

      setProgress(30);
      setProgressText('Calculating dimensions...');

      // Create new PDF
      const newPdfDoc = await PDFDocument.create();
      const totalPages = pages.length;

      // Process each page
      for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        // Create new page with increased width
        const newPage = newPdfDoc.addPage([width + marginPixels, height]);

        // Embed the original page
        const [embeddedPage] = await newPdfDoc.embedPdf(pdfDoc, [i]);

        // Draw the embedded page (left-aligned)
        newPage.drawPage(embeddedPage, {
          x: 0,
          y: 0,
          width: width,
          height: height
        });

        // Update progress
        const progressValue = 30 + ((i + 1) / totalPages) * 60;
        setProgress(progressValue);
        setProgressText(`Processing page ${i + 1} of ${totalPages}...`);

        // Allow UI to update
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      setProgress(95);
      setProgressText('Finalizing PDF...');

      // Save the PDF
      const pdfBytes = await newPdfDoc.save();

      setProgress(100);
      setProgressText('Complete!');

      // Create download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedFile.name.replace('.pdf', '_annotated.pdf');
      link.click();
      URL.revokeObjectURL(url);

      // Show success modal
      setModalData({
        pages: totalPages,
        margin: marginPixels,
        originalWidth: originalWidth,
        newWidth: newWidth,
        fileName: link.download
      });
      setShowModal(true);

    } catch (error) {
      alert('Error processing PDF: ' + error.message);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setProgressText('');
      }, 2000);
    }
  };

  const handleProcessAnother = () => {
    setShowModal(false);
    handleRemoveFile();
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <main className="main-content">
          <FileUpload
            selectedFile={selectedFile}
            fileInfo={fileInfo}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
          />

          <MarginSettings
            marginType={marginType}
            customValue={customValue}
            onMarginTypeChange={setMarginType}
            onCustomValueChange={setCustomValue}
          />

          <ProcessButton
            disabled={!selectedFile || isProcessing}
            isProcessing={isProcessing}
            onClick={processPDF}
          />

          <ProgressBar
            show={isProcessing}
            progress={progress}
            text={progressText}
          />

          <InfoSection />
        </main>

        <Footer />
      </div>

      <SuccessModal
        show={showModal}
        data={modalData}
        onClose={() => setShowModal(false)}
        onProcessAnother={handleProcessAnother}
      />
    </div>
  );
}

export default App;