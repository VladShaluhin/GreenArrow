export abstract class GaAutocompleteSource {
  abstract search(term: any, selection?: any[]): Promise<any>;
}
