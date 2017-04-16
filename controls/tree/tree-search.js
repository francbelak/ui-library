export default class {
  //TODO: add parameter for disabling search and implement it
  static template() {
    return `
      <style>
        .tree-search {
          border: none;
          height: var(--row-height);
          padding: 0 0 0 var(--text-padding-left);
          width: calc(100% - var(--text-padding-left));
        }
        .tree-search:focus {
          outline: none;
        }
      </style>
      <input class="tree-search" type="text" placeholder="Search for project">
    `;
  }
}
