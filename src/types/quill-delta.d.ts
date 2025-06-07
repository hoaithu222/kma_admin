declare module "quill-delta" {
  export default class Delta {
    constructor(ops?: any[]);
    insert(text: string, attributes?: any): Delta;
    delete(length: number): Delta;
    retain(length: number, attributes?: any): Delta;
    concat(other: Delta): Delta;
    diff(other: Delta): Delta;
    eachLine(predicate: (line: Delta, attributes: any) => boolean): Delta;
    filter(predicate: (op: any) => boolean): Delta;
    forEach(predicate: (op: any) => void): void;
    length(): number;
    map(predicate: (op: any) => any): any[];
    partition(predicate: (op: any) => boolean): [Delta, Delta];
    reduce(predicate: (accum: any, curr: any) => any, initial: any): any;
    slice(start?: number, end?: number): Delta;
    transform(other: Delta, priority?: boolean): Delta;
    transformPosition(index: number, priority?: boolean): number;
  }
}
