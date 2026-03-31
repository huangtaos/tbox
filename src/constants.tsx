import React from 'react';
import { Calculator, Ruler, ListTodo, Timer, Droplets, Braces, Hash, Binary, Lock, Link, Fingerprint, QrCode, Key, FileCode, FileType, Languages, FileUp, FileDown, FilePen } from 'lucide-react';

export const ALL_TOOLS = [
  { id: 'pomodoro', name: '番茄时间', desc: '专注工作，高效休息', icon: <Timer className="w-5 h-5" />, category: '效率工具' },
  { id: 'todo', name: '待办事项', desc: '管理每日任务，提高效率', icon: <ListTodo className="w-5 h-5" />, category: '效率工具' },
  { id: 'water-tracker', name: '饮水追踪', desc: '记录每日饮水量', icon: <Droplets className="w-5 h-5" />, category: '效率工具' },
  { id: 'calculator', name: '计算器', desc: '简单易用的在线计算器', icon: <Calculator className="w-5 h-5" />, category: '日常工具' },
  { id: 'unit-converter', name: '单位换算', desc: '长度、面积、重量等单位转换', icon: <Ruler className="w-5 h-5" />, category: '日常工具' },
  { id: 'json-formatter', name: 'JSON 格式化', desc: 'JSON 校验、格式化与压缩', icon: <Braces className="w-5 h-5" />, category: '开发者工具' },
  { id: 'timestamp-converter', name: '时间戳转换', desc: 'Unix 时间戳与日期互转', icon: <Hash className="w-5 h-5" />, category: '开发者工具' },
  { id: 'base64-converter', name: 'Base64 编解码', desc: '文本与 Base64 互转', icon: <Binary className="w-5 h-5" />, category: '开发者工具' },
  { id: 'md5-hash', name: 'MD5 哈希', desc: '生成字符串的 MD5 值', icon: <Lock className="w-5 h-5" />, category: '开发者工具' },
  { id: 'url-encoder', name: 'URL 编解码', desc: 'URL 安全编码与解码', icon: <Link className="w-5 h-5" />, category: '开发者工具' },
  { id: 'uuid-generator', name: 'UUID 生成', desc: '生成随机 UUID (v4)', icon: <Fingerprint className="w-5 h-5" />, category: '开发者工具' },
  { id: 'qr-generator', name: '二维码生成', desc: '文本或链接转二维码', icon: <QrCode className="w-5 h-5" />, category: '开发者工具' },
  { id: 'password-generator', name: '密码生成器', desc: '生成强密码', icon: <Key className="w-5 h-5" />, category: '开发者工具' },
  { id: 'pdf-to-word', name: 'PDF 转 Word', desc: '将 PDF 文件转换为 Word 文档', icon: <FileUp className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'word-to-pdf', name: 'Word 转 PDF', desc: '将 Word 文档转换为 PDF 文件', icon: <FileDown className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'markdown-preview', name: 'Markdown 预览', desc: '实时预览 Markdown 渲染效果', icon: <FileCode className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'word-count', name: '字数统计', desc: '统计文本字数、行数、字符数', icon: <FileType className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'translator', name: '翻译工具', desc: '中英文互译', icon: <Languages className="w-5 h-5" />, category: '翻译工具' },
  { id: 'file-encrypt', name: '文件加密', desc: '安全加密你的文件', icon: <FileUp className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'file-compress', name: '文件压缩', desc: '减小文件体积', icon: <FileDown className="w-5 h-5" />, category: '文档处理工具' },
  { id: 'image-compress', name: '图片压缩', desc: '无损压缩图片', icon: <FilePen className="w-5 h-5" />, category: '文档处理工具' },
];
