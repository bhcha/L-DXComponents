import '/src/components/input/Datepicker.js'
import {html} from "lit";
import {ifDefined} from 'lit/directives/if-defined.js';
import {argsCommons, argsValue, argsSize, argsLabel, argsFeedback} from "./commons/CommonArgs.js";


export default {
    title: 'LABEL & FEEDBACK & COMPONENTS/Datepicker',
    tags: ['autodocs'],
    component: 'l-c-datepicker',
    // decorators: [(story) => html`<div style="margin: 1em">${story()}</div>`],
    argTypes: {
        ...argsCommons, ...argsValue, ...argsSize,
        ...argsLabel, ...argsFeedback,
        placeholder: {
            control: {type: 'text'},
            table: {
                category: "attributes",
                subcategory: "text",
            }
        },

        'format': {
            control: {type: 'select'},
            options: ['Y-m-d', 'Y/m/d', 'Ymd', 'Y.m.d'],
            table: {
                category: "attributes",
                subcategory: "validate",
                defaultValue: {summary: 'Y-m-d'},
            }
        },
        'start-year-offset': {
            control: 'number',
            table: {
                category: "attributes",
                defaultValue: {summary: 0},
                subcategory: "value"
            },
            description: "Calculates the base date by adding or subtracting against the 'year' of the value. If value is not set, it is based on 'today'."
        },
        'start-month-offset': {
            control: 'number',
            table: {
                category: "attributes",
                defaultValue: {summary: 0},
                subcategory: "value"
            },
            description: "Calculates the base date by adding or subtracting against the 'month' of the value. If value is not set, it is based on 'today'."
        },
        'start-day-offset': {
            control: 'number',
            table: {
                category: "attributes",
                defaultValue: {summary: 0},
                subcategory: "value"
            },
            description: "Calculates the base date by adding or subtracting against the 'month' of the value. If value is not set, it is based on 'today'."
        },

        required: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false},
                subcategory: "validate"
            }
        },
        readonly: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false}
            }
        },
        showAlways: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false}
            }
        },
        invisible: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false}
            }
        },
        initTodayDate: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "value",
                type: {summary: "function()"},
            },
            description: "설정된 format의 오늘 날짜값을 설정합니다.",
        },
        isValid: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "validate",
                type: {summary: "(()=> return new Boolean) "},
            },
            description: "입력값의 유효성을 체크합니다.",
        },
        checkValidity: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "validate",
                type: {summary: "function()"},
            },
            description: "입력값의 유효성을 체크합니다.",
        },
        setValid: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "validate",
                type: {summary: "(()=> return false) "},
            },
            description: "유효한 상태로 표시합니다.",
        },
        inValid: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "validate",
                type: {summary: "(()=> return false) "},
            },
            description: "유효하지 않은 상태로 표시합니다.",
        },

    },
};


const Template = (args) => {
    return html`
        <l-c-datepicker
                id=${ifDefined(args.id)}
                name=${ifDefined(args.name)}
                size=${ifDefined(args.size)}
                format=${ifDefined(args.format)}

                value="${ifDefined(args.value)}"
                start-year-offset=${ifDefined(args['start-year-offset'])}
                start-month-offset=${ifDefined(args['start-month-offset'])}
                start-day-offset=${ifDefined(args['start-day-offset'])}
                
                label=${ifDefined(args.label)}
                label-align=${ifDefined(args['label-align'])}
                label-width=${ifDefined(args['label-width'])}
                label-text-align=${ifDefined(args['label-text-align'])}
                feedback=${ifDefined(args.feedback)}
                feedback-type=${ifDefined(args['feedback-type'])}
                feedback-visible-type=${ifDefined(args['feedback-visible-type'])}
                component-style=${ifDefined(args['component-style'])}
                
                width=${ifDefined(args.width)}
                ?required=${args.required}
                ?disabled=${args.disabled}
                ?readonly=${args.readonly}
                ?showAlways=${args.showAlways}
                ?invisible=${args.invisible}
                
        >
        </l-c-datepicker>

    `
}

export const DatepickerWithTopLabelAndFeedback = Template.bind({});
DatepickerWithTopLabelAndFeedback.args = {
    id: 'input02',
    name: 'name',
    width: '100%',
    label: 'label',
    'label-align': 'top',
    'label-width': 'auto',
    'label-text-align': 'left',
    feedback: 'feedback',
    'feedback-type': 'normal',
    'feedback-visible-type': 'visible',
    required: false,
    disabled: false,
    readonly: false,
};

export const DatepickerWithLeftLabelAndFeedback = Template.bind({});
DatepickerWithLeftLabelAndFeedback.args = {
    type: 'text',
    id: 'input03',
    name: 'name',
    width: 'auto',
    label: 'label : ',
    'label-align': 'left',
    'label-width': '50px',
    'label-text-align': 'left',
    feedback: 'feedback',
    'feedback-type': 'normal',
    'feedback-visible-type': 'visible',
    required: true,
    disabled: false,
    readonly: false,
};

export const DatepickerDisplayAlways = Template.bind({});
DatepickerDisplayAlways.args = {
    type: 'text',
    id: 'input06',
    name: 'name',
    invisible: true,
    showAlways: true,
};

export const DatepickerFormatCheck = Template.bind({});
DatepickerFormatCheck.args = {
    id: 'input04',
    name: 'name',
    width: '100%',
    format: 'Ymd',
    value: '2024-12-31',
    label: 'label',
    'label-align': 'top',
    'label-width': 'auto',
    'label-text-align': 'left',
    feedback: 'feedback',
    'feedback-type': 'normal',
    'feedback-visible-type': 'visible',
    required: false,
    disabled: false,
    readonly: false,
};

const sizeTemplate = (args) => {
    return html`
        <l-c-datepicker label="default size" id="default"></l-c-datepicker>

        <div style="margin: 16px"></div>

        <l-c-datepicker size='large' label="large size" id="largeDefault"></l-c-datepicker>
        <div style="margin: 16px"></div>

        <l-c-datepicker size='small' label="small size" id="smallDefault"></l-c-datepicker>
    `
}

export const size = sizeTemplate.bind({});
size.args = {

};