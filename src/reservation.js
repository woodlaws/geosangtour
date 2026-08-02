const form = /** @type {HTMLFormElement | null} */ (document.querySelector('[data-reservation-form]'));

if (form) {
  const submitButton = /** @type {HTMLButtonElement | null} */ (form.querySelector('[data-submit-button]'));
  const submitLabel = /** @type {HTMLElement | null} */ (form.querySelector('[data-submit-label]'));
  const result = /** @type {HTMLElement | null} */ (document.querySelector('[data-reservation-result]'));
  const resetButton = /** @type {HTMLButtonElement | null} */ (document.querySelector('[data-reset-reservation]'));
  const privacyToggle = /** @type {HTMLButtonElement | null} */ (form.querySelector('.privacy-detail-toggle'));
  const privacyDetails = /** @type {HTMLElement | null} */ (form.querySelector('#privacy-consent-details'));
  const phoneInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('phone'));
  const emailInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('email'));
  const privacyInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('privacyConsent'));

  /** @type {Record<string, string>} */
  const fieldMessages = {
    name: '이름을 입력해 주세요.',
    phone: '연락처를 입력해 주세요.',
    email: '이메일을 입력해 주세요.',
    tourType: '관심 투어 유형을 선택해 주세요.',
    city: '관심 도시를 선택해 주세요.',
    privacyConsent: '개인정보 수집 및 이용 동의가 필요합니다.'
  };

  /** @param {HTMLInputElement | HTMLSelectElement} field @param {string} message */
  const setError = (field, message) => {
    field.setAttribute('aria-invalid', 'true');
    const error = document.getElementById(`reservation-${field.name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}-error`);
    if (error) error.textContent = message;
  };

  /** @param {HTMLInputElement | HTMLSelectElement} field */
  const clearError = (field) => {
    field.removeAttribute('aria-invalid');
    const error = document.getElementById(`reservation-${field.name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}-error`);
    if (error) error.textContent = '';
  };

  /** @returns {boolean} */
  const validateForm = () => {
    let valid = true;
    let firstInvalid = null;
    ['name', 'phone', 'email', 'tourType', 'city', 'privacyConsent'].forEach((name) => {
      const field = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (form.elements.namedItem(name));
      if (!field) return;
      clearError(field);
      if (!field.checkValidity()) {
        setError(field, fieldMessages[name] || '필수 항목을 확인해 주세요.');
        firstInvalid ||= field;
        valid = false;
      }
    });

    if (phoneInput) {
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits && (digits.length < 9 || digits.length > 11)) {
        setError(phoneInput, '연락처를 숫자 9~11자리로 입력해 주세요.');
        firstInvalid ||= phoneInput;
        valid = false;
      }
    }
    if (emailInput?.value && !emailInput.validity.valid) {
      setError(emailInput, '올바른 이메일 형식으로 입력해 주세요.');
      firstInvalid ||= emailInput;
      valid = false;
    }
    firstInvalid?.focus();
    return valid;
  };

  form.querySelectorAll('input, select').forEach((element) => {
    const field = /** @type {HTMLInputElement | HTMLSelectElement} */ (element);
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  phoneInput?.addEventListener('input', () => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) phoneInput.value = digits;
    else if (digits.length <= 7) phoneInput.value = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    else phoneInput.value = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  });

  privacyToggle?.addEventListener('click', () => {
    if (!privacyDetails) return;
    const expanded = privacyToggle.getAttribute('aria-expanded') === 'true';
    privacyToggle.setAttribute('aria-expanded', String(!expanded));
    privacyToggle.textContent = expanded ? '내용 보기' : '내용 닫기';
    privacyDetails.hidden = expanded;
  });

  const params = new URLSearchParams(window.location.search);
  const tourType = /** @type {HTMLSelectElement | null} */ (form.elements.namedItem('tourType'));
  const city = /** @type {HTMLSelectElement | null} */ (form.elements.namedItem('city'));
  if (tourType && ['regional', 'global', 'seoul'].includes(params.get('tour') || '')) tourType.value = params.get('tour') || '';
  if (city && [...city.options].some((option) => option.value === params.get('city'))) city.value = params.get('city') || '';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm() || !submitButton || !submitLabel || !result) return;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.classList.add('is-loading');
    submitLabel.textContent = '신청 내용을 확인하고 있습니다';

    // TODO: Google Sheets, Notion 또는 Supabase API가 준비되면 이 지점에서 안전한 서버 엔드포인트로 전송합니다.
    window.setTimeout(() => {
      form.hidden = true;
      result.hidden = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.classList.remove('is-loading');
      submitLabel.textContent = '거상투어 알림 신청하기 →';
      result.focus();
    }, 700);
  });

  resetButton?.addEventListener('click', () => {
    form.reset();
    privacyInput?.removeAttribute('aria-invalid');
    form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
    result?.setAttribute('hidden', '');
    form.hidden = false;
    /** @type {HTMLInputElement | null} */ (form.elements.namedItem('name'))?.focus();
  });
}
