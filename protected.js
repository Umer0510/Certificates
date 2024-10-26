const folderSelect = document.getElementById('folderSelect');
const fileSelect = document.getElementById('fileSelect');
const downloadBtn = document.getElementById('downloadBtn');

// Replace with your Apps Script web app URL
const sheetUrl = 'https://script.google.com/macros/s/AKfycbxmvILtzf2n1Nv8YtiMb9QX2WzqDh0lfZ5Avfh0RV7p2ySlv0ITasP2QT9xzFVRp_8s/exec';

async function fetchFolders() {
  const response = await fetch(`${sheetUrl}?action=getFolders`);
  const folders = await response.json();
  folders.forEach(folder => {
    const option = document.createElement('option');
    option.value = folder.id;
    option.textContent = folder.name;
    folderSelect.appendChild(option);
  });
}

async function fetchFiles(folderId) {
  fileSelect.innerHTML = '<option value="">--Select File--</option>'; // Reset files
  const response = await fetch(`${sheetUrl}?action=getFiles&folderId=${folderId}`);
  const files = await response.json();
  files.forEach(file => {
    const option = document.createElement('option');
    option.value = file.url;
    option.textContent = file.name;
    fileSelect.appendChild(option);
  });
}

folderSelect.addEventListener('change', () => {
  const folderId = folderSelect.value;
  if (folderId) {
    fetchFiles(folderId);
  } else {
    fileSelect.innerHTML = '<option value="">--Select File--</option>';
  }
});

downloadBtn.addEventListener('click', () => {
  const fileUrl = fileSelect.value;
  if (fileUrl) {
    window.open(fileUrl, '_blank');
    window.location.href = 'index.html'; 
  } else {
    alert('Please select a file to download.');
  }
});


fetchFolders();

