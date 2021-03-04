export default interface IUserWhithoutPasswordDTO {
  id: string;
  name: string;
  type: 'client' | 'provider';
  created_at?: Date;
  updated_at?: Date;
  email: string;
}
