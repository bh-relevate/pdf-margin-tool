import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Banner from './components/Banner';
import Header from './components/Header';
import Masthead from './components/Masthead';
import FileUpload from './components/FileUpload';
import MarginSettings from './components/MarginSettings';
import ProcessButton from './components/ProcessButton';
import ProgressBar from './components/ProgressBar';
import PrivacyNotice from './components/PrivacyNotice';
import SuccessModal from './components/SuccessModal';
import WelcomeGuide, { hasSeenGuide, markGuideSeen } from './components/WelcomeGuide';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [marginType, setMarginType] = useState('custom-pixels');
  const [customValue, setCustomValue] = useState('375');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);
  const [marginError, setMarginError] = useState(null);
  const [showGuide, setShowGuide] = useState(() => !hasSeenGuide());

  const handleCloseGuide = () => {
    markGuideSeen();
    setShowGuide(false);
  };

  const clearErrors = () => {
    setError(null);
    setMarginError(null);
  };

  const handleFileSelect = async (file) => {
    try {
      clearErrors();
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
      handleRemoveFile();
      setError('Error loading PDF: ' + error.message);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPdfDoc(null);
    setFileInfo(null);
    setProgress(0);
    setProgressText('');
    clearErrors();
  };

  const handleMarginTypeChange = (type) => {
    clearErrors();
    setMarginType(type);
  };

  const handleCustomValueChange = (value) => {
    clearErrors();
    setCustomValue(value);
  };

  const validateMargin = () => {
    const value = parseFloat(customValue);
    if (marginType === 'custom-pixels' && (isNaN(value) || value < 0)) {
      return 'Please enter a valid pixel value (positive number)';
    }
    if (marginType === 'custom-percentage' && (isNaN(value) || value < 0 || value > 100)) {
      return 'Please enter a valid percentage (0-100)';
    }
    return null;
  };

  const calculateMargin = (pageWidth) => {
    if (marginType === 'tpp-default') {
      return Math.round(pageWidth * 0.3);
    } else if (marginType === 'custom-pixels') {
      return Math.round(parseFloat(customValue));
    } else if (marginType === 'custom-percentage') {
      return Math.round(pageWidth * (parseFloat(customValue) / 100));
    }
    return 0;
  };

  const processPDF = async () => {
    if (!pdfDoc) return;

    clearErrors();
    const invalidMargin = validateMargin();
    if (invalidMargin) {
      setMarginError(invalidMargin);
      setError('Check the margin value before processing.');
      return;
    }

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
      setError('Error processing PDF: ' + error.message);
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
      <Header />

      <main className="main-content">
        <Masthead />

        <div className="form-stack">
          {error && <Banner status="error">{error}</Banner>}

          <FileUpload
            selectedFile={selectedFile}
            fileInfo={fileInfo}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            onError={setError}
          />

          <MarginSettings
            marginType={marginType}
            customValue={customValue}
            marginError={marginError}
            onMarginTypeChange={handleMarginTypeChange}
            onCustomValueChange={handleCustomValueChange}
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

          <PrivacyNotice />
        </div>

        <Footer onHelp={() => setShowGuide(true)} />
      </main>

      <WelcomeGuide open={showGuide} onClose={handleCloseGuide} />

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