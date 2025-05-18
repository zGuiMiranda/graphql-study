import { User } from "./User";

export class Post {
  private readonly postId: number;
  private readonly title: string;
  private readonly user: User;

  constructor(id: number, title: string, user: User) {
    this.postId = id;
    this.title = title;
    this.user = user;
  }

  get id(): number {
    return this.postId;
  }

  get titlePost(): string {
    return this.title;
  }

  get UserPost(): User {
    return this.user;
  }
  get userId(): number {
    return this?.user?.getId();
  }
}
