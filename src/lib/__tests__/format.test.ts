import { describe, it, expect } from 'vitest';

// Test JSON formatting logic
describe('JSON Formatter', () => {
  it('should parse valid JSON and format it', () => {
    const input = '{"name":"test","value":123}';
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed, null, 2);
    expect(output).toBe('{\n  "name": "test",\n  "value": 123\n}');
  });

  it('should throw on invalid JSON', () => {
    const input = '{name: "test"}';
    expect(() => JSON.parse(input)).toThrow();
  });

  it('should handle nested JSON', () => {
    const input = '{"user":{"name":"test","roles":["admin","user"]}}';
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed);
    expect(parsed.user.name).toBe('test');
    expect(parsed.user.roles).toContain('admin');
  });

  it('should handle JSON with special characters', () => {
    const input = '{"message":"Hello\\nWorld","path":"C:\\\\Users"}';
    const parsed = JSON.parse(input);
    expect(parsed.message).toBe('Hello\nWorld');
    expect(parsed.path).toBe('C:\\Users');
  });
});

// Test Base64 encoding/decoding
describe('Base64 Converter', () => {
  it('should encode ASCII text to Base64', () => {
    const text = 'Hello, World!';
    const encoded = btoa(text);
    expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  it('should decode Base64 to ASCII text', () => {
    const encoded = 'SGVsbG8sIFdvcmxkIQ==';
    const decoded = atob(encoded);
    expect(decoded).toBe('Hello, World!');
  });

  it('should handle UTF-8 text via encodeURIComponent', () => {
    const text = '你好世界';
    const encoded = btoa(encodeURIComponent(text));
    const decoded = decodeURIComponent(atob(encoded));
    expect(decoded).toBe(text);
  });

  it('should roundtrip JSON string', () => {
    const obj = { name: '测试', count: 42 };
    const jsonStr = JSON.stringify(obj);
    const encoded = btoa(encodeURIComponent(jsonStr));
    const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
    expect(decoded).toEqual(obj);
  });
});

// Test URL encoding/decoding
describe('URL Encoder', () => {
  it('should encode special characters', () => {
    const input = 'hello world&foo=bar';
    const encoded = encodeURIComponent(input);
    expect(encoded).toBe('hello%20world%26foo%3Dbar');
  });

  it('should decode special characters', () => {
    const encoded = 'hello%20world%26foo%3Dbar';
    const decoded = decodeURIComponent(encoded);
    expect(decoded).toBe('hello world&foo=bar');
  });

  it('should handle full URLs', () => {
    const url = 'https://example.com/path?name=test&value=123';
    const encoded = encodeURIComponent(url);
    const decoded = decodeURIComponent(encoded);
    expect(decoded).toBe(url);
  });
});
