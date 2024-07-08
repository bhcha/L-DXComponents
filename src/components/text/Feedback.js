import {css, html, LitElement} from 'lit';
import '../commons/common.css';
import {classMap} from "lit/directives/class-map.js";

class LFeedback extends LitElement {
    static styles =
        [
            // component css
            css`
              .is-valid ~ .valid-feedback, .is-valid ~ .valid-tooltip, .was-validated :valid ~ .valid-feedback, .was-validated :valid ~ .valid-tooltip {
                display: block;
              }

              .valid-feedback {
                display: block;
                width: 100%;
                margin-top: .25rem;
                font-size: .875em;
              }

              .invalid-feedback {
                display: block;
                width: 100%;
                margin-top: .25rem;
                font-size: .875em;
                color: var(--bs-danger);
              }

              .form-group {
                display: flex;
                flex-direction: column;
                gap: var(--krds-spacer-3);
                width: 100%;
              }

              .form-group [class^=form-hint] {
                color: var(--krds-gray-70);
                padding-left: calc(2rem + var(--krds-spacer-1));
              }

              .form-group [class^=form-hint]::before {
                display: inline-flex;
                width: 1.2rem;
                height: 1.2rem;
                flex-shrink: 0;
                flex-grow: 0;
                content: "";
                margin-left: calc((2rem + var(--krds-spacer-1)) * -1);
                vertical-align: top;

                background: url(/assets/ico_hint_20.svg) no-repeat center;
                background-size: contain;
              }

            `
        ]
    ;

    static get properties() {
        return {
            feedback: {type: String},
            feedbackType: {type: String},
            width: {type: String},
            labelAlign: {type: String},
            leftMargin: {type: String},
        };
    }

    render() {
        let isLabelLeft = (this.labelAlign && this.labelAlign == 'left');
        return html`
            <div class="valid-feedback"
                 style="
                    padding-left: calc(${this.leftMargin} + ${isLabelLeft ? `15px` : '0px'})
                    ;width: ${this.width ? this.width : 'auto'};
                "
            >
                <div class="form-group">
                    <div class="${
                            classMap({
                                'form-hint': this.feedbackType === 'hint',
                                'invalid-feedback': this.feedbackType === 'error'
                            })
                    }
                    ">
                        ${this.feedback}
                    </div>
                </div>


            </div>
        `
    }
}

customElements.define('l-feedback', LFeedback);
export {LFeedback};