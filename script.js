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

  // === [2] 매매 모달 관련 코드 ===
document.addEventListener('DOMContentLoaded', () => {
    // [1] 매매취득 관련 요소 가져오기
    const saleButton = document.getElementById('saleButton'); // 매매취득 버튼
    const saleModal = document.getElementById('saleModal');   // 매매취득 모달
    const confirmSaleType = document.getElementById('confirmSaleType'); // 매매취득 확인 버튼
    const closeSaleModal = document.getElementById('closeSaleModal');   // 매매취득 모달 닫기 버튼

    console.log('매매취득 버튼:', saleButton); // 버튼 요소 확인
    console.log('매매취득 모달:', saleModal);  // 모달 요소 확인
    console.log('매매취득 확인 버튼:', confirmSaleType); // 확인 버튼 확인
    console.log('모달 닫기 버튼:', closeSaleModal); // 닫기 버튼 확인

    // [2] 매매취득 모달 내 옵션 관련 요소
    const saleCategory = document.getElementById('saleCategory');       // 대분류 선택
    const houseOptions = document.getElementById('houseOptions');       // 주택 옵션
    const landOptions = document.getElementById('landOptions');         // 토지 옵션
    const realEstateType = document.getElementById('realEstateType');   // 부동산 종류

    // [3] 매매취득 버튼 클릭 이벤트: 모달 열기
    if (saleButton && saleModal) {
        saleButton.addEventListener('click', () => {
            console.log('매매취득 버튼 클릭됨'); // 클릭 이벤트 확인
            const selectedType = realEstateType?.value; // 부동산 종류 값 가져오기
            console.log('선택된 부동산 종류:', selectedType); // 선택된 부동산 종류 로그

            // 초기화: 모든 옵션 숨기기
            if (saleCategory) saleCategory.innerHTML = '';
            if (houseOptions) houseOptions.style.display = 'none';
            if (landOptions) landOptions.style.display = 'none';

            // 부동산 종류에 따라 대분류 옵션 추가
            if (selectedType === 'house') {
                saleCategory.innerHTML = `
                    <option value="singleHousehold">1세대 1주택</option>
                    <option value="multiHousehold">다주택</option>
                `;
                if (houseOptions) houseOptions.style.display = 'block'; // 주택 옵션 표시
            } else if (selectedType === 'building') {
                saleCategory.innerHTML = `
                    <option value="residential">주거용</option>
                    <option value="nonResidential">비주거용</option>
                `;
            } else if (selectedType === 'land') {
                saleCategory.innerHTML = `
                    <option value="agricultural">농지</option>
                    <option value="generalLand">일반 토지</option>
                `;
                if (landOptions) landOptions.style.display = 'block'; // 토지 옵션 표시
            }

            saleModal.style.display = 'flex'; // 매매취득 모달 표시
            console.log('매매취득 모달 열림: display = flex'); // 모달 열림 로그
        });
    } else {
        console.error('매매취득 버튼 또는 모달이 존재하지 않습니다.');
    }

    // [4] 매매취득 확인 버튼 클릭 이벤트: 계산 처리
    if (confirmSaleType) {
        confirmSaleType.addEventListener('click', () => {
            console.log('매매취득 확인 버튼 클릭됨'); // 확인 버튼 클릭 로그
            const selectedType = realEstateType?.value || ''; // 부동산 종류
            const selectedCategory = saleCategory?.value || ''; // 대분류 선택
            let taxRate = 0;

            const assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, ''), 10) || 0; // 금액 입력 값
            console.log('입력된 금액:', assetValue); // 금액 로그

            if (isNaN(assetValue) || assetValue <= 0) {
                alert('유효한 금액을 입력하세요.');
                return;
            }

            // 세율 계산 로직
            if (selectedType === 'house') {
                const isSingleHousehold = document.getElementById('isSingleHousehold')?.value === 'yes';
                taxRate = isSingleHousehold ? 0.01 : 0.015; // 1세대 여부에 따른 세율
            } else if (selectedType === 'building') {
                taxRate = selectedCategory === 'residential' ? 0.028 : 0.03; // 주거용 및 비주거용
            } else if (selectedType === 'land') {
                const isAgriculturalLand = document.getElementById('isAgriculturalLand')?.value === 'yes';
                taxRate = isAgriculturalLand ? 0.023 : 0.028; // 농지 여부에 따른 세율
            }

            const acquisitionTax = Math.floor(assetValue * taxRate); // 취득세 계산
            console.log('계산된 세율:', taxRate); // 세율 로그
            console.log('계산된 취득세:', acquisitionTax); // 취득세 로그

            // 결과 출력
            updateResult('매매 취득 계산 결과', `
                <p>부동산 종류: ${selectedType}</p>
                <p>대분류: ${selectedCategory}</p>
                <p>취득 금액: ${assetValue.toLocaleString()} 원</p>
                <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
                <p>세율: ${(taxRate * 100).toFixed(1)}%</p>
            `);

            saleModal.style.display = 'none'; // 매매취득 모달 닫기
        });
    }

    // [5] 매매취득 모달 닫기 버튼 클릭 이벤트
    if (closeSaleModal && saleModal) {
        closeSaleModal.addEventListener('click', () => {
            saleModal.style.display = 'none'; // 모달 닫기
            console.log('매매취득 모달 닫힘: display = none'); // 닫힘 로그
        });
    }

    // === [6] 공통 함수: 결과 업데이트 ===
    function updateResult(title, details) {
        const resultDiv = document.getElementById('result'); // 결과 표시 영역
        resultDiv.innerHTML = `<h3>${title}</h3>${details}`;
    }

    // === [7] 모달 외부 클릭 시 닫기 ===
    window.addEventListener('click', (e) => {
        if (e.target === saleModal) {
            saleModal.style.display = 'none'; // 모달 닫기
            console.log('모달 외부 클릭됨: 모달 닫힘'); // 외부 클릭 로그
        }
    });
});
    
    // 증여 모달 관련 코드
const giftButton = document.getElementById('giftButton'); // 증여취득 버튼
const giftModal = document.getElementById('giftModal');   // 증여 모달
const confirmGiftType = document.getElementById('confirmGiftType'); // 확인 버튼
const closeGiftModal = document.getElementById('closeGiftModal');   // 닫기 버튼
 
    // 증여취득 버튼 클릭 시 모달 표시
    giftButton.addEventListener('click', () => {
        giftModal.style.display = 'flex';
    });

    // 증여 모달 확인 버튼 클릭 이벤트
    confirmGiftType.addEventListener('click', () => {
        const giftType = document.getElementById('giftType').value;
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

        // 결과 출력
        updateResult('증여 취득 계산 결과', `
            <p>증여 종류: ${giftType}</p>
            <p>증여 금액: ${assetValue.toLocaleString()} 원</p>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>세율: ${(taxRate * 100).toFixed(1)}%</p>
        `);

        giftModal.style.display = 'none';
    });

    // 닫기 버튼 클릭 이벤트
closeGiftModal.addEventListener('click', () => {
    giftModal.style.display = 'none';
});
    
    // === [4] 공통 함수: 결과 업데이트 ===
    function updateResult(title, details) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h3>${title}</h3>${details}`;
    }

    // === [5] 모달 외부 클릭 공통 처리 ===
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// === [4] 상속 모달 관련 코드 ===
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

    // 결과 출력
    updateResult('상속 취득 계산 결과', `
        <p>상속 종류: ${inheritanceType}</p>
        <p>조정 대상 지역: ${isAdjustedArea ? '예' : '아니오'}</p>
        <p>상속 금액: ${assetValue.toLocaleString()} 원</p>
        <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
        <p>세율: ${(taxRate * 100).toFixed(1)}%</p>
    `);

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

    // 계산 버튼 클릭 이벤트
    document.getElementById('calculateButton').addEventListener('click', () => {
        let assetValue = 0; // 자산 금액 초기화
        let taxRate = 0; // 취득세율 초기화
        const educationTaxRate = 0.1; // 지방교육세율 (10%)
        const ruralTaxRate = 0.2; // 농어촌특별세율 (20%)

        // 재산 유형이 "부동산"인 경우
        if (assetType.value === 'realEstate') {
            assetValue = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
            const realEstateType = document.getElementById('realEstateType').value;

            // 부동산 종류에 따른 취득세율 설정
            switch (realEstateType) {
                case 'residential1': // 1세대 1주택
                    taxRate = assetValue <= 100000000 ? 0.01 : assetValue <= 600000000 ? 0.015 : 0.03;
                    break;
                case 'residentialMulti': // 다주택
                    taxRate = 0.08;
                    break;
                case 'commercial': // 상업용
                case 'land': // 토지
                    taxRate = 0.04;
                    break;
            }
        }
        // 재산 유형이 "차량"인 경우
        else if (assetType.value === 'vehicle') {
            assetValue = parseInt(document.getElementById('vehiclePrice').value.replace(/,/g, '') || '0', 10);
            const vehicleType = document.getElementById('vehicleType').value;

            // 차량 종류에 따른 취득세율 설정
            taxRate = vehicleType === 'compact' ? 0.05 : 0.07; // 경차: 5%, 일반 차량: 7%
        }
        // 재산 유형이 "기타"인 경우
        else if (assetType.value === 'other') {
            assetValue = parseInt(document.getElementById('otherAssetValue').value.replace(/,/g, '') || '0', 10);
            taxRate = 0.03; // 기타 자산의 취득세율: 3%
        }

        // 세금 계산
        const acquisitionTax = Math.floor(assetValue * taxRate); // 취득세
        const educationTax = Math.floor(acquisitionTax * educationTaxRate); // 지방교육세
        const ruralTax = Math.floor(acquisitionTax * ruralTaxRate); // 농어촌특별세
        const totalTax = acquisitionTax + educationTax + ruralTax; // 총 세금

        // 결과 출력
        document.getElementById('result').innerHTML = `
            <h3>계산 결과</h3>
            <p>취득세: ${acquisitionTax.toLocaleString()} 원</p>
            <p>지방교육세: ${educationTax.toLocaleString()} 원</p>
            <p>농어촌특별세: ${ruralTax.toLocaleString()} 원</p>
            <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
        `;
    }); // 닫는 괄호 및 세미콜론 위치 확인

    
