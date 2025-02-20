document.addEventListener('DOMContentLoaded', () => {
  /* 1. 재산 유형에 따른 필드 표시 */
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

      // 추가: 차량 관련 하위 필드 표시
      const vehicleAcquisitionTypeField = document.getElementById('vehicleAcquisitionTypeField');
      const vehicleCongestedField = document.getElementById('vehicleCongestedField');
      if (vehicleAcquisitionTypeField) {
        vehicleAcquisitionTypeField.style.display = 'block';
      }
      // 취득인 유형 드롭다운 변경 시, 법인 선택이면 과밀억제권역 필드 표시
      const vehicleAcquisitionType = document.getElementById('vehicleAcquisitionType');
      vehicleAcquisitionType.addEventListener('change', () => {
        if (vehicleAcquisitionType.value === 'forProfit' || vehicleAcquisitionType.value === 'nonProfit') {
          vehicleCongestedField.style.display = 'block';
        } else {
          vehicleCongestedField.style.display = 'none';
        }
      });
    } else {
      // 'other'
      realEstateField.style.display = 'none';
      vehicleField.style.display = 'none';
      otherField.style.display = 'block';
    }
  });
  // 초기 상태 반영
  assetType.dispatchEvent(new Event('change'));

  /* 2. 부동산 종류에 따른 하위 필드 표시/숨김 */
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
});

  /* =========================
     [A] 토지 부분 (이전 수정 내용)
     ========================= */
  const landType = document.getElementById('landType'); // 토지용도 드롭다운 (예: farmland, nonFarmland, sharedWaterReclamation)
  const landAcquisitionType = document.getElementById('landAcquisitionType'); // 취득 유형 드롭다운 (예: natural, forProfit, nonProfit)
  const landCrowdedAreaField = document.getElementById('landCrowdedAreaField'); // 과밀억제권역 여부 입력 영역
  const landCrowdedArea = document.getElementById('landCrowdedArea'); // 과밀억제권역 드롭다운
  const landMetropolitanAreaField = document.getElementById('landMetropolitanAreaField'); // 대도시 여부 입력 영역
  const landMetropolitanArea = document.getElementById('landMetropolitanArea'); // 대도시 드롭다운

  // 디버깅 로그: 초기 상태 확인
  console.log("Initial landType.value:", landType.value);
  console.log("Initial landAcquisitionType.value:", landAcquisitionType.value);

  // 토지 옵션 상태 확인 함수 수정
  function checkLandOptions() {
    console.log("checkLandOptions called");
    console.log("landType.value =", landType.value);
    console.log("landAcquisitionType.value =", landAcquisitionType.value);
    
    // 기본적으로 과밀억제권역 및 대도시 필드 숨김
    landCrowdedAreaField.style.display = 'none';
    landMetropolitanAreaField.style.display = 'none';

    // 조건: 토지용도가 "nonFarmland" 또는 "sharedWaterReclamation"이고,
    // 취득 유형이 법인(영리법인 또는 비영리법인)인 경우에 과밀억제권역 필드를 표시
    if ((landType.value === 'nonFarmland' || landType.value === 'sharedWaterReclamation') &&
        (landAcquisitionType.value === 'forProfit' || landAcquisitionType.value === 'nonProfit')) {
      console.log("조건 충족: 과밀억제권역 필드를 표시합니다.");
      landCrowdedAreaField.style.display = 'block';
    } else {
      console.log("조건 미충족: 과밀억제권역 필드를 숨깁니다.");
    }
  }

  // 토지용도와 취득유형 변경 시 checkLandOptions 함수 호출
  landType.addEventListener('change', checkLandOptions);
  landAcquisitionType.addEventListener('change', checkLandOptions);

  // 과밀억제권역 드롭다운 변경 시, "yes" 선택하면 대도시 여부 필드 표시
  landCrowdedArea.addEventListener('change', () => {
    console.log("landCrowdedArea changed, value =", landCrowdedArea.value);
    if (landCrowdedArea.value === 'yes') {
      landMetropolitanAreaField.style.display = 'block';
    } else {
      landMetropolitanAreaField.style.display = 'none';
    }
  });

  // 대도시 여부 선택 시, "notSubject" 선택하면 안내 메시지 표시
  landMetropolitanArea.addEventListener('change', () => {
    console.log("landMetropolitanArea changed, value =", landMetropolitanArea.value);
    if (landMetropolitanArea.value === 'notSubject') {
      alert(
        "법인이 과밀억제권역에 본점을 설립하거나 지점 또는 분사무소 설치\n" +
        "법인이 과밀억제권역 내에서 설립된 지 5년 미만\n" +
        "과밀억제권역 내에서 부동산 취득\n" +
        "중과세에서 제외되는 업종(신축업, 임대업)이 아닌 경우\n" +
        "위의 조건 중 하나라도 충족되지 않으면 중과세가 적용됩니다."
      );
    }
  });

  // 초기 상태 반영 (토지 관련 추가 필드)
  landType.dispatchEvent(new Event('change'));
  landAcquisitionType.dispatchEvent(new Event('change'));
  landCrowdedArea.dispatchEvent(new Event('change'));

  /* =========================
     [B] 건축물 부분 - 비거주용건축물 선택 시, 법인일 때만 추가 드롭다운 표시
     ========================= */
  const buildingType = document.getElementById('buildingType'); // 건축물 용도 선택
  const buildingAcquisitionType = document.getElementById('buildingAcquisitionType'); // 취득 유형 (자연인, forProfit, nonProfit)
  const crowdedAreaField = document.getElementById('crowdedAreaField'); // 과밀억제권역 여부 필드
  const crowdedArea = document.getElementById('crowdedArea');           // 과밀억제권역 드롭다운
  const metropolitanAreaField = document.getElementById('metropolitanAreaField'); // 대도시 여부 필드
  const metropolitanArea = document.getElementById('metropolitanArea');           // 대도시 드롭다운

  // 초기 상태: 추가 필드 숨김
  crowdedAreaField.style.display = 'none';
  metropolitanAreaField.style.display = 'none';

  function checkBuildingOptions() {
    // 먼저 모든 추가 필드를 숨김
    crowdedAreaField.style.display = 'none';
    metropolitanAreaField.style.display = 'none';

    const bt = buildingType.value;       // 건축물용도 값
    const bat = buildingAcquisitionType.value; // 취득 유형 값

    // 기존에는 사치성재산은 드롭다운을 표시하지 않았으나,
    // 이제 사치성재산도 포함하여, 법인일 경우 과밀/대도시 선택을 할 수 있도록 함
    if (bat === 'forProfit' || bat === 'nonProfit') {
      crowdedAreaField.style.display = 'block';
    }
  }

  buildingType.addEventListener('change', checkBuildingOptions);
  buildingAcquisitionType.addEventListener('change', checkBuildingOptions);

  crowdedArea.addEventListener('change', () => {
    // 과밀억제권역에서 "yes" 선택 시 대도시 여부 드롭다운 표시, 그 외는 숨김 처리
    if (crowdedArea.value === 'yes') {
      metropolitanAreaField.style.display = 'block';
    } else {
      metropolitanAreaField.style.display = 'none';
    }
  });

  metropolitanArea.addEventListener('change', () => {
    if (metropolitanArea.value === 'notSubject') {
      alert(
        "법인이 과밀억제권역에 본점을 설립하거나 지점 또는 분사무소 설치\n" +
        "법인이 과밀억제권역 내에서 설립된 지 5년 미만\n" +
        "과밀억제권역 내에서 부동산 취득\n" +
        "중과세에서 제외되는 업종(신축업, 임대업)이 아닌 경우\n" +
        "조건을 다시 확인해 주세요."
      );
    }
  });

  // 초기 상태 반영
  buildingType.dispatchEvent(new Event('change'));
  buildingAcquisitionType.dispatchEvent(new Event('change'));

  /* 3. 부동산 금액 입력 시 콤마 자동 적용 */
  const realEstateValue = document.getElementById('realEstateValue');
  realEstateValue.addEventListener('input', () => {
    const raw = realEstateValue.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    realEstateValue.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });

  /* 4. 차량 금액도 콤마 자동 적용 */
  const vehiclePrice = document.getElementById('vehiclePrice');
  vehiclePrice.addEventListener('input', () => {
    const raw = vehiclePrice.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    vehiclePrice.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });

  /* 5. 기타 자산 금액도 동일하게 적용 */
  const otherAssetValue = document.getElementById('otherAssetValue');
  otherAssetValue.addEventListener('input', () => {
    const raw = otherAssetValue.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    otherAssetValue.value = raw ? parseInt(raw, 10).toLocaleString() : '';
  });

  /* 6. 신고하기 버튼 토글 이벤트 추가 */
  const reportToggleButton = document.getElementById('reportToggleButton');
  const reportSection = document.getElementById('reportSection');
  reportToggleButton.addEventListener('click', () => {
    reportSection.style.display = (reportSection.style.display === 'none' || reportSection.style.display === '') ? 'block' : 'none';
  });

  /* 신고 제출 버튼 이벤트 처리 (신고 입력값 저장 및 신고 영역 숨김) */
  document.getElementById('submitReportButton').addEventListener('click', () => {
    const reportDate = document.getElementById('reportDate').value;
    const reportDeadline = document.getElementById('reportDeadline').value;
    const extendedReportDate = document.getElementById('extendedReportDate').value; // 선택 사항

    if (!reportDate || !reportDeadline) {
      alert('신고일과 신고 기한을 모두 입력해주세요.');
      return;
    }

    // 신고 정보 저장 (전역 변수 등에 저장하여 계산 시 활용 가능)
    window.reportDate = reportDate;
    window.reportDeadline = reportDeadline;
    window.extendedReportDate = extendedReportDate;

    // 신고 영역 숨김 처리
    reportSection.style.display = 'none';
  });

  /* 7. 글로벌 함수: 중과세 적용 (3배) */
  function applyCongestionMultiplier(rate, type) {
    // type에 따른 추가 로직이 필요하면 여기서 처리할 수 있습니다.
    return rate * 3;
  }

  // -------------------------
  // 8. 유상취득 모달 관련 이벤트 처리 (업데이트된 매매 표준세율 및 세율 정보 저장)
  // -------------------------
  const saleButton = document.getElementById('saleButton');
  const saleModal = document.getElementById('saleModal');
  const confirmSaleType = document.getElementById('confirmSaleType');
  const closeSaleModal = document.getElementById('closeSaleModal');

  saleButton.addEventListener('click', () => {
    saleModal.style.display = 'flex';
  });

  confirmSaleType.addEventListener('click', () => {
    // 입력받은 부동산 금액 (콤마 제거 후 숫자 변환)
    const assetValueNum = parseInt(realEstateValue.value.replace(/,/g, '') || '0', 10);
    if (isNaN(assetValueNum) || assetValueNum <= 0) {
      alert('유효한 금액을 입력하세요.');
      return;
    }
    
    let acquisitionTax = 0;
    let appliedTaxRate = "";
    const selectedType = document.getElementById('realEstateType').value; // 'house', 'land', 'building'
    
    // =====================
    // 1. 주택 계산
    // =====================
    if (selectedType === 'house') {
      // 주택의 취득 유형 (oneHouse, twoHouse, threeHouse, fourHouse, nonProfitCorporate, forProfitCorporate)
      const acquisitionType = document.getElementById('acquisitionType').value;
      // 주택 종류 (general6, general9, highValue)
      const houseType = document.getElementById('houseType').value;
      
      // 1-1. 1주택자 (일시적 2주택 포함)
      if (acquisitionType === 'oneHouse') {
        if (houseType === 'premium') {
          // 고급 주택: 12% 중과세
          acquisitionTax = Math.floor(assetValueNum * 0.12);
          appliedTaxRate = "12%";
        } else if (houseType === 'highValue') { 
          // 고가 주택 (9억 초과): 무조건 3%
          acquisitionTax = Math.floor(assetValueNum * 0.03);
          appliedTaxRate = "3%";
        } else if (houseType === 'general6') {
          // 일반 주택 (6억원 이하): 1%
          acquisitionTax = Math.floor(assetValueNum * 0.01);
          appliedTaxRate = "1%";
        } else if (houseType === 'general9') {
          // 일반 주택 (6억 초과 ~ 9억원 이하): 전체 금액에 대해 단일 세율 적용
          if (assetValueNum <= 600000000) {
            acquisitionTax = Math.floor(assetValueNum * 0.01);
            appliedTaxRate = "1%";
          } else if (assetValueNum <= 900000000) {
            // 선형 보간: 6억일 때 1%, 9억일 때 3%
            const effectiveRate = 0.01 + ((assetValueNum - 600000000) / 300000000) * (0.03 - 0.01);
            acquisitionTax = Math.floor(assetValueNum * effectiveRate);
            appliedTaxRate = `${(effectiveRate * 100).toFixed(2)}%`;
          } else {
            acquisitionTax = Math.floor(assetValueNum * 0.03);
            appliedTaxRate = "3%";
          }
        } else {
          // houseType 값이 없거나 예외인 경우, 기본적으로 1%~3% 방식 적용
          if (assetValueNum <= 600000000) {
            acquisitionTax = Math.floor(assetValueNum * 0.01);
            appliedTaxRate = "1%";
          } else if (assetValueNum <= 900000000) {
            const effectiveRate = 0.01 + ((assetValueNum - 600000000) / 300000000) * (0.03 - 0.01);
            acquisitionTax = Math.floor(assetValueNum * effectiveRate);
            appliedTaxRate = `${(effectiveRate * 100).toFixed(2)}%`;
          } else {
            acquisitionTax = Math.floor(assetValueNum * 0.03);
            appliedTaxRate = "3%";
          }
        }
      }
      // 1-2. 2주택자
      else if (acquisitionType === 'twoHouse') {
        const adjustedArea = document.getElementById('adjustedArea').value; // 'yes' 또는 'no'
        if (adjustedArea === 'yes') {
          // 조정지역: 8%
          acquisitionTax = Math.floor(assetValueNum * 0.08);
          appliedTaxRate = "8%";
        } else {
          // 일반지역: 기존 주택 계산 방식 적용
          if (houseType === 'highValue') {
            acquisitionTax = Math.floor(assetValueNum * 0.03);
            appliedTaxRate = "3%";
          } else if (houseType === 'general6') {
            acquisitionTax = Math.floor(assetValueNum * 0.01);
            appliedTaxRate = "1%";
          } else if (houseType === 'general9') {
            if (assetValueNum <= 600000000) {
              acquisitionTax = Math.floor(assetValueNum * 0.01);
              appliedTaxRate = "1%";
            } else if (assetValueNum <= 900000000) {
              const effectiveRate = 0.01 + ((assetValueNum - 600000000) / 300000000) * (0.03 - 0.01);
              acquisitionTax = Math.floor(assetValueNum * effectiveRate);
              appliedTaxRate = `${(effectiveRate * 100).toFixed(2)}%`;
            } else {
              acquisitionTax = Math.floor(assetValueNum * 0.03);
              appliedTaxRate = "3%";
            }
          } else {
            if (assetValueNum <= 600000000) {
              acquisitionTax = Math.floor(assetValueNum * 0.01);
              appliedTaxRate = "1%";
            } else if (assetValueNum <= 900000000) {
              const effectiveRate = 0.01 + ((assetValueNum - 600000000) / 300000000) * (0.03 - 0.01);
              acquisitionTax = Math.floor(assetValueNum * effectiveRate);
              appliedTaxRate = `${(effectiveRate * 100).toFixed(2)}%`;
            } else {
              acquisitionTax = Math.floor(assetValueNum * 0.03);
              appliedTaxRate = "3%";
            }
          }
        }
      }
      // 1-3. 3주택자
      else if (acquisitionType === 'threeHouse') {
        const adjustedArea = document.getElementById('adjustedArea').value;
        if (adjustedArea === 'yes') {
          acquisitionTax = Math.floor(assetValueNum * 0.12);
          appliedTaxRate = "12%";
        } else {
          acquisitionTax = Math.floor(assetValueNum * 0.08);
          appliedTaxRate = "8%";
        }
      }
      // 1-4. 4주택자
      else if (acquisitionType === 'fourHouse') {
        acquisitionTax = Math.floor(assetValueNum * 0.12);
        appliedTaxRate = "12%";
      }
      // 1-5. 법인 (영리, 비영리 모두)
      else if (acquisitionType === 'nonProfitCorporate' || acquisitionType === 'forProfitCorporate') {
        acquisitionTax = Math.floor(assetValueNum * 0.12);
        appliedTaxRate = "12%";
      }
      window.selectedAcquisitionMethod = "매매취득세";
    }
    // =====================
    // 2. 토지 계산
    // =====================
    else if (selectedType === 'land') {
     const landTypeValue = document.getElementById('landType').value;
     const landAcqType = document.getElementById('landAcquisitionType').value;
     let baseRate = 0, taxRateNumeric = 0;
  
     if (landTypeValue === 'farmland') {
       baseRate = 0.03;
       taxRateNumeric = 3;
     } else if (landTypeValue === 'nonFarmland' || landTypeValue === 'sharedWaterReclamation') {
       baseRate = 0.04;
       taxRateNumeric = 4;
       if ((landAcqType === 'forProfit' || landAcqType === 'nonProfit') &&
           document.getElementById('landCrowdedArea').value === 'yes') {
         if (document.getElementById('landMetropolitanArea').value === 'yes') {
            // 표준 조건: 4%×3 = 12%
            baseRate = applyCongestionMultiplier(baseRate, 'land');
            taxRateNumeric = taxRateNumeric * 3;
         } else if (document.getElementById('landMetropolitanArea').value === 'yes_relaxed') {
            // 완화 조건: 사용자가 완화 적용을 선택한 경우 → (4%×3) - 4% = 12% - 4% = 8%
            baseRate = applyCongestionMultiplier(baseRate, 'land') - 0.04;
            taxRateNumeric = (taxRateNumeric * 3) - 4;
         }
       }
     } else {
       baseRate = 0.04;
       taxRateNumeric = 4;
     }
  
     acquisitionTax = Math.floor(assetValueNum * baseRate);
     appliedTaxRate = taxRateNumeric + "%";
     window.selectedAcquisitionMethod = "매매취득세";
   }

    // =====================
    // 3. 건축물 계산
    // =====================
    else if (selectedType === 'building') {
     // 건축물의 경우
     if (document.getElementById('buildingType').value === 'luxuryProperty') {
       // 사치성재산은 완화 적용 없이 기본 세율 적용
       const buildingAcqType = document.getElementById('buildingAcquisitionType').value;
       if ((buildingAcqType === 'forProfit' || buildingAcqType === 'nonProfit') &&
           document.getElementById('crowdedArea').value === 'yes' &&
           document.getElementById('metropolitanArea').value === 'yes') {
         // 기존 조건: 4%×3 + 중과 기준세율 2%×2 = 12% + 4% = 16%
         let baseRate = 0.16;
         acquisitionTax = Math.floor(assetValueNum * baseRate);
         appliedTaxRate = "16%";
       } else {
         // 조건 미충족 시 기본 사치성재산 세율 적용 (12%)
         let baseRate = 0.12;
         acquisitionTax = Math.floor(assetValueNum * baseRate);
         appliedTaxRate = "12%";
       }
     } else {
       // 사치성재산이 아닌 일반 건축물의 경우
       let baseRate = 0.04;
       let taxRateNumeric = 4;
       const buildingAcqType = document.getElementById('buildingAcquisitionType').value;
       if ((buildingAcqType === 'forProfit' || buildingAcqType === 'nonProfit') &&
           document.getElementById('crowdedArea').value === 'yes') {
         if (document.getElementById('metropolitanArea').value === 'yes') {
           // 표준 조건: 4%×3 = 12%
           baseRate = applyCongestionMultiplier(baseRate, 'building');
           taxRateNumeric = taxRateNumeric * 3;
         } else if (document.getElementById('metropolitanArea').value === 'yes_relaxed') {
           // 완화 조건: (4%×3) - 4% = 12% - 4% = 8%
           baseRate = applyCongestionMultiplier(baseRate, 'building') - 0.04;
           taxRateNumeric = (taxRateNumeric * 3) - 4;
         }
       }
       acquisitionTax = Math.floor(assetValueNum * baseRate);
       appliedTaxRate = taxRateNumeric + "%";
     }
     window.selectedAcquisitionMethod = "매매취득세";
   }

    // ---------------------------
    // 계산된 취득세와 적용 세율 정보를 저장
    // ---------------------------
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (acquisitionTaxField) {
      acquisitionTaxField.value = acquisitionTax;
    }
    window.selectedAppliedTaxRate = appliedTaxRate;
    
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

  /* =========================
     8. 증여 취득 모달 관련 코드 (업데이트된 증여 표준세율 및 세율 정보 저장)
     ========================= */
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
    const giftType = document.getElementById('giftType').value; // 증여 종류 ('general' 또는 'corporate')
    const assetValueNum = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
    
    if (isNaN(assetValueNum) || assetValueNum <= 0) {
      alert('유효한 금액을 입력하세요.');
      return;
    }
    
    let taxRate = 0;
    let appliedTaxRate = "";
    const selectedType = document.getElementById('realEstateType').value;
    
    // 증여 종류에 따른 세율 설정
    if (giftType === 'general') {
      taxRate = 0.035;
      appliedTaxRate = "3.5%";
    } else if (giftType === 'corporate') {
      taxRate = 0.028;
      appliedTaxRate = "2.8%";
    }
    
    // 건축물이고 사치성재산이면 기본세율에 8% 추가
    if (selectedType === 'building' && document.getElementById('buildingType').value === 'luxuryProperty') {
      taxRate += 0.08;
      if (giftType === 'general') {
        appliedTaxRate = "11.8%"; // 3.5% + 8% = 11.8%
      } else if (giftType === 'corporate') {
        appliedTaxRate = "10.8%"; // 2.8% + 8% = 10.8%
      }
    }
    
    const acquisitionTax = Math.floor(assetValueNum * taxRate); // 취득세 계산
    
    // 계산된 취득세를 숨겨진 필드에 저장
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (!acquisitionTaxField) {
      console.error('숨겨진 필드 "calculatedAcquisitionTax"를 찾을 수 없습니다.');
      return;
    }
    acquisitionTaxField.value = acquisitionTax;
    
    // 전역 변수에 증여 취득세 종류와 적용 세율 저장 (최종 결과 출력 시 활용)
    window.selectedAcquisitionMethod = "증여취득세";
    window.selectedAppliedTaxRate = appliedTaxRate;
    
    // 모달 닫기
    giftModal.style.display = 'none';
  });

  closeGiftModal.addEventListener('click', () => {
    giftModal.style.display = 'none';
  });

  // 모달 외부 클릭 시 닫기
  window.addEventListener('click', (e) => {
    if (e.target === giftModal) {
      giftModal.style.display = 'none';
    }
  });

  /* =========================
     9. 상속 취득 모달 관련 코드 (업데이트된 상속 표준세 적용 및 세율 정보 저장)
     ========================= */
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
    const assetValueNum = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
    if (isNaN(assetValueNum) || assetValueNum <= 0) {
      alert('유효한 금액을 입력하세요.');
      return;
    }
    
    let baseRate = 0;
    let appliedTaxRate = "";
    const selectedType = document.getElementById('realEstateType').value;
    
    if (selectedType === 'land') {
      const landTypeValue = document.getElementById('landType').value;
      // 토지: 농지이면 2.3%, 농지외 토지이면 2.8%
      baseRate = (landTypeValue === 'farmland') ? 0.023 : 0.028;
      appliedTaxRate = (landTypeValue === 'farmland') ? "2.3%" : "2.8%";
    } else if (selectedType === 'building') {
      // 건축물의 기본 상속세율은 2.8%
      baseRate = 0.028;
      appliedTaxRate = "2.8%";
      // 사치성재산인 경우
      if (document.getElementById('buildingType').value === 'luxuryProperty') {
        const buildingAcqType = document.getElementById('buildingAcquisitionType').value;
        if ((buildingAcqType === 'forProfit' || buildingAcqType === 'nonProfit') &&
            document.getElementById('crowdedArea').value === 'yes' &&
            document.getElementById('metropolitanArea').value === 'yes') {
          // 원시취득의 경우: 2.8% * 3 + 2% * 2 = 8.4% + 4% = 12.4%
          baseRate = 0.124;
          appliedTaxRate = "12.4%";
        } else {
          baseRate += 0.08;
          appliedTaxRate = 10.8;
        }
      }
    } else {
      // 주택 등 기타 경우 기본 2.8%
      baseRate = 0.028;
      appliedTaxRate = "2.8%";
    }
      
    const acquisitionTaxCalculated = Math.floor(assetValueNum * baseRate);
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (acquisitionTaxField) {
      acquisitionTaxField.value = acquisitionTaxCalculated;
    }
    
    window.selectedAcquisitionMethod = "상속취득세";
    window.selectedAppliedTaxRate = appliedTaxRate;
    
    // 모달 닫기
    inheritanceModal.style.display = 'none';
  });

  closeInheritanceModal.addEventListener('click', () => {
    inheritanceModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === inheritanceModal) {
      inheritanceModal.style.display = 'none';
    }
  });

  /* =========================
     10. 원시 취득 모달 관련 코드 (업데이트된 중과세율 로직)
     ========================= */
  const originalButton = document.getElementById('originalButton');   // 원시취득 버튼
  const originalModal = document.getElementById('originalModal');     // 원시취득 모달
  const confirmOriginalType = document.getElementById('confirmOriginalType'); // 확인 버튼

  // 원시취득 모달 열기 (모든 취득유형에 대해 열리도록)
  originalButton.addEventListener('click', () => {
    originalModal.style.display = 'flex';
  });

  // 원시취득 모달 확인 버튼 이벤트
  confirmOriginalType.addEventListener('click', () => {
    const assetValueNum = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
    if (isNaN(assetValueNum) || assetValueNum <= 0) {
      alert('유효한 금액을 입력하세요.');
      return;
    }
    console.log("[원시취득] assetValue:", assetValueNum);
    
    const selectedType = document.getElementById('realEstateType').value;
    let baseRate = 0.028; // 기본 세율 2.8%
    let appliedTaxRate = 2.8; // 숫자형, 나중에 문자열로 변환
    console.log("[원시취득] 초기 baseRate:", baseRate, " selectedType:", selectedType);
    
    if (selectedType === 'building') {
     const buildingTypeValue = document.getElementById('buildingType').value;
     if (buildingTypeValue === 'luxuryProperty') {
       const buildingAcqType = document.getElementById('buildingAcquisitionType').value;
       if ((buildingAcqType === 'forProfit' || buildingAcqType === 'nonProfit') &&
           document.getElementById('crowdedArea').value === 'yes') {
         if (document.getElementById('metropolitanArea').value === 'yes') {
           // 원시취득 일반 조건: 2.8% * 3 + 2% * 2 = 8.4% + 4% = 12.4%
           baseRate = 0.124;
           appliedTaxRate = "12.4%";
         } else if (document.getElementById('metropolitanArea').value === 'yes_relaxed') {
           // 완화 적용: (2.8%*3 - 4%) + (2%*2) = (8.4% - 4% + 4%) = 8.4%
           baseRate = 0.084;
           appliedTaxRate = "8.4%";
         } else {
           baseRate += 0.08;
           appliedTaxRate = 10.8;
         }
       } else {
         baseRate += 0.08;
         appliedTaxRate = 10.8;
       }
     }
   }
    
    // 주택 등 기타 유형은 기본 2.8% 적용
    else if (selectedType === 'land') {
     const landTypeValue = document.getElementById('landType').value;
     console.log("[원시취득] landTypeValue:", landTypeValue);
     if (landTypeValue === 'farmland') {
       baseRate = 0.03;
       appliedTaxRate = 3;
     } else if (landTypeValue === 'nonFarmland' || landTypeValue === 'sharedWaterReclamation') {
       baseRate = 0.04;
       appliedTaxRate = 4;
       console.log("[원시취득] 토지 - 중과 적용 전 baseRate:", baseRate);
       const landAcqType = document.getElementById('landAcquisitionType').value;
       console.log("[원시취득] landAcquisitionType:", landAcqType);
       if ((landAcqType === 'forProfit' || landAcqType === 'nonProfit') &&
           document.getElementById('landCrowdedArea').value === 'yes') {
         if (document.getElementById('landMetropolitanArea').value === 'yes') {
            baseRate = applyCongestionMultiplier(baseRate, 'land');
            appliedTaxRate = appliedTaxRate * 3;
         } else if (document.getElementById('landMetropolitanArea').value === 'yes_relaxed') {
            baseRate = applyCongestionMultiplier(baseRate, 'land') - 0.04;
            appliedTaxRate = appliedTaxRate * 3 - 4;
         }
       }
       console.log("[원시취득] 토지 - 중과 적용 후 baseRate:", baseRate);
       appliedTaxRate = appliedTaxRate + "%";
     } else {
       baseRate = 0.04;
       appliedTaxRate = "4%";
     }
   }

    const acquisitionTaxCalculated = Math.floor(assetValueNum * baseRate);
    console.log("[원시취득] 최종 baseRate:", baseRate, " acquisitionTaxCalculated:", acquisitionTaxCalculated);
    const acquisitionTaxField = document.getElementById('calculatedAcquisitionTax');
    if (acquisitionTaxField) {
      acquisitionTaxField.value = acquisitionTaxCalculated;
    }
    
    window.selectedAcquisitionMethod = "원시취득세";
    window.selectedAppliedTaxRate = appliedTaxRate + (typeof appliedTaxRate === "number" ? "%" : "");
    
    originalModal.style.display = 'none';
  });

  document.getElementById('closeOriginalModal').addEventListener('click', () => {
    originalModal.style.display = 'none';
  });

  /* 11. 월 단위로 날짜를 더하는 함수 */
  function addMonths(date, months) {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() !== day) {
      d.setDate(0);
    }
    return d;
  }
        
  /* 12. 계산하기 버튼: 최종 계산 (업데이트된 결과지 출력) */
  document.getElementById('calculateButton').addEventListener('click', () => {
    const assetTypeValue = document.getElementById('assetType').value;
    
    // ----------------------------
    // 부동산 외 자산 계산 (취득세 기본 2% 적용, 등록(면허)세 별도)
    // ----------------------------
    if (assetTypeValue !== "realEstate") {
      let assetValueNum = 0;
      let acquisitionTax = 0;
      let appliedTaxRate = "2%"; // 기본 2%
      let registrationTax = 0; // 등록(면허)세(건당)
  
      // 자산 유형에 따라 입력 필드 선택
      if (assetTypeValue === "vehicle" || assetTypeValue === "shipAircraft") {
        assetValueNum = parseInt(document.getElementById('vehiclePrice').value.replace(/,/g, '') || '0', 10);
      } else {
        // resource, timberland, membership 등은 realEstateValue 필드를 사용
        assetValueNum = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);
      }
      
      if (isNaN(assetValueNum) || assetValueNum <= 0) {
        alert('유효한 금액을 입력하세요.');
        return;
      }
      
      // 기본 취득세 2% 적용
      acquisitionTax = Math.floor(assetValueNum * 0.02);
      
      // 각 자산 유형별 추가 등록(면허)세 적용
      if (assetTypeValue === "timberland") {
        // 입목: 등록세 12,000원 추가
        registrationTax = 12000;
        acquisitionTax += registrationTax;
      } else if (assetTypeValue === "resource") {
        // 광업권·어업권·양식어업권: 등록면허세 135,000원 추가
        registrationTax = 135000;
        acquisitionTax += registrationTax;
      }
      // membership (골프회원권)은 등록세 없음
  
      window.selectedAcquisitionMethod = "취득세";
      window.selectedAppliedTaxRate = appliedTaxRate;
      
      // 부가세 계산 (예: 지방교육세, 농어촌특별세) – (예시)
      const computedEducationTax = Math.floor(assetValueNum * (0.04 - 0.02) * 0.20);
      const computedRuralTax = Math.floor(assetValueNum * 0.02 * 0.10);
      const baseTotalTax = acquisitionTax + computedEducationTax + computedRuralTax;
      
      // 신고일 및 신고 기한에 따른 가산세 계산 (기존 로직 그대로)
      const reportDeadlineSelect = document.getElementById('reportDeadline');
      let allowedDeadline;
      function getLastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
      }
      
      // 취득일은 부동산 계산과 동일한 입력 필드(예: acquisitionDate)
      const acquisitionDateInput = document.getElementById('acquisitionDate').value;
      if (!acquisitionDateInput) {
        alert('취득일을 입력해주십시오.');
        return;
      }
      const baseAcquisitionDate = new Date(acquisitionDateInput);
      console.log("취득일:", baseAcquisitionDate);
      
      if (reportDeadlineSelect.value === '60days') {
        allowedDeadline = new Date(baseAcquisitionDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      } else if (reportDeadlineSelect.value === '3months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 3);
      } else if (reportDeadlineSelect.value === '6months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 6);
      } else if (reportDeadlineSelect.value === '9months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 9);
      } else {
        allowedDeadline = new Date(baseAcquisitionDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      }
      console.log("허용 신고 기한:", allowedDeadline);
      
      const reportDateInput = document.getElementById('reportDate').value;
      let basePenalty = 0, delayPenalty = 0, totalPenalty = 0, finalPenalty = 0;
      let discountRateText = "없음";
      let lateDays = 0;
      
      if (reportDateInput) {
        const reportDate = new Date(reportDateInput);
        console.log("신고일:", reportDate);
        if (reportDate > allowedDeadline) {
          const diffTime = reportDate.getTime() - allowedDeadline.getTime();
          lateDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
          console.log("초과일수:", lateDays);
          basePenalty = acquisitionTax * 0.2;
          delayPenalty = acquisitionTax * (lateDays * 0.00022);
          totalPenalty = basePenalty + delayPenalty;
          
          let discountFactor = 1.0;
          if (lateDays <= 30) {
            discountFactor = 0.5;
            discountRateText = "50% 감경";
          } else if (lateDays <= 90) {
            discountFactor = 0.7;
            discountRateText = "30% 감경";
          } else if (lateDays <= 180) {
            discountFactor = 0.8;
            discountRateText = "20% 감경";
          } else {
            discountFactor = 1.0;
            discountRateText = "감경 없음";
          }
          finalPenalty = Math.floor(totalPenalty * discountFactor);
        } else {
          finalPenalty = 0;
          discountRateText = "없음";
        }
      } else {
        finalPenalty = 0;
        discountRateText = "없음";
      }
      
      const totalTax = baseTotalTax + finalPenalty;
      
      // ---------------------------
      // 결과 출력: 취득세, 지방교육세, 농어촌특별세, 그리고 가산세 내역 출력
      // ---------------------------
      let penaltyHTML = "";
      if (finalPenalty > 0) {
        penaltyHTML = `
          <p>무신고 가산세: ${basePenalty.toLocaleString()} 원</p>
          <p>지연 가산세: ${delayPenalty.toLocaleString()} 원</p>
          <p>감경율: ${discountRateText}</p>
          <p>최종 가산세: ${finalPenalty.toLocaleString()} 원</p>
          <p>신고기한 초과 경과일: ${lateDays} 일</p>
        `;
      } else {
        penaltyHTML = `<p>가산세: 없음</p>`;
      }
      
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `
          <h3>계산 결과</h3>
          <p>${window.selectedAcquisitionMethod}: ${acquisitionTax.toLocaleString()} 원 (적용 세율: ${window.selectedAppliedTaxRate})</p>
          ${ registrationTax ? `<p>등록(면허)세: ${registrationTax.toLocaleString()} 원 (건당)</p>` : "" }
          <p>지방교육세: ${computedEducationTax.toLocaleString()} 원</p>
          <p>농어촌특별세: ${computedRuralTax.toLocaleString()} 원</p>
          ${ finalPenalty > 0 ? `
          <hr>
          <p>무신고 가산세: ${basePenalty.toLocaleString()} 원</p>
          <p>지연 가산세: ${delayPenalty.toLocaleString()} 원</p>
          <p>감경율: ${discountRateText}</p>
          <p>최종 가산세: ${finalPenalty.toLocaleString()} 원</p>
          <p>신고기한 초과 경과일: ${lateDays} 일</p>
          ` : "" }
          <hr>
          <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
      `;
      return; // 부동산 외 자산 처리 완료
    }
    // ----------------------------
    // 부동산 계산 (이전 결과지 사용)
    // ----------------------------
    else {
      const acquisitionMethod = window.selectedAcquisitionMethod || "";
      let acquisitionDateInput = "";
      
      if (acquisitionMethod === "매매취득세") {
        acquisitionDateInput = document.getElementById('acquisitionDate').value;
      } else if (acquisitionMethod === "증여취득세") {
        acquisitionDateInput = document.getElementById('giftAcquisitionDate').value;
      } else if (acquisitionMethod === "상속취득세") {
        acquisitionDateInput = document.getElementById('inheritanceAcquisitionDate').value;
      } else if (acquisitionMethod === "원시취득세") {
        acquisitionDateInput = document.getElementById('originalAcquisitionDate').value;
      }
      
      if (!acquisitionDateInput) {
        alert('취득일을 입력해주십시오.');
        return;
      }
      
      const baseAcquisitionDate = new Date(acquisitionDateInput);
      console.log("취득일:", baseAcquisitionDate);
      
      // ---------------------------
      // 숨겨진 필드에서 취득세 불러오기 및 검증
      // ---------------------------
      const acquisitionTaxElement = document.getElementById('calculatedAcquisitionTax');
      if (!acquisitionTaxElement || acquisitionTaxElement.value === "") {
        alert('모달에서 취득세를 계산해주세요.');
        return;
      }
      
      const acquisitionTax = parseInt(acquisitionTaxElement.value, 10);
      if (isNaN(acquisitionTax) || acquisitionTax <= 0) {
        alert('유효한 취득세 값이 없습니다.');
        return;
      }
  
      // ---------------------------
      // 부가세 계산 (예: 지방교육세, 농어촌특별세) - 수정된 로직
      // ---------------------------
      const assetValueNum = parseInt(document.getElementById('realEstateValue').value.replace(/,/g, '') || '0', 10);  
      let standardRate = 0.04;
      const computedEducationTax = Math.floor(assetValueNum * (standardRate - 0.02) * 0.20);
      const computedRuralTax = Math.floor(assetValueNum * 0.02 * 0.10);
      const baseTotalTax = acquisitionTax + computedEducationTax + computedRuralTax;
    
      // ---------------------------
      // 신고일 및 신고 기한에 따른 가산세 계산 (업데이트된 코드)
      // ---------------------------
      const reportDeadlineSelect = document.getElementById('reportDeadline');
      let allowedDeadline;
    
      function getLastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
      }
    
      if (reportDeadlineSelect.value === '60days') {
        allowedDeadline = new Date(baseAcquisitionDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      } else if (reportDeadlineSelect.value === '3months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 3);
      } else if (reportDeadlineSelect.value === '6months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 6);
      } else if (reportDeadlineSelect.value === '9months') {
        allowedDeadline = addMonths(getLastDayOfMonth(baseAcquisitionDate), 9);
      } else {
        allowedDeadline = new Date(baseAcquisitionDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      }
      console.log("허용 신고 기한:", allowedDeadline);
    
      const reportDateInput = document.getElementById('reportDate').value;
      let basePenalty = 0, delayPenalty = 0, totalPenalty = 0, finalPenalty = 0;
      let discountRateText = "없음";
      let lateDays = 0;
    
      if (reportDateInput) {
        const reportDate = new Date(reportDateInput);
        console.log("신고일:", reportDate);
        if (reportDate > allowedDeadline) {
          const diffTime = reportDate.getTime() - allowedDeadline.getTime();
          lateDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
          console.log("초과일수:", lateDays);
        
          basePenalty = acquisitionTax * 0.2;
          delayPenalty = acquisitionTax * (lateDays * 0.00022);
          totalPenalty = basePenalty + delayPenalty;
        
          let discountFactor = 1.0;
          if (lateDays <= 30) {
            discountFactor = 0.5;
            discountRateText = "50% 감경";
          } else if (lateDays <= 90) {
            discountFactor = 0.7;
            discountRateText = "30% 감경";
          } else if (lateDays <= 180) {
            discountFactor = 0.8;
            discountRateText = "20% 감경";
          } else {
            discountFactor = 1.0;
            discountRateText = "감경 없음";
          }
          finalPenalty = Math.floor(totalPenalty * discountFactor);
        } else {
          finalPenalty = 0;
          discountRateText = "없음";
        }
      } else {
        finalPenalty = 0;
        discountRateText = "없음";
      }
    
      const totalTax = baseTotalTax + finalPenalty;
    
      // ---------------------------
      // 결과 출력: 취득세, 지방교육세, 농어촌특별세, 그리고 가산세 내역 출력
      // ---------------------------
      let penaltyHTML = "";
      if (finalPenalty > 0) {
        penaltyHTML = `
          <p>무신고 가산세: ${basePenalty.toLocaleString()} 원</p>
          <p>지연 가산세: ${delayPenalty.toLocaleString()} 원</p>
          <p>감경율: ${discountRateText}</p>
          <p>최종 가산세: ${finalPenalty.toLocaleString()} 원</p>
          <p>신고기한 초과 경과일: ${lateDays} 일</p>
        `;
      } else {
        penaltyHTML = `<p>가산세: 없음</p>`;
      }
    
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `
          <h3>계산 결과</h3>
          <p>${window.selectedAcquisitionMethod || "취득세"}: ${acquisitionTax.toLocaleString()} 원 (적용 세율: ${window.selectedAppliedTaxRate || "0%"})</p>
          <p>지방교육세: ${computedEducationTax.toLocaleString()} 원</p>
          <p>농어촌특별세: ${computedRuralTax.toLocaleString()} 원</p>
          <hr>
          ${penaltyHTML}
          <hr>
          <p><strong>총 세금: ${totalTax.toLocaleString()} 원</strong></p>
      `;
    }
  }); // <-- calculateButton 이벤트 끝

}); // <-- DOMContentLoaded 이벤트 끝
