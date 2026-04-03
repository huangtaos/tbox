# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-02

### Added
- **21 online tools** across 5 categories:
  - Productivity: Pomodoro Timer, To-Do List, Water Tracker
  - Daily Tools: Calculator, Unit Converter
  - Developer Tools: JSON Formatter, Timestamp Converter, Base64 Encoder/Decoder, MD5 Hash, URL Encoder, UUID Generator, QR Code Generator, Password Generator
  - Document Tools: PDF to Word, Word to PDF, Markdown Preview, Word Counter, File Encryption, File Compression, Image Compression
  - Translation: Translator (Chinese-English)
- **Internationalization**: Chinese/English language switching
- **Tool registry**: Data-driven component mapping for easy extensibility
- **GitHub Actions CI**: Automated testing pipeline
- **End-to-end tests**: Playwright test suite for critical user flows
- **Unit tests**: Vitest test suite for crypto and format utilities
- **Security improvements**:
  - AES encryption upgraded with PBKDF2 key derivation (10000 iterations)
  - MD5 tool supplemented with SHA-256 recommendation and deprecation warning
  - Client-side error handling replacing browser alerts
- **SEO optimization**: robots.txt, sitemap.xml

### Changed
- Upgraded to Next.js 15 and React 19
- Migrated to Tailwind CSS v4
- Improved tool router from switch statement to data-driven registry
- Added Next.js standalone output mode for Docker deployment

### Fixed
- Removed browser alert() in Word-to-PDF conversion error handling
- Improved error messages for invalid JSON input

## [0.0.0] - 2025-03-19

### Added
- Initial release with basic tool set
