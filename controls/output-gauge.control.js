import subscribe from '../services/subscribe.service.js';
import limitHandler from '../services/limithandler.service.js';
import formatHandler from '../services/formathandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';

export default class {
  static parameters() {
    return {
      defaultValue: {
        type: 'number',
        default: 50
      },
      unit: {
        type: 'string'
      }
    };
  }

  static components() {
    return {
      subscribe,
      formatHandler,
      limitHandler,
      rangeHandler
    };
  }

  static styleUrls() {
    return [
      'ui-library/basic/master.css'
    ];
  }

  static template() {
    return `<!--style>
        svg {
            width: 100%;
            height: auto;
        }

        #svg path {
            fill:none;
            stroke-width:10px;
            stroke-linecap:round;
        }

        #svg #circle-bg {
            stroke: var(--output-bg, #e1e1e1);
        }

        #svg #circle-bar {
            stroke-dashoffset: 364px; /*364 = 0%, 0 = 100%*/
            stroke-dasharray: 364px;
            transition: stroke-dashoffset 1s linear;
        }

        #svg #text-value {
            fill: var(--gauge-text-color, darkgrey);
            text-anchor: middle;
            font-size:28px;
        }

        .gauge-bar {
            stroke: var(--gauge-bar-color, #1aa7c1);
        }

        .gauge-bar-limit-low-low {
            stroke: var(--low-low-color, rgb(236, 30, 83));
        }

        .gauge-bar-limit-low {
            stroke: var(--low-color, rgb(254, 229, 128));
        }

        .gauge-bar-limit-high {
            stroke: var(--high-color, rgb(254, 229, 128));
        }

        .gauge-bar-limit-high-high {
            stroke: var(--high-high-color, rgb(236, 30, 83));
        }


        .label-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -7px;
            font-size: 0.6em;
            color: var(--input-label-color, #4d4d4d);
        }

        .label-min {
            left: -12%;
            position: relative;
            text-align:center;
        }

        .label-max {
          left: 12%;
            position: relative;
            text-align:center;
        }


    </style-->

    <!--svg id="svg" viewBox="0 0 180 155" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path id="circle-bg"
            d="M54.935,145.533C34.429,133.401 20.638,110.776 20.638,84.866C20.638,46.157 51.417,14.773 89.382,14.773C127.346,14.773 158.126,46.157 158.126,84.866C158.126,110.776 144.334,133.401 123.829,145.533"/>

        <path id="circle-bar"
            d="M54.935,145.533C34.429,133.401 20.638,110.776 20.638,84.866C20.638,46.157 51.417,14.773 89.382,14.773C127.346,14.773 158.126,46.157 158.126,84.866C158.126,110.776 144.334,133.401 123.829,145.533" class="gauge-bar"/>

         <text id="text-value" x="90" y="90.5"></text>
    </svg-->
    <div class="gauge">
      <svg viewBox="0 0 180 155">
        <path class="back" d="M54.935,145.533C34.429,133.401 20.638,110.776 20.638,84.866C20.638,46.157 51.417,14.773 89.382,14.773C127.346,14.773 158.126,46.157 158.126,84.866C158.126,110.776 144.334,133.401 123.829,145.533"></path>
        <path class="active" d="M54.935,145.533C34.429,133.401 20.638,110.776 20.638,84.866C20.638,46.157 51.417,14.773 89.382,14.773C127.346,14.773 158.126,46.157 158.126,84.866C158.126,110.776 144.334,133.401 123.829,145.533"></path>
      </svg>
    </div>
    <div class="label-wrapper">
      <span class="label label-min">{{rangeHandler.minimum}}</span>
      <span class="label label-max">{{rangeHandler.maximum}}</span>
    </div!>
`;
  }

  createdCallback() {
    if(typeof this.defaultValue !== 'undefined')
      this._updateValue(this.defaultValue);

    this.subscribe.subscribe((e) => {this._updateValue(e.value);});

    Object.assign(this.element, {
      setValue: (value) => this.setValue(value)
    });
  }

  _updateValue(value)
  {
    if(typeof value === 'number'){
      let path_perimeter = 364;
      //scales value to 0-1
      let value_relative = this.rangeHandler.getRelativeValue(value);
      //scales value from path_perimeter to 0
      let dashOffset = path_perimeter * (1-value_relative);
      //set calculated path perimeter to Dashoffset
      this.$('#circle-bar').css('strokeDashoffset', dashOffset + 'px');
      //set text to formattet value
      this.$('#text-value').html(this.formatHandler.format(value));
      //set bar class depending on current limit
      this.$('#circle-bar').attr('class','gauge-bar' + this.limitHandler.getCurrentLimit(value));
    }
    else
        throw 'inout-gauge: not supported type for setValue ' + typeof value;
  }

  setValue(value) {
    if(typeof this.subscribe.base === 'undefined'){ //only apply if not bound to base variable
      this._updateValue(value);
    }
    else
        throw 'inout-led: setValue ignored, bound to variable: ' + this.subscribe.base;
  }
}
