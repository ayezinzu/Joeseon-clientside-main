import { serializable, alias, object, list, primitive } from "serializr";
import { Post } from "../Post/post.model";

export class PostPaginationDetail {
  @serializable(alias("rows", list(object(Post))))
  posts: Post[] = [];

  @serializable(alias("count", primitive()))
  count: number = 0;
}
