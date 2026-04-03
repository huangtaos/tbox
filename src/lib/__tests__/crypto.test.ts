import { describe, it, expect } from 'vitest';
import CryptoJS from 'crypto-js';

// Test that MD5 produces the expected output
describe('MD5 Hash', () => {
  it('should produce correct MD5 hash for empty string', () => {
    const hash = CryptoJS.MD5('').toString();
    expect(hash).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });

  it('should produce correct MD5 hash for hello world', () => {
    const hash = CryptoJS.MD5('hello world').toString();
    expect(hash).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });
});

// Test that SHA-256 works correctly
describe('SHA-256 Hash', () => {
  it('should produce correct SHA-256 hash for hello world', () => {
    const hash = CryptoJS.SHA256('hello world').toString();
    expect(hash).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('should produce correct SHA-256 hash for empty string', () => {
    const hash = CryptoJS.SHA256('').toString();
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });
});

// Test AES encrypt/decrypt roundtrip with PBKDF2
describe('AES Encryption/Decryption', () => {
  it('should encrypt and decrypt text correctly', () => {
    const plaintext = 'Hello, World!';
    const password = 'test-password';

    // Generate salt and IV
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 10000,
    });

    // Encrypt
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });

    // Format: salt + iv + ciphertext, base64 encoded
    const combined = salt.clone().concat(iv).concat(encrypted.ciphertext);
    const outputData = combined.toString(CryptoJS.enc.Base64);

    // Decrypt
    const decoded = CryptoJS.enc.Base64.parse(outputData);
    const salt2 = CryptoJS.lib.WordArray.create(decoded.words.slice(0, 4), 16);
    const iv2 = CryptoJS.lib.WordArray.create(decoded.words.slice(4, 8), 16);
    const ciphertext = CryptoJS.lib.WordArray.create(
      decoded.words.slice(8),
      decoded.sigBytes - 32
    );

    const key2 = CryptoJS.PBKDF2(password, salt2, {
      keySize: 256 / 32,
      iterations: 10000,
    });

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext }),
      key2,
      { iv: iv2 }
    );
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    expect(decryptedText).toBe(plaintext);
  });

  it('should fail with wrong password', () => {
    const plaintext = 'Secret message';
    const password = 'correct-password';
    const wrongPassword = 'wrong-password';

    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 10000,
    });

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv });
    const combined = salt.clone().concat(iv).concat(encrypted.ciphertext);
    const outputData = combined.toString(CryptoJS.enc.Base64);

    // Decrypt with wrong password
    const decoded = CryptoJS.enc.Base64.parse(outputData);
    const salt2 = CryptoJS.lib.WordArray.create(decoded.words.slice(0, 4), 16);
    const iv2 = CryptoJS.lib.WordArray.create(decoded.words.slice(4, 8), 16);
    const ciphertext = CryptoJS.lib.WordArray.create(
      decoded.words.slice(8),
      decoded.sigBytes - 32
    );

    const key2 = CryptoJS.PBKDF2(wrongPassword, salt2, {
      keySize: 256 / 32,
      iterations: 10000,
    });

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext }),
      key2,
      { iv: iv2 }
    );
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // Wrong password should produce empty/invalid result
    expect(decryptedText).not.toBe(plaintext);
  });
});
