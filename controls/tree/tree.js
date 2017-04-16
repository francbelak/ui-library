export default class {
  static template() {
    return `
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet">
      <style>
      .tree {
        font-family: 'Quicksand', sans-serif;
        width: 100vw;
      }

      slot[name=tree-items]::slotted(*) {
        --row-height: 55px;
        --text-padding-left: 10px;
        --max-width: 350px;
        --checkbox-background: #2b2b2b;
        --checkbox-width: 30px;
        --font-color: white;
        --kpi-width: 100px;
        --tree-background: #262626;
        --progress-bar-inactive-color: #e3e3e3;
        --progress-bar-active-color: #38b1d7;
        --tree-intendation-color: #e3e3e3;
        --tree-intendation-width: 2px;
        --tree-item-border-bottom-width: 1px;
        --tree-item-border-bottom-color: #e3e3e3;
        --alarm-color: #b11236;
        --tree-item-alarm-border-left-width: 5px;
        --tree-item-icon-width: 15px;
      }

      @media screen and (min-width: 1024px) {
        .tree {
          box-shadow: 1px 0px 5px 0px rgba(87,87,87,1);
          max-width: 350px;
          min-height: 100vh;
          width: 30vw;
        }
      }
      </style>
      <div class="tree">
        <slot name="tree-items"></slot>
      </div>
    `;
  }
}
