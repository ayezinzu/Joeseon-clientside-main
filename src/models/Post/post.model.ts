
import {serializable, alias, object, list, primitive} from 'serializr';

export class Post { 

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('title', primitive()))
	title?: string;

	@serializable(alias('content', primitive()))
	content?: string;

}