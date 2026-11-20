import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  hasValidationErrors,
  validateContactForm,
} from './validation';

test('validateContactForm catches empty and malformed fields', () => {
  const emptyErrors = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(hasValidationErrors(emptyErrors), true);
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.subject);
  assert.ok(emptyErrors.message);

  const badEmailErrors = validateContactForm({
    name: 'Ananya',
    email: 'not-an-email',
    subject: 'Internship Inquiry',
    message: 'Hello, I would like to discuss a web developer role.',
  });
  assert.equal(hasValidationErrors(badEmailErrors), true);
  assert.ok(badEmailErrors.email);
  assert.equal(badEmailErrors.name, undefined);

  const shortMessageErrors = validateContactForm({
    name: 'Ananya',
    email: 'ananya@example.com',
    subject: 'Hello',
    message: 'Too short',
  });
  assert.equal(hasValidationErrors(shortMessageErrors), true);
  assert.ok(shortMessageErrors.message);
});

test('validateContactForm passes valid input and buildMailtoHref encodes payload', () => {
  const validValues = {
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    subject: 'Junior Web Developer Role',
    message: 'Hi Venkataramana, we reviewed your portfolio and would like to connect.',
  };

  const errors = validateContactForm(validValues);
  assert.equal(hasValidationErrors(errors), false);

  const href = buildMailtoHref('k.venky6123@gmail.com', validValues);
  assert.ok(href.startsWith('mailto:k.venky6123@gmail.com?subject='));
  assert.ok(href.includes('Junior%20Web%20Developer%20Role'));
  assert.ok(href.includes('Rahul%20Sharma'));
});
