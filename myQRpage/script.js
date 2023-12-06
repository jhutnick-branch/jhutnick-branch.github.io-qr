document.getElementById('generateQRButton').addEventListener('click', function() {
    var qrCodeSettings = {
        "code_color":"#000000",
        "background_color": "#FFFFFF",
        "margin": 5,
        "width": 1000,
        "image_format": "png"
    };
    var qrCodeLinkData = {
        tags: [ 'Web SDK tag1', 'Web SDK tag2' ],
        channel: 'myQRpage',
        feature: 'Web SDK',
        campaign: 'my Web SDK QR code test',
        data: {
            mydata: 'bar',
            '$desktop_url': 'https://eperez-branch.github.io/',
            '$ios_url': 'https://help.branch.io/using-branch/docs/creating-a-deep-link#redirections'            
        }
    };
    
    // Call API to generate the QR code
    branch.qrCode(qrCodeLinkData, qrCodeSettings, function(err, qrCode) {
        if (err) {
            console.error('Error generating QR Code:', err);
            return;
        }
        var img = document.createElement('img');
        img.src = 'data:image/png;charset=utf-8;base64,' + qrCode.base64();
        img.width = 500; // Set width for the QR code image
        img.height = 500; // Set height for the QR code image

        var container = document.getElementById('qrCodeContainer');
        container.innerHTML = ''; // Clear existing content
        container.appendChild(img); // Add the new QR code image

         // Show the download button
        var downloadButton = document.getElementById('downloadQRButton');
        downloadButton.style.display = 'block';

        // Set the download attribute for the download button
        downloadButton.addEventListener('click', function() {
            downloadImage(img.src, 'qr-code.png');
        });
    });
});

function downloadImage(dataUrl, filename) {
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
