export class User {
  id: string;
  role: string;
  active: boolean;

  constructor({
    id,
    role,
    active,
  }: {
    id?: string;
    role?: string;
    active?: boolean;
  }) {
    this.id = id;
    this.role = role;
    this.active = active;
  }
}
