import {html, LitElement} from 'lit';
import '../commons/common.css';
import {customElement} from 'lit/decorators.js';


import '/assets/css/Input.css';
import {classMap} from "lit/directives/class-map.js";
import {ifDefined} from "lit/directives/if-defined.js";

@customElement('l-c-monthpicker')
class LMonthpicker extends LitElement {

    constructor() {
        super();
        this._isOpen = false;
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
            showAlways: {type: Boolean},
            invisible: {type: Boolean},
        };
    }


    firstUpdated() {
        const wrapperId = `${this['id']}-wrapper`;
        const inputId = `${this['id']}-input`;
        const format = this['format'] || 'yyyy-MM';


        // TOAST UI DatePicker 초기화
        // datePicker를 인스턴스 변수로 저장 가능 (필요 시 접근)
        this.datePicker = new DatePicker(`#${wrapperId}`, {
            // date: new Date(),
            type: 'month',
            input: {
                element: `#${inputId}`,
                format: format,
            },
            showAlways: this['showAlways']
        });

        this.setValue(this['value']);

        this.datePicker.on('change', (_) => {
            this.validate();
        });
        this.datePicker.on('open', (_) => {
            this._isOpen = true;
        });
        this.datePicker.on('close', (_) => {
            this._isOpen = false;
        });
    }

    getValue() {
        const inputId = `${this['id']}-input`;

        const inputElement = this.querySelector(`#${inputId}`);
        return inputElement ? inputElement.value : null;
    }

    setValue(value) {
        if (this.datePicker && value) {
            const format = this['format'] || 'yyyy-MM'; // 포맷 확인 및 기본값

            // 날짜 형식 검사
            const dateFormatRegex = this._getDateFormatRegex(format); // 포맷별 정규식
            if (!dateFormatRegex || !dateFormatRegex.test(value)) {
                console.error(`id : ${this['id']} >> Invalid date format: ${value}. Expected format is ${format}.`);
                return; // 유효하지 않은 경우 처리 중단
            }

            // Date 객체 변환
            const newDate = this._parseDateStrByFormat(value, format);
            if (!newDate || isNaN(newDate)) { // 날짜 변환 실패 시
                console.error(`id : ${this['id']} >> Invalid date value: ${value}.`);
                return; // 유효하지 않은 경우 처리 중단
            }

            // 유효한 경우 DatePicker에 값 설정
            this.datePicker.setDate(newDate);
        }
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

    _parseDateStrByFormat(value, format) {
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


    _handleClick = (_) => {
        if(this._isOpen)
            this.datePicker.close();
        else
            this.datePicker.open();
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
                            class="${
                                    classMap({
                                        'form-left-label': (isLabelLeft && this['label']),
                                        'form-label': !(isLabelLeft && this['label']),
                                        'hidden' : this['invisible']
                                    })
                            }"
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
                    <div class="search-input-container">
                        <!-- Wrapper 영역 -->
                        <div class="input-container">
                            <input type="text"
                                   class="${classMap({
                                       'form-control': true,
                                       'form-left-control': isLabelLeft,
                                       'form-control-lg': this['size'] === 'large',
                                       'form-control-sm': this['size'] === 'small',
                                       'input-right' : true,
                                       'hidden' : this['invisible']
                                   })}"
                                   id="${inputId}"
                                   name="${ifDefined(this['name'])}"
                                   aria-label="Date-Time"
                                   ?required=${this['required']}
                                   ?disabled=${this['disabled']}
                                   ?readonly=${this['readonly']}
                                   @blur="${this.validate}"
                                   autocomplete="off"
                            >
                            <div @click="${this._handleClick}"
                                 class="icon-right ${this.value ? '' : 'hidden'}"
                                 id="rightIcon"></div>
                        </div>
                        <div id="${wrapperId}" style="margin-top: -1px;position: absolute; z-index: 9999;"></div>
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
        const dateObj = this.datePicker.getDate();        // DatePicker의 현재 값 (Date 객체) 가져오기

        if (!dateObj) {
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
        const inputId = `${this['id']}-input`;
        const feedbackId = `${this['id']}-feedback`;
        const value = this.getValue().trim();
        const $feedbackElement = this.querySelector(`#${feedbackId}`);
        const $inputElement = this.querySelector(`#${inputId}`);
        const isFlag = this.isValid(value, this['format'], this['required']);
        const feedbackVisibleType = this['feedback-visible-type'];


        $inputElement.classList.toggle('is-invalid', !isFlag); // Toggle 'is-invalid' based on validity

        if (feedbackVisibleType == 'visible') {
            return;
        }

        $feedbackElement.setAttribute('hidden', true); // Assume hidden first
        if ((isFlag && feedbackVisibleType == 'valid') || (!isFlag && feedbackVisibleType == 'invalid')) {
            $feedbackElement.removeAttribute('hidden');
        }
    }

    checkValidity() {
        this.validate();
    }

    initCurrentMonth() {
        const format = this['format'] || 'yyyy-MM';
        const today = new Date();
        const todayStr = this._parseDateByFormat(today, format);
        this.value = todayStr;
        this.text = todayStr;
        if (this.datePicker) {
            this.datePicker.setDate(today);
        }
    }

}