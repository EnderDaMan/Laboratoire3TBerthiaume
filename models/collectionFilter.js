import Model from './model.js';

export default class collectionFilter extends Model {
    constructor() {
        super();

        this.addField('Name', 'string');
        this.addField('Sort', 'string');
        this.addField('Limit', 'integer');
        this.addField('Fields', 'string');
              
        this.setKey("Name");
    }
}