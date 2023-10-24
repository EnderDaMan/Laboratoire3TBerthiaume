import Model from './model.js';

export default class CollectionFilter extends Model {
    constructor(Objects, Params, Model) {
        super();

        this.objects = Objects;
        this.params = Params;
        this.model = Model;
    }

    get(){
        //Handle get

        //Set result with everything
        let result = this.objects;
        
        
        //Filter using field name=filter
        for(let paramName in this.params){
            if (paramName !== 'sort' && paramName !== 'limit' && paramName !== 'offset' && paramName !== 'fields') {
                result = result.filter(object =>
                    this.model.isMember(paramName) && object[paramName] == this.params[paramName]
                );
            }
        }
        //Filter using sort=field name
        if (this.params.sort && this.model.isMember(this.params.sort)) {
            result.sort();
            if(sort.endsWith('desc')){
                result.reverse();
            }
        }
        
        //Filter with limit and offset
        if (this.params.limit && !isNaN(this.params.limit)) {
            let offset = 0;
            if (this.params.offset && !isNaN(this.params.offset)) {
                offset = parseInt(this.params.offset);
            }
            result = result.slice(offset, offset + parseInt(this.params.limit));
        }

        //Filter with fields
        if (this.params.fields) {
            const fieldList = this.params.fields.split(',');
            const checkedFields = [];
            result = result.map(object => {
                fieldList.forEach(fieldName => {
                    if (this.model.isMember(fieldName) && !checkedFields.includes(fieldName + ' ' + ':' + ' ' + object[fieldName])) {
                        checkedFields.add(fieldName + ' ' + ':' + ' ' + object[fieldName]);
                    }
                });
                
                return checkedFields;
            });
        }
        return result;
    }
}