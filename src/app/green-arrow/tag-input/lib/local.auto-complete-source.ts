import { GaAutocompleteSource } from './auto-complete-source';

export class GaLocalAutocompleteSource implements GaAutocompleteSource {
  elements: string[];
  constructor(elements) {
    this.elements = elements;
  }

  search(term: any, selection?): Promise<any> {
    return new Promise(resolve => {
      let filteredElements = this.elements
          .filter(el => el.includes(term));

      if (selection) {
        filteredElements = filteredElements.filter(el => selection.indexOf(el) === -1)
      }

      resolve(filteredElements);
    });
  }
}
