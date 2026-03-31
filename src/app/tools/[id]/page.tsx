import React from 'react';
import { notFound, redirect } from 'next/navigation';
import WaterTracker from '@/features/water/WaterTracker';
import JsonFormatter from '@/features/json/JsonFormatter';
import TimestampConverter from '@/features/timestamp/TimestampConverter';
import Base64Converter from '@/features/base64/Base64Converter';
import Calculator from '@/features/calculator/Calculator';
import UnitConverter from '@/features/unit/UnitConverter';
import TranslationTool from '@/features/translation/TranslationTool';
import UuidGenerator from '@/features/uuid/UuidGenerator';
import Md5Hash from '@/features/md5/Md5Hash';
import UrlEncoder from '@/features/url/UrlEncoder';
import QrGenerator from '@/features/qr/QrGenerator';
import PasswordGenerator from '@/features/password/PasswordGenerator';
import WordCount from '@/features/word/WordCount';
import MarkdownPreview from '@/features/markdown/MarkdownPreview';
import FileEncrypt from '@/features/encrypt/FileEncrypt';
import FileCompress from '@/features/compress/FileCompress';
import ImageCompress from '@/features/image/ImageCompress';
import PdfToWord from '@/features/pdf/PdfToWord';
import WordToPdf from '@/features/pdf/WordToPdf';
import ComingSoon from '@/components/shared/ComingSoon';
import { ALL_TOOLS } from '@/constants';

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = ALL_TOOLS.find(t => t.id === id);

  if (!tool) {
    notFound();
  }

  // Redirect new standalone pages
  if (id === 'pomodoro' || id === 'todo' || id === 'water-tracker') {
    redirect(`/tools/${id}`);
  }

  // Legacy redirects
  if (id === 'focus-timer' || id === 'todo-list') {
    redirect('/');
  }

  const renderTool = () => {
    switch (id) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'base64-converter':
        return <Base64Converter />;
      case 'calculator':
        return <Calculator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'translator':
        return <TranslationTool />;
      case 'uuid-generator':
        return <UuidGenerator />;
      case 'md5-hash':
        return <Md5Hash />;
      case 'url-encoder':
        return <UrlEncoder />;
      case 'qr-generator':
        return <QrGenerator />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'word-count':
        return <WordCount />;
      case 'markdown-preview':
        return <MarkdownPreview />;
      case 'file-encrypt':
        return <FileEncrypt />;
      case 'file-compress':
        return <FileCompress />;
      case 'image-compress':
        return <ImageCompress />;
      case 'pdf-to-word':
        return <PdfToWord />;
      case 'word-to-pdf':
        return <WordToPdf />;
      default:
        return <ComingSoon toolName={tool.name} />;
    }
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20">
      {renderTool()}
    </div>
  );
}
