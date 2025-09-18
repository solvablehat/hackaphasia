# Medical Report Simplifier

A Next.js application that converts complex medical reports into easy-to-understand summaries using AI-powered text processing.

## 🎯 Overview

This application helps patients and healthcare providers by transforming complex medical terminology and reports into simplified, readable format. Users can upload PDF medical reports and receive clear, understandable summaries.

## 🚀 Features

- **PDF Upload**: Secure file upload for medical reports
- **Text Extraction**: Automatic text extraction from PDF documents
- **AI Simplification**: Converts medical jargon into plain language
- **Progress Tracking**: Real-time processing status updates
- **Download Results**: Save simplified reports as downloadable files
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

For a detailed view of how the application works, see our [Project Workflow Diagram](./mermaid-diagram.md).

### Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **PDF Processing**: PDF.js
- **File Handling**: Multipart form data processing
- **AI/NLP**: Text simplification service
- **Storage**: Local file system (configurable)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser with JavaScript enabled

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-report-simplifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=application/pdf
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗂️ Project Structure

```
medical-report-simplifier/
├── pages/
│   ├── api/
│   │   ├── upload.js          # File upload endpoint
│   │   ├── status/[id].js     # Processing status
│   │   └── download/[id].js   # File download
│   ├── index.js               # Main upload page
│   └── results/[id].js        # Results display
├── components/
│   ├── UploadForm.js          # File upload component
│   ├── ProgressBar.js         # Progress indicator
│   └── ResultsDisplay.js      # Results viewer
├── services/
│   ├── pdfProcessor.js        # PDF text extraction
│   ├── textSimplifier.js      # AI text processing
│   └── fileStorage.js         # File management
├── styles/
│   └── globals.css            # Global styles
├── public/
│   └── ...                    # Static assets
├── mermaid-diagram.md         # Project workflow diagram
└── README.md                  # This file
```

## 🔧 API Endpoints

### Upload PDF
```
POST /api/upload
Content-Type: multipart/form-data
Body: { file: PDF file }
Response: { id: string, status: 'processing' }
```

### Check Status
```
GET /api/status/:id
Response: { status: 'processing' | 'completed' | 'error', progress: number }
```

### Download Result
```
GET /api/download/:id
Response: Simplified report file
```

## 🎮 Usage

1. **Upload a Medical Report**
   - Click "Choose File" or drag & drop a PDF
   - Supported formats: PDF files up to 10MB
   - Click "Upload and Simplify"

2. **Monitor Progress**
   - View real-time processing status
   - Progress bar shows completion percentage
   - Estimated time remaining displayed

3. **Review Results**
   - View simplified report on results page
   - Compare original vs simplified text
   - Download simplified version as PDF/text

4. **Download or Share**
   - Download simplified report
   - Share results link (if enabled)
   - Print-friendly format available

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 📊 Performance

- **File Processing**: ~2-5 seconds for typical medical reports
- **Supported File Size**: Up to 10MB
- **Concurrent Users**: Optimized for multiple simultaneous uploads
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+

## 🔒 Security

- File type validation (PDF only)
- File size limits enforced
- Temporary file cleanup
- No persistent storage of sensitive data
- HTTPS recommended for production

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t medical-report-simplifier .
docker run -p 3000:3000 medical-report-simplifier
```

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Maximum upload size in bytes | `10485760` (10MB) |
| `ALLOWED_FILE_TYPES` | Comma-separated MIME types | `application/pdf` |
| `AI_SERVICE_URL` | External AI service endpoint | - |
| `STORAGE_PATH` | File storage directory | `./uploads` |

## 🐛 Troubleshooting

### Common Issues

**PDF Upload Fails**
- Check file size (max 10MB)
- Ensure file is a valid PDF
- Try a different PDF file

**Processing Stuck**
- Refresh the page
- Check browser console for errors
- Verify PDF is not password-protected

**Download Not Working**
- Check if processing completed
- Clear browser cache
- Try different browser

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: Report bugs on GitHub Issues
- **Documentation**: See [Project Workflow](./mermaid-diagram.md)
- **Email**: support@medical-simplifier.com

## 🙏 Acknowledgments

- PDF.js team for PDF processing capabilities
- Next.js team for the excellent framework
- Medical professionals who provided feedback
- Open source community for various libraries

---

**Version**: 1.0.0  
**Last Updated**: 2024