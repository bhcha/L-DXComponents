import {html, LitElement} from 'lit';
import '../commons/common.css';
import {customElement} from 'lit/decorators.js';


import '/assets/css/Input.css';
import {classMap} from "lit/directives/class-map.js";

@customElement('l-c-range-monthpicker')
class LRangemonthpicker extends LitElement {

    constructor() {
        super();
    }

    // Shadow DOM을 사용하지 않거나, 외부 DOM 요소에 접근할 수 있도록 설정
    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
            size: {type: String},

            format: {type: String},

            // label properties
            label: {type: String},
            'label-align': {type: String},
            'label-width': {type: String},
            'label-text-align': {type: String},

            // feedback properties
            feedback: {type: String},
            'feedback-type': {type: String},
            'feedback-visible-type': {type: String},

            // input properties
            width: {type: String},
            required: {type: Boolean},
            disabled: {type: Boolean},
            readonly: {type: Boolean},
            value: {type: String},

            'rel-year': {type: Number},
            'rel-month': {type: Number},
            'rel-mode': {type: String},
            'start-year-offset': {type: Number},
            'start-month-offset': {type: Number},
        };
    }



    firstUpdated() {
        const wrapperId = `${this['id']}-wrapper`;
        const inputId = `${this['id']}-input`;
        const format = this['format'] || 'yyyy-MM';
        const relYear = this['rel-year'];
        const relMonth = this['rel-month'];

        const startYearOffset = this['start-year-offset'];
        const startMonthOffset = this['start-month-offset'];
        const relMode = this['rel-mode'];

        const today = new Date();
        if(startYearOffset) {
            today.setFullYear(today.getFullYear() + startYearOffset);
        }
        console.log("startMonthOffset", startMonthOffset);
        if(startMonthOffset) {
            today.setMonth(today.getMonth() + startMonthOffset);
        }

        const calculateRange = (baseDate) => {
            if (relYear === null && relMonth === null) return [];

            return [
                [
                    baseDate,
                    new Date(
                        baseDate.getFullYear() + (relYear || 0),
                        baseDate.getMonth() + (relMonth || 0),
                        baseDate.getDate()
                    )
                ]
            ];
        };

        this.datePicker = DatePicker.createRangePicker({
            type: 'month',
            startpicker: {
                date: today,
                input: `#${inputId}-from`,
                container: `#${wrapperId}-from`
            },
            endpicker: {
                date: today,
                input: `#${inputId}-to`,
                container: `#${wrapperId}-to`
            },
            selectableRanges: calculateRange(today),
            format: format
        });

        this.datePicker.on('change:end', () => {
            this.validate();
        });

        if(relMode == 'dynamic') {
            this.datePicker.on('change:start', () => {
                const selectedDate = this.getFromValue();
                const newDate = this._parseDateStrByFormat(selectedDate, this['format']);
                if (newDate) {
                    const newRanges = calculateRange(newDate);
                    if (newRanges) {
                        this.datePicker.setRanges(newRanges);

                        // endpicker의 날짜가 새로운 범위를 벗어나면 초기화
                        const endDate = this.datePicker.getEndDate();
                        if (endDate && endDate > newRanges[1]) {
                            this.datePicker.setEndDate(null);
                        }
                    }
                }
            });
        }

    }


    getValue(type) {
        const inputId = `${this['id']}-input-${type}`;

        const inputElement = this.querySelector(`#${inputId}`);
        return inputElement ? inputElement.value : null;
    }

    getFromValue() {
        return this.getValue('from');
    }

    getToValue() {
        return this.getValue('to');
    }

    setDate(type, value) {
        if (this.datePicker && value) {
            const format = this['format'] || 'yyyy-MM'; // 포맷 확인 및 기본값

            // 날짜 형식 검사
            const dateFormatRegex = this._getDateFormatRegex(format);
            if (!dateFormatRegex || !dateFormatRegex.test(value)) {
                console.error(`id : ${this['id']} >> Invalid date format: ${value}. Expected format is ${format}.`);
                return; // 유효하지 않은 경우 처리 중단
            }

            // Date 객체 변환
            const newDate = this._parseDateStrByFormat(value, format);
            if (!newDate || isNaN(newDate)) {
                console.error(`id : ${this['id']} >> Invalid date value: ${value}.`);
                return; // 유효하지 않은 경우 처리 중단
            }

            // 유효한 경우 DatePicker에 값 설정
            if (type === 'start') {
                this.datePicker.setStartDate(newDate);
            } else if (type === 'end') {
                this.datePicker.setEndDate(newDate);
            } else {
                console.error(`id : ${this['id']} >> Unknown date type: ${type}`);
            }
        }
    }

    setToValue(value) {
        this.setDate('end', value);
    }

    setFromValue(value) {
        this.setDate('start', value);
    }

    _getDateFormatRegex(format) {
        switch (format) {
            case 'yyyy-MM':
                return /^\d{4}-\d{2}$/;
            case 'yyyy/MM':
                return /^\d{4}\/\d{2}$/;
            case 'yyyyMM':
                return /^\d{6}$/;
            default:
                console.error(`Unsupported format: ${format}`);
                return null;
        }
    }

    _parseDateStrByFormat(value, format = 'yyyy-MM') {
        let parts = null;

        switch (format) {
            case 'yyyy-MM': // '-' 구분자로 처리
                parts = value.split('-');
                return new Date(parts[0], parts[1] - 1);
            case 'yyyy/MM': // '/' 구분자로 처리
                parts = value.split('/');
                return new Date(parts[0], parts[1] - 1);
            case 'yyyyMM': // 연속 문자열 처리
                return new Date(
                    value.substring(0, 4),
                    value.substring(4, 6) - 1
                );
            default:
                console.error(`Unsupported format: ${format}`);
                return null;
        }
    }

    _parseDateByFormat(date, format) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');

        switch (format) {
            case 'yyyy-MM':
                return `${year}-${month}`;
            case 'yyyy/MM':
                return `${year}/${month}`;
            case 'yyyyMM':
                return `${year}${month}`;
            default:
                console.error(`Unsupported format: ${format}`);
                return '';
        }
    }

    render() {
        const wrapperId = `${this['id']}-wrapper`;
        const inputId = `${this['id']}-input`;
        const feedbackId = `${this['id']}-feedback`;

        let isLabelLeft = (this['label-align'] && this['label-align'] === 'left');

        const feedbackHtml = {
                'normal': html`
                    <div class="valid-feedback">${this['feedback']}</div>`,
                'hint': html`
                    <div class="form-group"><small class="form-hint form-text text-muted">${this['feedback']}</small>
                    </div>`,
                'error': html`
                    <div class="invalid-feedback">${this['feedback']}</div>`
            }
        ;

        return html`
            <div
                    style="width: ${this['width'] ? this['width'] : 'auto'}"
            >
                <div
                        class="${
                                classMap({
                                    'container': isLabelLeft
                                })
                        }"
                >
                    <label
                            class="${(isLabelLeft && this['label']) ? 'form-left-label' : 'form-label'}"
                            for="${this['id']}"
                            style="
                        width: ${this['label-width'] || 'auto'};
                        text-align: ${this['label-text-align'] || 'left'}
                    "
                    >
                        ${this['required']
                                ? (isLabelLeft
                                        ? html`<span style="color: #df1414;margin-right: 2px">*</span>${this['label']}`
                                        : html`${this['label']}<span style="color: #df1414;margin-left: 2px">*</span>`)
                                : this['label']}
                    </label>
                    <div class="">
                        <!-- Wrapper 영역 -->
                        <div class="input-group input-daterange" id="datepicker-range">
                            <div class="input-container is-flex">
                                <input type="text"
                                       class="${classMap({
                                           'form-control': true,
                                           'right-border' : true,
                                           'form-control-lg': this['size'] === 'large',
                                           'form-control-sm': this['size'] === 'small',
                                       })}"
                                       name="${inputId}-from"
                                       id="${inputId}-from"
                                       ?required=${this['required']}
                                       ?disabled=${this['disabled']}
                                       ?readonly=${this['readonly']}
                                       placeholder="from date"
                                       @blur="${this.validate}"
                                       autocomplete="off"
                                >
                                <div id="${wrapperId}-from"
                                     style="margin-top: -1px;position: absolute; z-index: 9999;"></div>
                            </div>
                            <span 
                                  class="${classMap({
                                      'input-group-text': true,
                                      'right-border' : true,
                                      'left-border' : true,
                                      'form-control-lg': this['size'] === 'large',
                                      'form-control-sm': this['size'] === 'small',
                                  })}"
                            >to</span>
                            <div class="input-container is-flex">
                                <input type="text"
                                       class="${classMap({
                                           'form-control': true,
                                           'left-border' : true,
                                           'form-control-lg': this['size'] === 'large',
                                           'form-control-sm': this['size'] === 'small',
                                       })}"
                                       name="${inputId}-to"
                                       id="${inputId}-to"
                                       ?required=${this['required']}
                                       ?disabled=${this['disabled']}
                                       ?readonly=${this['readonly']}
                                       placeholder="to date"
                                       @blur="${this.validate}"
                                       autocomplete="off"
                                >
                                <div id="${wrapperId}-to"
                                     style="margin-top: -1px;position: absolute; z-index: 9999;"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div
                    id="${feedbackId}"
                    style="
                    padding-left: calc(${this['label-width']} + ${isLabelLeft ? `15px` : '0px'})
                    ;width: ${this['width'] ? this['width'] : 'auto'}
                    ;display: flex;   
                "
            >
                ${feedbackHtml[this['feedback-type']]}

            </div>

        `;
    }

    isValid(value, format = 'yyyy-MM', required) {
        if (!value) {
            if (required) {
                console.error("Validation failed: Value is required but missing.");
                return false;
            }
        }

        const dateFormatRegex = this._getDateFormatRegex(format); // 포맷별 정규식
        if (value && (!dateFormatRegex || !dateFormatRegex.test(value))) {
            console.error(`Invalid date format: ${value}. Expected format is ${format}.`);
            return false; // 유효하지 않은 경우 처리 중단
        }

        // 모든 조건 충족
        return true;
    }


    validate() {
        const fromInputId = `${this['id']}-input-from`;
        const toInputId = `${this['id']}-input-to`;
        const feedbackId = `${this['id']}-feedback`;
        const $feedbackElement = this.querySelector(`#${feedbackId}`);
        const $fromInputElement = this.querySelector(`#${fromInputId}`);
        const $toInputElement = this.querySelector(`#${toInputId}`);

        const startDate = this.getValue('from');
        const endDate = this.getValue('to');

        const isStartFlag = this.isValid(startDate, this['format'], this['required']);
        const isEndFlag = this.isValid(endDate, this['format'], this['required']);
        const feedbackVisibleType = this['feedback-visible-type'];

        $fromInputElement.classList.toggle('is-invalid', !isStartFlag); // Toggle 'is-invalid' based on validity
        $toInputElement.classList.toggle('is-invalid', !isEndFlag); // Toggle 'is-invalid' based on validity

        if (feedbackVisibleType == 'visible') {
            return;
        }

        $feedbackElement.setAttribute('hidden', true); // Assume hidden first
        if ((isStartFlag && isEndFlag && feedbackVisibleType == 'valid') || (!isStartFlag && isEndFlag && feedbackVisibleType == 'invalid')) {
            $feedbackElement.removeAttribute('hidden');
        }
    }

    checkValidity() {
        this.validate();
    }

    initFromCurrentMonth() {
        const format = this['format'] || 'yyyy-MM';
        const today = new Date();
        const todayStr = this._parseDateByFormat(today, format);
        this.value = todayStr;
        this.text = todayStr;
        if (this.datePicker) {
            this.datePicker.setStartDate(today);
        }
    }

}