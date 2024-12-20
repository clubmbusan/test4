// === DOMContentLoaded 이벤트: 페이지가 로드된 후 실행되는 주요 로직 ===
document.addEventListener('DOMContentLoaded', () => {
    // === [1] 재산 유형 필드 처리 ===
    const assetType = document.getElementById('assetType');
    const fields = {
        realEstate: document.getElementById('realEstateField'),
        vehicle: document.getElementById('vehicleField'),
        other: document.getElementById('otherField'),
    };

    // 재산 유형 변경 이벤트: 선택된 유형에 따라 필드를 동적으로 표시
    assetType.addEventListener('change', () => {
        Object.values(fields).forEach(field => field.style.display = 'none');
        const selectedField = fields[assetType.value];
        if (selectedField) selectedField.style.display = 'block';
    });

    // 초기값 설정: 기본으로 "부동산" 필드 표시
    assetType.dispatchEvent(new Event('change'));

    // === 금액 입력 필드에 콤마 자동 적용 ===
const realEstateValue = document.getElementById('realEstateValue');

realEstateValue.addEventListener('input', () => {
    // 입력된 값을 숫자로 변환 후 콤마 추가
    const value = realEstateValue.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    realEstateValue.value = value ? parseInt(value, 10).toLocaleString() : '';
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
        const educationTaxRate = 0.1; // 지방교육세율 (10%)
        const ruralTaxRate = 0.2; // 농어촌특별세율 (20%)

        // 숨겨진 필드에서 취득세 불러오기
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

        // 부가세 계산
        const educationTax = Math.floor(acquisitionTax * educationTaxRate); // 지방교육세
        const ruralTax = Math.floor(acquisitionTax * ruralTaxRate); // 농어촌특별세
        const totalTax = acquisitionTax + educationTax + ruralTax; // 총 세금 합계

        // 결과 출력
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h3>계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
            <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    });
});
