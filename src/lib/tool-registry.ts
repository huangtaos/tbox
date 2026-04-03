import React from 'react';
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
import ChangePhotoBackground from '@/features/photo/ChangePhotoBackground';

// Maps tool ID to its React component
export const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'json-formatter': JsonFormatter,
  'timestamp-converter': TimestampConverter,
  'base64-converter': Base64Converter,
  'calculator': Calculator,
  'unit-converter': UnitConverter,
  'translator': TranslationTool,
  'uuid-generator': UuidGenerator,
  'md5-hash': Md5Hash,
  'url-encoder': UrlEncoder,
  'qr-generator': QrGenerator,
  'password-generator': PasswordGenerator,
  'word-count': WordCount,
  'markdown-preview': MarkdownPreview,
  'file-encrypt': FileEncrypt,
  'file-compress': FileCompress,
  'image-compress': ImageCompress,
  'pdf-to-word': PdfToWord,
  'word-to-pdf': WordToPdf,
  'change-photo-background': ChangePhotoBackground,
};

// IDs that are handled by standalone pages (not dynamic routing)
export const STANDALONE_TOOL_IDS = ['pomodoro', 'todo', 'water-tracker'];
