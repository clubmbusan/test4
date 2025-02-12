document.addEventListener('DOMContentLoaded', () => {
  // 재산 유형에 따른 필드 표시
  const assetType = document.getElementById('assetType');
  const realEstateField = document.getElementById('realEstateField');
  const vehicleField = document.getElementById('vehicleField');
  const otherField = document.getElementById('otherField');

  // [1] 재산 유형 변경 시, 해당 필드만 보이도록
  assetType.addEventListener('change', () => {
    const selected = assetType.value;
    if (selected === 'realEstate') {
      realEstateField.style.display = 'block';
      vehicleField.style.display = 'none';
      otherField.style.display = 'none';
    } else if (selected === 'vehicle') {
      realEstateField.style.display = 'none';
      vehicleField.style.display = 'block';
      otherField.style.display = 'none';
    } else {
      // 'other'
      realEstateField.style.display = 'none';
      vehicleField.style.display = 'none';
      otherField.style.display = 'block';
    }
  });
  // 초기 상태 반영
  assetType.dispatchEvent(new Event('change'));

  // [2] 부동산 종류에 따른 하위 필드 표시/숨김
  const realEstateType = document.getElementById('realEstateType');
  const houseField = document.getElementById('houseField');       // 주택 관련 영역
  const landField = document.getElementById('landField');         // 토지 관련 영역
  const buildingField = document.getElementById('buildingField');   // 건축물 관련 영역

  function hideAllSubFields() {
    houseField.style.display = 'none';
    landField.style.display = 'none';
    buildingField.style.display = 'none';
  }

  realEstateType.addEventListener('change', () => {
    hideAllSubFields();
    const selectedType = realEstateType.value;
    if (selectedType === 'house') {
      // 주택이 선택되면 조정지역 여부, 주택 종류, 취득 유형 드롭다운이 동시에 표시됨
      houseField.style.display = 'block';
    } else if (selectedType === 'land') {
      landField.style.display = 'block';
    } else if (selectedType === 'building') {
      buildingField.style.display = 'block';
    }
  });
  // 초기 상태 반영
  realEstateType.dispatchEvent(new Event('change'));

  // [3] 건축물 영역에서 추가 드롭다운 처리
  // - 건축물 영역 내 취득 유형 드롭다운에서 영리법인 선택 시 과밀억제권역 여부 드롭다운 표시
  // - 과밀억제권역 여부 드롭다운에서 "아니오" 선택 시 대도시 여부 드롭다운 표시
  const buildingAcquisitionType = document.getElementById('buildingAcquisitionType');
  const crowdedAreaField = document.getElementById('crowdedAreaField');
  const crowdedArea = document.getElementById('crowdedArea');
  const metropolitanAreaField = document.getElementById('metropolitanAreaField');

  buildingAcquisitionType.addEventListener('change', () => {
    if (buildingAcquisitionType.value === 'forProfit') {
      crowdedAreaField.style.display = 'block';
    } else {
      crowdedAreaField.style.display = 'none';
      metropolitanAreaField.style.display = 'none';
    }
  });
  // 초기 상태 반영
  buildingAcquisitionType.dispatchEvent(new Event('change'));

  // 과밀억제권역 드롭다운 변경 이벤트: "아니오" 선택 시 대도시 여부 드롭다운 표시
  crowdedArea.addEventListener('change', () => {
    if (crowdedArea.value === 'no') {
      metropolitanAreaField.style.display = 'block';
    } else {
      metropolitanAreaField.style.display = 'none';
    }
  });
  // 초기 상태 반영
  crowdedArea.dispatchEvent(new Event('change'));

  // [4] 부동산 금액 입력 시 콤마 자동
  const realEstateValue = document.getElementById('realEstateValue');
  realEstateValue.addEventListener('input', () => {
    const raw = realEstateValue.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    realEstateValue.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });

  // [5] 차량 금액도 콤마 자동 적용
  const vehiclePrice = document.getElementById('vehiclePrice');
  vehiclePrice.addEventListener('input', () => {
    const raw = vehiclePrice.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    vehiclePrice.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });

  // [6] 기타 자산 금액도 동일하게 적용
  const otherAssetValue = document.getElementById('otherAssetValue');
  otherAssetValue.addEventListener('input', () => {
    const raw = otherAssetValue.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    otherAssetValue.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });
});

 // ===== 신고하기 버튼 토글 이벤트 추가 =====
  document.getElementById('reportToggleButton').addEventListener('click', () => {
    const reportSection = document.getElementById('reportSection');
    if (reportSection.style.display === 'none' || reportSection.style.display === '') {
      reportSection.style.display = 'block';
    } else {
      reportSection.style.display = 'none';
    }
});

  // -------------------------
  // 매매모달 관련 이벤트 처리
  // -------------------------
  const saleButton = document.getElementById('saleButton');
  const saleModal = document.getElementById('saleModal');
  const confirmSaleType = document.getElementById('confirmSaleType');
  const closeSaleModal = document.getElementById('closeSaleModal');
  
  saleButton.addEventListener('click', () => {
    saleModal.style.display = 'flex';
  });
  
  confirmSaleType.addEventListener('click', () => {
    const saleType = document.getElementById('saleType').value;
    const assetValue = parseInt(realEstateValue.value.replace(/,/g, '') || '0', 10);
    if (isNaN(assetValue) || assetValue <= 0) {
      alert('유효한 금액을 입력하세요.');
      return;
    }
    // 매매 종류에 따라 세율 설정 (예시)
    let taxRate = saleType === 'general' ? 0.02 : 0.025;
    const acquisitionTax = Math.floor(assetValue * taxRate);
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (acquisitionTaxField) {
      acquisitionTaxField.value = acquisitionTax;
    }
    saleModal.style.display = 'none';
  });
  
  closeSaleModal.addEventListener('click', () => {
    saleModal.style.display = 'none';
  });
  
  // 모달 외부 클릭 시 닫기 (매매 모달)
  window.addEventListener('click', (e) => {
    if (e.target === saleModal) {
      saleModal.style.display = 'none';
    }
  });
  
// === 증여 모달 관련 코드 ===
const giftButton = document.getElementById('giftButton'); // 증여취득 버튼
const giftModal = document.getElementById('giftModal');   // 증여 모달
const confirmGiftType = document.getElementById('confirmGiftType'); // 확인 버튼
const closeGiftModal = document.getElementById('closeGiftModal');   // 닫기 버튼

// 증여취득 버튼 클릭 시 모달 표시
giftButton.addEventListener('click', () => {
    giftModal.style.display = 'flex';
});

// 증여취득 모달 확인 버튼 클릭 이벤트
confirmGiftType.addEventListener('click', () => {
    const giftType = document.getElementById('giftType').value; // 증여 종류
    const assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);

    if (isNaN(assetValue) || assetValue <= 0) {
        alert('유효한 금액을 입력하세요.');
        return;
    }

    let taxRate = 0;

    // 증여 종류에 따른 세율 설정
    if (giftType === 'general') {
        taxRate = 0.035; // 일반 증여 세율
    } else if (giftType === 'corporate') {
        taxRate = 0.04; // 법인 증여 세율
    }

    const acquisitionTax = Math.floor(assetValue * taxRate); // 취득세 계산

    // 계산된 취득세를 숨겨진 필드에 저장
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (!acquisitionTaxField) {
        console.error('숨겨진 필드 "calculatedAcquisitionTax"가 HTML에서 찾을 수 없습니다.');
        return;
    }
    acquisitionTaxField.value = acquisitionTax;

    // 모달 닫기
    giftModal.style.display = 'none';
});

// 닫기 버튼 클릭 이벤트
closeGiftModal.addEventListener('click', () => {
    giftModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === giftModal) {
        giftModal.style.display = 'none';
    }
});

// === 상속 모달 관련 코드 ===
const inheritanceButton = document.getElementById('inheritanceButton'); // 상속취득 버튼
const inheritanceModal = document.getElementById('inheritanceModal');   // 상속취득 모달
const confirmInheritanceType = document.getElementById('confirmInheritanceType'); // 확인 버튼
const closeInheritanceModal = document.getElementById('closeInheritanceModal');   // 닫기 버튼

// 상속취득 버튼 클릭 시 모달 표시
inheritanceButton.addEventListener('click', () => {
    inheritanceModal.style.display = 'flex';
});

// 상속취득 모달 확인 버튼 클릭 이벤트
confirmInheritanceType.addEventListener('click', () => {
    const inheritanceType = document.getElementById('inheritanceType').value; // 상속 종류
    const isAdjustedArea = document.getElementById('isAdjustedAreaInheritance').value === 'yes'; // 조정 대상 여부
    const assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);

    if (isNaN(assetValue) || assetValue <= 0) {
        alert('유효한 금액을 입력하세요.');
        return;
    }

    let taxRate = 0;

    // 상속 종류에 따른 세율 설정
    if (inheritanceType === 'general') {
        taxRate = isAdjustedArea ? 0.028 : 0.03; // 일반 상속: 조정 대상 여부에 따라 세율 변경
    } else if (inheritanceType === 'corporate') {
        taxRate = 0.04; // 법인 상속
    }

    const acquisitionTax = Math.floor(assetValue * taxRate); // 취득세 계산

    // 계산된 취득세를 숨겨진 필드에 저장
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (!acquisitionTaxField) {
        console.error('숨겨진 필드 "calculatedAcquisitionTax"가 HTML에서 찾을 수 없습니다.');
        return;
    }
    acquisitionTaxField.value = acquisitionTax;

    // 모달 닫기
    inheritanceModal.style.display = 'none';
});

// 닫기 버튼 클릭 이벤트
closeInheritanceModal.addEventListener('click', () => {
    inheritanceModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === inheritanceModal) {
        inheritanceModal.style.display = 'none';
    }
});

    // 원시취득 모달 관련 코드
const originalButton = document.getElementById('originalButton');   // 원시취득 버튼
const originalModal = document.getElementById('originalModal');     // 원시취득 모달
const originalCategory = document.getElementById('originalCategory'); // 건축물 대분류

originalButton.addEventListener('click', () => {
    const selectedType = realEstateType.value;

    // 원시취득은 건축물만 가능
    if (selectedType !== 'building') {
        alert('원시취득은 건축물에만 해당됩니다.');
        return;
    }

    // 건축물 관련 옵션 추가
    originalCategory.innerHTML = `
        <option value="residential">주거용</option>
        <option value="nonResidential">비주거용</option>
    `;

    originalModal.style.display = 'flex'; // 모달 표시
});

// 닫기 버튼 클릭 이벤트
document.getElementById('closeOriginalModal').addEventListener('click', () => {
    originalModal.style.display = 'none';
});

// === 후반부 시작 DOMContentLoaded: HTML DOM 로드 후 실행 ===
document.addEventListener('DOMContentLoaded', () => {
    // === 모달의 "확인" 버튼: 취득세 계산 및 저장 ===
    document.getElementById('confirmGiftType').addEventListener('click', () => {
        const giftType = document.getElementById('giftType').value; // 증여 종류 선택
        const assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10); // 부동산 금액 입력

        let taxRate = 0;

        // 증여 종류에 따른 세율 설정
        if (giftType === 'general') {
            taxRate = 0.035; // 일반 증여 세율
        } else if (giftType === 'corporate') {
            taxRate = 0.04; // 법인 증여 세율
        }

        // 취득세 계산
        const acquisitionTax = Math.floor(assetValue * taxRate);

        // 계산된 취득세를 숨겨진 필드에 저장
        const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
        if (!acquisitionTaxField) {
            console.error('숨겨진 필드 "calculatedAcquisitionTax"가 HTML에서 찾을 수 없습니다.');
            return;
        }
        acquisitionTaxField.value = acquisitionTax;

        // 모달 닫기
        document.getElementById('giftModal').style.display = 'none';
    });

    // === 계산하기 버튼: 최종 계산 ===
    document.getElementById('calculateButton').addEventListener('click', () => {
    // ---------------------------
    // 숨겨진 필드에서 취득세 불러오기 및 검증
    // ---------------------------
    const acquisitionTaxElement = document.getElementById('calculatedAcquisitionTax');
    
    // 유효성 검사: 취득세 확인
    if (!acquisitionTaxElement || acquisitionTaxElement.value === '') {
        alert('모달에서 취득세를 계산해주세요.');
        return;
    }
    
    const acquisitionTax = parseInt(acquisitionTaxElement.value || '0', 10);
    if (isNaN(acquisitionTax) || acquisitionTax <= 0) {
        alert('유효한 취득세 값이 없습니다.');
        return;
    }
    
    // ---------------------------
    // 부가세 계산 (예: 지방교육세, 농어촌특별세)
    // ---------------------------
    const educationTaxRate = 0.1; // 지방교육세율 (10%)
    const ruralTaxRate = 0.2;     // 농어촌특별세율 (20%)
    const educationTax = Math.floor(acquisitionTax * educationTaxRate);
    const ruralTax = Math.floor(acquisitionTax * ruralTaxRate);
    const baseTotalTax = acquisitionTax + educationTax + ruralTax;
    
    // ---------------------------
    // 신고일 및 신고 기한에 따른 가산세 계산 (예시)
    // ---------------------------
    const reportDeadlineSelect = document.getElementById('reportDeadline');
    let allowedDays = 60; // 기본: 매매(60일)
    if (reportDeadlineSelect.value === '3months') {
        allowedDays = 90; // 증여: 3개월
    } else if (reportDeadlineSelect.value === '6months') {
        allowedDays = 180; // 상속: 6개월
    } else if (reportDeadlineSelect.value === '9months') {
        allowedDays = 270; // 상속: 9개월
    }
    
    // 여기서는 예시로 취득일을 고정합니다.
    const baseAcquisitionDate = new Date('2024-01-01');
    const allowedDeadline = new Date(baseAcquisitionDate.getTime() + allowedDays * 24 * 60 * 60 * 1000);
    
    const reportDateInput = document.getElementById('reportDate').value;
    let penaltyTax = 0;
    if (reportDateInput) {
        const reportDate = new Date(reportDateInput);
        if (reportDate > allowedDeadline) {
            const lateTime = reportDate.getTime() - allowedDeadline.getTime();
            const lateDays = Math.ceil(lateTime / (24 * 60 * 60 * 1000));
            penaltyTax = Math.floor(acquisitionTax * 0.001 * lateDays); // 예시: 연체 일수당 0.1% 가산
        }
    }
    
    const totalTax = baseTotalTax + penaltyTax;
    
    // ---------------------------
    // 결과 출력
    // ---------------------------
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h3>계산 결과</h3>
      <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
      <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
      <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
      <p>가산세 (연체): ${penaltyTax.toLocaleString()} 원</p>
      <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
    `;
  });
});

