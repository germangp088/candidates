import * as uuid from 'uuid';

export class Candidate {
    private readonly _id: string
    private readonly _name: string
    private _skills: string[]

    constructor(name: string, skills: string[]){
        this._id = uuid.v4()
        this._name = name
        this._skills = skills
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get skills(): string[] {
        return this._skills;
    }

    set skills(value: string[]) {
        this._skills = value;
    }
}