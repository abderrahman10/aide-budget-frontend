'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
        
const Pdf = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const jsonData = [
    { key1: 'value1' },
    { key2: 'value2' },
    // Ajoutez les données JSON nécessaires ici
  ];
  async function GeneratePdf(){
    try {
      const response = await fetch('http://localhost:8081/api/v1/participants/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  
  useEffect(() => {
    if (pdfUrl === '') {
      GeneratePdf();
    }
  }, []);
  return (
    <div>
      {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} frameBorder="0">
          Votre navigateur ne supporte pas les iframes.
        </iframe>
        
      )}
      
    </div>
  );
};

export default Pdf;
