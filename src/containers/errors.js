export class Errors{
    constructor(){
      this.errors = {};
    }
    get(field){
      if(this.errors[field]){
        return this.errors[field][0]
      }
    }
    record(errors){
      this.errors = errors.values
    }
    jum(){
      return Object.keys(this.errors).length
    }
}