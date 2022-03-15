'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const single = document.querySelector('#Single'),
          dual = document.querySelector('#Dual'),
          quad = document.querySelector('#Quad'),
          stock = document.querySelector('#Instock'),
          videoCard = document.querySelector('#GPUavailable'),
          resetButton = document.querySelector(".reset-filter"),
          filters = document.querySelector('.filters'),
          filterButton = document.querySelector('.level__filter-hide-btn'),
          filterButtonSpan = document.querySelector('.level__filter-hide-btn-span'),
          server = document.querySelectorAll('.company-box__body-line'),
          filtersBox = document.querySelector('.filters-box'),
        //   spansOne = document.querySelectorAll('.el-switch'),
          coreTypes = [single, dual, quad,];
    let sliderCoreOne = document.querySelector("#slidercore1"),
        sliderCoreTwo = document.querySelector("#slidercore2"),
        displayCoreValOne = document.querySelector('#rangecore1'),
        displayCoreValTwo = document.querySelector('#rangecore2'),
        sliderCoreTrack = document.querySelector('[data-Track="core"]'),
        sliderCoreMaxValue = document.querySelector("#slidercore1").max,
        minCoreGap = 4,
        sliderRamOne = document.querySelector("#sliderRAM1"),
        sliderRamTwo = document.querySelector("#sliderRAM2"),
        displayRamValOne = document.querySelector('#rangeRAM1'),
        displayRamValTwo = document.querySelector('#rangeRAM2'),
        sliderRamTrack = document.querySelector('[data-Track="ram"]'),
        sliderRamMaxValue = document.querySelector("#sliderRAM1").max,
        minRamGap = 128;
        
    function activeResetButton () {
        if(single.classList.contains('el-switch__core-checked') || dual.classList.contains('el-switch__core-checked') || quad.classList.contains('el-switch__core-checked') || stock.classList.contains('el-switch__core-checked') || videoCard.classList.contains ('el-switch__core-checked') || sliderCoreOne.value >= 8 || sliderCoreTwo.value <= 48 || sliderRamOne.value >= 32 || sliderRamTwo.value <= 1520) {
            resetButton.classList.add('reset-filter_active');
        } else {
            resetButton.classList.remove('reset-filter_active');
        }
    }
    function toggleSpan(i = 0) {
        coreTypes.forEach(item => {
            item.classList.remove('el-switch__core-checked');
        });
        coreTypes[i].classList.add('el-switch__core-checked');
    }
    coreTypes.forEach((items, i) => {
        items.addEventListener('click', () => {
            // items.classList.toggle('el-switch__core-checked');
            toggleSpan(i);
            activeResetButton();
            serverFilter();
        });
    });
    stock.addEventListener('click', () => {
        stock.classList.toggle('el-switch__core-checked');
        activeResetButton();
        serverFilter();
    });
    videoCard.addEventListener('click', () => {
        videoCard.classList.toggle('el-switch__core-checked');
        activeResetButton();
        serverFilter();
    });

    resetButton.addEventListener('click', () => {
        if(single.classList.contains('el-switch__core-checked') || dual.classList.contains('el-switch__core-checked') || quad.classList.contains('el-switch__core-checked') || stock.classList.contains('el-switch__core-checked') || videoCard.classList.contains ('el-switch__core-checked') || sliderCoreOne.value >= 8 || sliderCoreTwo.value <= 48 || sliderRamOne.value >= 32 || sliderRamTwo.value <= 1520) {
            coreTypes.forEach(items => {
                items.classList.remove('el-switch__core-checked');
            });
            stock.classList.remove('el-switch__core-checked');
            videoCard.classList.remove('el-switch__core-checked');
            sliderCoreOne.value = 4;
            sliderCoreTwo.value = 52;
            sliderRamOne.value = 16;
            sliderRamTwo.value = 1536;
            slideCoreOne();
            slideCoreTwo();
            slideRamOne();
            slideRamTwo();
            server.forEach(item => {
                item.style.display = 'flex';
            });
            resetButton.classList.remove('reset-filter_active');
        }
    });

    function hideFilter () {
        filters.classList.remove('show');
        filters.classList.add('hide');
    }
    function showFilter () {
            filters.classList.remove('hide');
            filters.classList.add('show');
    }
    filterButton.addEventListener('click', () => {
        if(filters.classList.contains('show')) {
            hideFilter();
            filterButtonSpan.textContent = 'Show filters';
        } else {
            showFilter();
            filterButtonSpan.textContent = 'Hide filters';
        }
    });

    function serverFilter() { 
        server.forEach(item => {
            let cores,
            ram,
            type,
            available,
            gpu;
            available = +item.getAttribute('data-stock');
            gpu = +item.getAttribute('data-gpu');
            ram = +item.getAttribute('data-ram');
            cores = +item.getAttribute('data-cores');
            type = +item.getAttribute('data-type');
            if(cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value) {
                item.style.display = 'flex';
                } else {
                item.style.display = 'none';
            }
            if(stock.classList.contains('el-switch__core-checked')) {
                if(stock.classList.contains('el-switch__core-checked')) {
                    if(available >= 1 && gpu >= 0 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(stock.classList.contains('el-switch__core-checked') && videoCard.classList.contains('el-switch__core-checked')) {
                    if(available >= 1 && gpu == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
            if(videoCard.classList.contains('el-switch__core-checked')) {
                if(videoCard.classList.contains('el-switch__core-checked')) {
                    if(available >= 0 && gpu >= 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(stock.classList.contains('el-switch__core-checked') && videoCard.classList.contains('el-switch__core-checked')) {
                    if(available >= 1 && gpu == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
            if(single.classList.contains('el-switch__core-checked')) {
                if(single.classList.contains('el-switch__core-checked')) {
                    if(type == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(stock.classList.contains('el-switch__core-checked') && single.classList.contains('el-switch__core-checked')) {
                    if(type === 1 &&  available >= 1 && gpu >= 0 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && single.classList.contains('el-switch__core-checked')) {
                    if(type === 1 &&  available >= 0 && gpu == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                        
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && single.classList.contains('el-switch__core-checked') && stock.classList.contains('el-switch__core-checked')) {
                    if(type === 1 &&  available >= 1 && gpu >= 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
            if(dual.classList.contains('el-switch__core-checked')) {
                if(dual.classList.contains('el-switch__core-checked')) {
                    if(type == 2 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(stock.classList.contains('el-switch__core-checked') && dual.classList.contains('el-switch__core-checked')) {
                    if(type === 2 &&  available >= 1 && gpu >= 0 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                        console.log(available);
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && dual.classList.contains('el-switch__core-checked')) {
                    if(type === 2 &&  available >= 0 && gpu == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && dual.classList.contains('el-switch__core-checked') && stock.classList.contains('el-switch__core-checked')) {
                    if(type === 4 &&  available >= 1 && gpu >= 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
            if(quad.classList.contains('el-switch__core-checked')) {
                if(quad.classList.contains('el-switch__core-checked')) {
                    if(type == 4 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                        console.log(type);
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(stock.classList.contains('el-switch__core-checked') && quad.classList.contains('el-switch__core-checked')) {
                    if(type === 4 &&  available >= 1 && gpu >= 0 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                        console.log(available);
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && quad.classList.contains('el-switch__core-checked')) {
                    if(type === 4 &&  available >= 0 && gpu == 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
                if(videoCard.classList.contains('el-switch__core-checked') && quad.classList.contains('el-switch__core-checked') && stock.classList.contains('el-switch__core-checked')) {
                    if(type === 4 &&  available >= 1 && gpu >= 1 && cores >= sliderCoreOne.value && cores <= sliderCoreTwo.value && ram >= sliderRamOne.value && ram <= sliderRamTwo.value){
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            }
        });
    }
    function slideCoreOne(){
        if(parseInt(sliderCoreTwo.value) - parseInt(sliderCoreOne.value) <= minCoreGap){
            sliderCoreOne.value = parseInt(sliderCoreTwo.value) - minCoreGap;
        }
        displayCoreValOne.textContent = `${sliderCoreOne.value} cores`;
        serverFilter();
        fillCoreColor();
        activeResetButton();
    }
    function slideCoreTwo(){
        if(parseInt(sliderCoreTwo.value) - parseInt(sliderCoreOne.value) <= minCoreGap){
            sliderCoreTwo.value = parseInt(sliderCoreOne.value) + minCoreGap;
        }
        displayCoreValTwo.textContent = `${sliderCoreTwo.value} cores`;
        serverFilter();
        fillCoreColor();
        activeResetButton();

    }
    function fillCoreColor(){
        let percent1 = (sliderCoreOne.value / sliderCoreMaxValue) * 100;
        let percent2 = (sliderCoreTwo.value / sliderCoreMaxValue) * 100;
        sliderCoreTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #0dd149 ${percent1}% , #0dd149 ${percent2}%, #dadae5 ${percent2}%)`;
    }
    sliderCoreOne.addEventListener('input',slideCoreOne);
    sliderCoreTwo.addEventListener('input',slideCoreTwo);
    fillCoreColor();

    function slideRamOne(){
        if(parseInt(sliderRamTwo.value) - parseInt(sliderRamOne.value) <= minRamGap){
            sliderRamOne.value = parseInt(sliderRamTwo.value) - minRamGap;
        }
        displayRamValOne.textContent = `${sliderRamOne.value} GB`;
        serverFilter();
        fillRamColor();
        activeResetButton();
    }
    function slideRamTwo(){
        if(parseInt(sliderRamTwo.value) - parseInt(sliderRamOne.value) <= minRamGap){
            sliderRamTwo.value = parseInt(sliderRamOne.value) + minRamGap;
        }
        displayRamValTwo.textContent = `${sliderRamTwo.value} GB`;
        serverFilter();
        fillRamColor();
        activeResetButton();
    }
    function fillRamColor(){
        let percent1 = (sliderRamOne.value / sliderRamMaxValue) * 100;
        let percent2 = (sliderRamTwo.value / sliderRamMaxValue) * 100;
        sliderRamTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #0dd149 ${percent1}% , #0dd149 ${percent2}%, #dadae5 ${percent2}%)`;
    }
    sliderRamOne.addEventListener('input',slideRamOne);
    sliderRamTwo.addEventListener('input',slideRamTwo);
    fillRamColor();
});