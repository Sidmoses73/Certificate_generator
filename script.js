document.getElementById('certForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('studentName').value;
    const achievement = document.getElementById('achievement').value;
    const date = new Date(document.getElementById('date').value).toDateString();
  
    document.getElementById('certName').textContent = name;
    document.getElementById('certAchievement').textContent = achievement;
    document.getElementById('certDate').textContent = date;
  
    document.getElementById('certificate').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'inline-block';
  });
  
  document.getElementById('downloadBtn').addEventListener('click', function() {
    const certificate = document.getElementById('certificate');
  
    html2canvas(certificate, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
      // ✅ Fix: Reference jsPDF correctly
      //const pdf = new window.jspdf.jsPDF('landscape', 'mm', 'a4');
      const pdf = new jsPDF('landscape', 'mm', 'a4'); // ✅ No more `window.jspdf.jsPDF`

  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('certificate.pdf');
    });
  });
  