import '/src/components/input/Radio.js'
import {html} from "lit";
import {ifDefined} from 'lit/directives/if-defined.js';


export default {
    title: 'Components/Radio',
    tags: ['autodocs'],
    component: 'l-radio',
    argTypes: {
        // size: {
        //     control: {type: 'select'},
        //     options: ['default','large','small'],
        //     table: {
        //         category: "attributes",
        //         defaultValue: {summary: 'default'}
        //     }
        // },
        id: {table: {category: "attributes",}},
        name: {table: {category: "attributes",}},
        width: {table: {category: "attributes",}},
        label: {
            table: {
                category: "attributes",
                subcategory: "text",
            }
        },
        'label-align': {
            control: {type: 'select'},
            options: ['left', 'right'],
            table: {
                category: "attributes",
                defaultValue: {summary: 'right'},
                subcategory: "text"
            },
            description: "개발예정.",
        },
        checked: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false},
                subcategory: "validate"
            }
        },
        required: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false},
                subcategory: "validate"
            }
        },
        disabled: {
            control: 'boolean',
            table: {
                category: "attributes",
                defaultValue: {summary: false}
            }
        },

        value: {
            control: {type: 'text'},
            table: {
                category: "attributes",
                subcategory: "text",
            },
            description: "checked일때 불러올 값.",
        },

        getValue: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "value",
                type: {summary: "(()=> return new String)"},

            },
            description: "input값을 가져옵니다.",
        },
        setValue: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "value",
                type: {summary: "function(value)"},
            },
            description: "input값을 설정합니다.",
        },

        getText: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "value",
                type: {summary: "(()=> return new String)"},

            },
            description: "Text값을 가져옵니다.",
        },
        setText: {
            control: {
                type: {},
                disable: true
            },
            table: {
                category: "function",
                subcategory: "value",
                type: {summary: "function(value)"},
            },
            description: "Text값을 설정합니다.",
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


    },
};


const Template = (args) => {
    return html`
        <l-radio
                
                id=${ifDefined(args.id)}
                name=${ifDefined(args.name)}
                width=${ifDefined(args.width)}
                label=${ifDefined(args.label)}
                label-align=${ifDefined(args['label-align'])}
                value="${ifDefined(args.value)}"
                ?checked=${args.checked}
                ?required=${args.required}
                ?disabled=${args.disabled}
        >
        </l-radio>`
}

export const RadioDefault = Template.bind({});
RadioDefault.args = {
    id: 'input01',
    name: 'name',
    width: '100%',
    label: 'label',
    'label-align': 'right',
    required: false,
    disabled: false
};



const horizontalTemplate = (args) => {
    return html`
        <l-radio label="chk1" value="1" id="chk1"></l-radio>
        <l-radio label="chk2" value="1" id="chk2"></l-radio>
        <l-radio label="chk3" value="1" id="chk3"></l-radio>
    `
}

export const horizontal = horizontalTemplate.bind({});
horizontal.args = {

};

const verticalTemplate = (args) => {
    return html`
        <l-radio label="chk1" value="1" width="100%" id="chk1"></l-radio>
        <l-radio label="chk2" value="1" width="100%" id="chk2"></l-radio>
        <l-radio label="chk3" value="1" width="100%" id="chk3"></l-radio>
    `
}

export const vertical = verticalTemplate.bind({});
vertical.args = {

};