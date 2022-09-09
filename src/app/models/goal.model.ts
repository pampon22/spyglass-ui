export class Goal {

	id?:		   number;
    description:   string;
	amount_needed: number;
	amount_saved:  number;
	complete_by:   Date;
    image_URL:     string;

    constructor(description : string, amount_needed : number, amount_saved : number, complete_by : Date, image_URL: string, id?:number) {
        this.description = description;
        this.amount_needed = amount_needed;
        this.amount_saved = amount_saved;
        this.complete_by = complete_by;
        this.image_URL = image_URL;
		this.id = id;
    }

	public setId(id: number): void {
		this.id = id;
	}

    public getDescription(): string {
		return this.description;
	}

	public setDescription(description: string): void {
		this.description = description;
	}

	public getAmount_needed(): number {
		return this.amount_needed;
	}

	public setAmount_needed(amount_needed: number): void {
		this.amount_needed = amount_needed;
	}

	public getAmount_saved(): number {
		return this.amount_saved;
	}

	public setAmount_saved(amount_saved: number): void {
		this.amount_saved = amount_saved;
	}

	public getComplete_by(): Date {
		return this.complete_by;
	}

	public setComplete_by(complete_by: Date): void {
		this.complete_by = complete_by;
	}

    public getImage_URL(): string {
		return this.image_URL;
	}

	public setImage_URL(url: string): void {
		this.image_URL = url;
	}

}
